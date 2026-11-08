//! Static file server for the Behringer X32 / Midas M32 Field Guide & Technical Manual.
//!
//! Serves the prerendered SvelteKit static build with precompressed
//! Brotli / Gzip files, security headers, and an internal healthcheck endpoint.
//!
//! Environment configuration:
//! - `PORT`      Port to listen on (default: `8080`)
//! - `SITE_DIR`  Directory of the built static site (default: `./web/build`)
//! - `RUST_LOG`  Log filter level (default: `info`)
//!
//! Run with `--healthcheck` to query `/healthz` on the configured port.

mod config;
mod headers;
mod healthcheck;

use std::io::IsTerminal;
use std::time::{Duration, Instant};

use axum::http::StatusCode;
use axum::{
    Router,
    extract::Request,
    middleware::{self, Next},
    response::Response,
    routing::get,
};
use tower_http::services::{ServeDir, ServeFile};
use tower_http::timeout::TimeoutLayer;
use tracing::info;
use tracing_subscriber::EnvFilter;

use crate::config::Config;

#[tokio::main]
async fn main() {
    let config = Config::from_env();

    if std::env::args().any(|a| a == "--healthcheck") {
        std::process::exit(healthcheck::run(config.port));
    }

    tracing_subscriber::fmt()
        .with_env_filter(EnvFilter::try_from_default_env().unwrap_or_else(|_| "info".into()))
        .with_target(false)
        .with_ansi(std::io::stdout().is_terminal())
        .init();

    if !config.site_dir.join("index.html").is_file() {
        tracing::warn!(
            "Directory {} does not contain index.html. Did you run `npm run build` in web/?",
            config.site_dir.display()
        );
    }

    let not_found = ServeFile::new(config.site_dir.join("404.html"))
        .precompressed_br()
        .precompressed_gzip();
    let static_files = ServeDir::new(&config.site_dir)
        .precompressed_br()
        .precompressed_gzip()
        .not_found_service(not_found);

    let app = Router::new()
        .route("/healthz", get(|| async { "ok" }))
        .fallback_service(static_files)
        .layer(middleware::from_fn(headers::only_get_head))
        // Static files answer in microseconds; anything slower is a stuck client.
        .layer(TimeoutLayer::with_status_code(
            StatusCode::REQUEST_TIMEOUT,
            Duration::from_secs(15),
        ))
        .layer(middleware::from_fn(headers::apply))
        .layer(middleware::from_fn(log_request));

    let addr = std::net::SocketAddr::from(([0, 0, 0, 0], config.port));
    let listener = tokio::net::TcpListener::bind(addr)
        .await
        .unwrap_or_else(|e| panic!("Failed to bind to {addr}: {e}"));

    info!("Serving {} on http://{addr}", config.site_dir.display());

    axum::serve(listener, app)
        .with_graceful_shutdown(shutdown_signal())
        .await
        .expect("Server encountered an unrecoverable error");
}

/// Logs request method, path, response status, and duration. Does not log IP addresses.
async fn log_request(req: Request, next: Next) -> Response {
    let start = Instant::now();
    let method = req.method().clone();
    let path = req.uri().path().to_owned();
    let res = next.run(req).await;
    if path != "/healthz" {
        info!(
            "{method} {path} {} {:.1?}",
            res.status().as_u16(),
            start.elapsed()
        );
    }
    res
}

/// Awaits graceful termination signals (SIGINT / SIGTERM).
async fn shutdown_signal() {
    let ctrl_c = async {
        tokio::signal::ctrl_c().await.ok();
    };

    #[cfg(unix)]
    let terminate = async {
        if let Ok(mut s) = tokio::signal::unix::signal(tokio::signal::unix::SignalKind::terminate())
        {
            s.recv().await;
        }
    };
    #[cfg(not(unix))]
    let terminate = std::future::pending::<()>();

    tokio::select! {
        _ = ctrl_c => {},
        _ = terminate => {},
    }
    info!("Shutting down server cleanly");
}
