# Behringer X32 / Midas M32 Technical Manual & Field Guide

The source repository for the comprehensive **Behringer X32 & Midas M32 Technical Manual & Field Guide** (Firmware 4.x).

A high-performance, self-contained documentation website providing exhaustive technical guidance on headamp gain staging, channel dynamics, parametric equalization, blocks-of-eight and User 1:1 routing, DCA fader management, virtual effects rack processors, stagebox AES50 networking, and live mixing soundcheck protocols.

---

## Architecture & Technology Stack

The site is built small, fast, and secure with zero external runtime dependencies:

- **SvelteKit 2 & Svelte 5**: Prerenders all manual chapters, tables, and signal flow diagrams to static HTML at build time. Pre-generates Brotli and Gzip compressed assets.
- **Minimal Rust Server (Axum & Tokio)**: Ultra-lightweight static file server delivering precompressed assets, strict security headers, and an internal healthcheck endpoint (`/healthz`).
- **Minimal Scratch Container**: Packaged into a hardened, read-only container (~10 MB) running under unprivileged UID `65534:65534`.
- **Zero Trackers & Zero Databases**: No tracking cookies, no client analytics, no external database dependencies.

```
Internet ──443──► Caddy (HTTPS) ──► 127.0.0.1:8088 ──► Container: x32-manual ──► Static Musl Server
```

---

## Repository Structure

```
X32-Manual/
├── .github/workflows/
│   └── docker.yml            # CI/CD: Svelte check, Rust tests, GHCR container publication
├── deploy/
│   ├── x32-manual.container  # Podman Quadlet systemd unit (/etc/containers/systemd/)
│   ├── x32-manual.caddy      # Caddy reverse proxy snippet
│   ├── docker-compose.yml    # Docker Compose alternative deployment
│   └── update.sh             # Pull & restart update script
├── src/
│   ├── main.rs               # Axum static file server with graceful shutdown
│   ├── config.rs             # Environment configuration (PORT, SITE_DIR, RUST_LOG)
│   ├── headers.rs            # HTTP cache policies and security headers
│   └── healthcheck.rs        # Container healthcheck CLI probe
├── web/
│   ├── content/              # Chapter markdown, one folder per language (en, de)
│   ├── src/
│   │   ├── lib/              # Content parser, marked renderer, components, global styles
│   │   └── routes/           # Pages (EN at /, DE at /de/), sitemap.xml, robots.txt, search.json
│   ├── static/               # Favicon, webmanifest
│   ├── package.json
│   ├── tsconfig.json
│   └── vite.config.ts
├── Cargo.toml                # Rust dependencies (Axum 0.8, Tokio, Tower-HTTP)
├── Dockerfile                # Multi-stage build (Node 24 Alpine → Rust Musl → Scratch)
├── .dockerignore
└── .gitignore
```

---

## Manual Table of Contents

| Chapter | Title | Focus & Core Content |
|---|---|---|
| **01** | **Hardware Overview & Surface Anatomy** | Surface layout, fader banks, channel strip controls, 7" screen, scribble strips, rear connectivity. |
| **02** | **Digital Snakes, Stageboxes & AES50 Networks** | SuperMAC AES50, S16/S32/SD/DL stageboxes, shielded STP cabling, master/slave clocking. |
| **03** | **Routing, Patching & Signal Distribution** | Blocks of eight, tap points, XLR/Aux/Ultranet/Card outputs, stage patch recipes. |
| **04** | **Firmware 4.x User Routing (1:1 Patching)** | User In / User Out patching, multi-stagebox setups, wireless racks, recording feeds. |
| **05** | **Gain Staging, Preamps & Headamps** | Analog headamp vs digital trim, -18 dBFS target, phantom power, polarity, HA Gain Split. |
| **06** | **Channel Processing Architecture** | Low Cut, Gate/Expander/Ducker, 4-band PEQ with RTA, compressor with parallel mix. |
| **07** | **Mix Buses, Sends-on-Faders & Matrices** | 16 mix buses, Sends on Faders, wedges vs IEMs, subgroups vs DCAs, 6 matrices. |
| **08** | **DCAs, Mute Groups & Fader Management** | 8 DCAs, pre/post-fader send gotcha, DCA Spill, 6 mute groups, FX mute. |
| **09** | **Virtual Effects Rack & Processors** | 8-slot rack, 1176/LA-2A/Fairchild models, Combinator, Pultec EQs, reverbs, delays. |
| **10** | **Monitoring, Solo, Talkback & Utilities** | Control room/phones, PFL vs AFL, Talkback A/B, oscillator, Dan Dugan automixer, RTA. |
| **11** | **Personal Monitoring: Ultranet P16 & Midas DP48** | P16-M/P16-D, 16-channel squeeze, ambient mics, DP48 over AES50. |
| **12** | **Scenes, Cues, Snippets & Show Control** | Show → Cues → Scenes → Snippets, Parameter and Channel Safes. |
| **13** | **Recording, Playback & Expansion Cards** | USB 2-track recorder, X-USB, X-LIVE SD recording, Virtual Soundcheck. |
| **14** | **Network Setup, Remote Control & Software** | Static IP, 5 GHz Wi-Fi, X32-Edit sync safety, Mixing Station, OSC. |
| **15** | **Live Mixing Workflows & System Tuning** | Soundcheck protocol, PA time alignment, ringing out monitors, streaming loudness. |

Every chapter exists in English (`/`) and German (`/de/`); the content lives in `web/content/en` and `web/content/de`.
