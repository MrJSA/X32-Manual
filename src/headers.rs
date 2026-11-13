//! Request filtering plus cache and security headers on every response, with permanent
//! trailing-slash redirects.

use axum::{
    extract::Request,
    http::{HeaderMap, HeaderName, HeaderValue, Method, StatusCode, header},
    middleware::Next,
    response::{IntoResponse, Response},
};

/// Fingerprinted build output — filename changes whenever content does.
const IMMUTABLE: &str = "public, max-age=31536000, immutable";
/// Images, icons, and static assets.
const STATIC_ASSET: &str = "public, max-age=86400";
/// HTML and data — revalidate to ensure updates deploy immediately.
const REVALIDATE: &str = "public, no-cache";

/// HTML pages carry their own `<meta>` CSP with hashes of SvelteKit's inline scripts and
/// styles (see `web/vite.config.ts`). Both policies are enforced, so the header adds only
/// what a `<meta>` policy cannot express or what must hold even without it.
const CSP_HTML: &str =
    "frame-ancestors 'none'; base-uri 'self'; object-src 'none'; form-action 'none'";
/// Everything else (JSON, SVG, XML, fonts, …) never needs to run or load anything.
const CSP_OTHER: &str =
    "default-src 'none'; frame-ancestors 'none'; base-uri 'none'; form-action 'none'";

const SECURITY_HEADERS: &[(&str, &str)] = &[
    ("x-content-type-options", "nosniff"),
    ("x-frame-options", "DENY"),
    ("referrer-policy", "strict-origin-when-cross-origin"),
    (
        "permissions-policy",
        "accelerometer=(), autoplay=(), browsing-topics=(), camera=(), display-capture=(), \
         encrypted-media=(), fullscreen=(), geolocation=(), gyroscope=(), hid=(), \
         magnetometer=(), microphone=(), midi=(), payment=(), picture-in-picture=(), \
         publickey-credentials-get=(), screen-wake-lock=(), serial=(), usb=(), \
         xr-spatial-tracking=()",
    ),
    ("cross-origin-opener-policy", "same-origin"),
    ("cross-origin-embedder-policy", "require-corp"),
    ("cross-origin-resource-policy", "same-origin"),
    ("origin-agent-cluster", "?1"),
    ("x-permitted-cross-domain-policies", "none"),
    ("x-dns-prefetch-control", "off"),
];

/// A static site only ever needs GET and HEAD; everything else is refused before it
/// reaches the file service.
pub async fn only_get_head(req: Request, next: Next) -> Response {
    if req.method() == Method::GET || req.method() == Method::HEAD {
        next.run(req).await
    } else {
        let mut res = StatusCode::METHOD_NOT_ALLOWED.into_response();
        res.headers_mut()
            .insert(header::ALLOW, HeaderValue::from_static("GET, HEAD"));
        res
    }
}

pub async fn apply(req: Request, next: Next) -> Response {
    let cache = cache_policy(req.uri().path());
    let page = is_page_path(req.uri().path());
    let mut res = next.run(req).await;
    *res.status_mut() = permanent(res.status());
    let status = res.status();
    // A 304 carries no Content-Type, yet browsers merge its headers into the cached page,
    // so without a type fall back to the path. Otherwise a revalidated page would get
    // `CSP_OTHER` (`default-src 'none'`) and lose every script and stylesheet.
    let is_html = match res.headers().get(header::CONTENT_TYPE) {
        Some(v) => v.to_str().is_ok_and(|v| v.starts_with("text/html")),
        None => page,
    };
    let headers = res.headers_mut();

    if status.is_success() || status.is_redirection() {
        set(headers, header::CACHE_CONTROL, cache);
    } else {
        set(headers, header::CACHE_CONTROL, "no-store");
    }
    set(
        headers,
        header::CONTENT_SECURITY_POLICY,
        if is_html { CSP_HTML } else { CSP_OTHER },
    );
    for (name, value) in SECURITY_HEADERS {
        set(headers, HeaderName::from_static(name), value);
    }
    res
}

const STATIC_EXTENSIONS: &[&str] = &[
    ".svg",
    ".png",
    ".jpg",
    ".jpeg",
    ".webp",
    ".avif",
    ".ico",
    ".webmanifest",
    ".woff2",
];

fn cache_policy(path: &str) -> &'static str {
    if path.starts_with("/_app/immutable/") {
        IMMUTABLE
    } else if path.starts_with("/images/") || STATIC_EXTENSIONS.iter().any(|e| path.ends_with(e)) {
        STATIC_ASSET
    } else {
        REVALIDATE
    }
}

/// Paths `ServeDir` answers with an HTML page: directories (`/`, `/de/`), `.html` files,
/// and extensionless paths (redirected to their directory).
fn is_page_path(path: &str) -> bool {
    let last = path.rsplit('/').next().unwrap_or("");
    last.is_empty() || last.ends_with(".html") || !last.contains('.')
}

/// `ServeDir` answers `/chapter` with a temporary 307 to `/chapter/`. The move is
/// permanent, and search engines only transfer ranking for permanent redirects.
fn permanent(status: StatusCode) -> StatusCode {
    if status == StatusCode::TEMPORARY_REDIRECT {
        StatusCode::PERMANENT_REDIRECT
    } else {
        status
    }
}

fn set(headers: &mut HeaderMap, name: HeaderName, value: &'static str) {
    headers
        .entry(name)
        .or_insert(HeaderValue::from_static(value));
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn cache_policies() {
        assert_eq!(cache_policy("/_app/immutable/chunks/abc.js"), IMMUTABLE);
        assert_eq!(cache_policy("/favicon.svg"), STATIC_ASSET);
        assert_eq!(cache_policy("/font.woff2"), STATIC_ASSET);
        assert_eq!(cache_policy("/"), REVALIDATE);
        assert_eq!(cache_policy("/06-channel-processing/"), REVALIDATE);
        assert_eq!(cache_policy("/init.js"), REVALIDATE);
    }

    #[test]
    fn page_paths() {
        assert!(is_page_path("/"));
        assert!(is_page_path("/de/"));
        assert!(is_page_path("/06-channel-processing/"));
        assert!(is_page_path("/06-channel-processing"));
        assert!(is_page_path("/index.html"));
        assert!(!is_page_path("/init.js"));
        assert!(!is_page_path("/_app/immutable/assets/0.B4VjHqJ-.css"));
        assert!(!is_page_path("/search.json"));
        assert!(!is_page_path("/favicon.svg"));
    }

    #[test]
    fn directory_redirects_are_permanent() {
        assert_eq!(
            permanent(StatusCode::TEMPORARY_REDIRECT),
            StatusCode::PERMANENT_REDIRECT
        );
        assert_eq!(permanent(StatusCode::OK), StatusCode::OK);
        assert_eq!(permanent(StatusCode::NOT_FOUND), StatusCode::NOT_FOUND);
    }
}
