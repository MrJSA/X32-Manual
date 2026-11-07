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
│   ├── content/              # Master markdown chapter source files
│   ├── src/
│   │   ├── lib/              # Content parser, marked renderer, components, global styles
│   │   └── routes/           # SvelteKit routes (+page.svelte, [chapter]/+page.svelte)
│   ├── static/               # Favicon, webmanifest, robots.txt
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
| **00** | **Hardware Overview & Surface Anatomy** | Surface topography, fader banks, channel strip controls, 7" screen, scribble strips, rear connectivity. |
| **01** | **Gain Staging, Preamps & Headamps** | Analog headamp vs digital trim, -18 dBFS digital target, phantom power protocols, polarity flip, HA Gain Split. |
| **02** | **Channel Processing Architecture** | Low Cut HPF guidelines, 5-mode Gate/Expander/Ducker, 4-band PEQ with RTA, compressor with parallel mix %. |
| **03** | **Routing, Patching & Signal Distribution** | Blocks of eight vs User 1:1 Routing, tap point selection (In/LC, Pre-EQ, Pre-Fader, Post-Fader), stage setups. |
| **04** | **Mix Buses, Sends-on-Faders & Matrices** | 16 Mix Buses, Sends-on-Faders, stage wedges vs IEMs, audio subgroups vs DCAs, parallel drum smash, 6 Matrices. |
| **05** | **DCAs, Mute Groups & Fader Management** | 8 DCAs, DCA pre/post-fader send behavior gotcha, DCA Spill, 6 Master Mute Groups, and FX Mute protocol. |
| **06** | **Virtual Effects Rack & All 30+ Processors** | 8-slot rack, vintage compressors (1176, LA-2A, Fairchild), Pultec EQs, delays, reverbs, enhancers, IEM reverb routing. |
| **07** | **Scenes, Cues, Snippets & Show Control** | Show control hierarchy (Show → Cues → Scenes → Snippets), surgical snippet recalls, Parameter and Channel Safes. |
| **08** | **Monitoring, Solo, Talkback & Utilities** | Control Room / Phones, PFL vs AFL solo, Talkback A/B destination matrices, oscillator, Dan Dugan speech automixer. |
| **09** | **Digital Snakes, Stageboxes & AES50 Networks**| SuperMAC AES50, S16/S32/SD/DL stageboxes, mandatory shielded STP cabling (preventing ESD), master/slave clocking. |
| **10** | **Personal Monitoring: P16 & Midas DP48** | Ultranet P16-M mixers and P16-D hubs, 16-channel squeeze strategy, stage ambient mics, Midas DP48 over AES50. |
| **11** | **Recording, Playback & Expansion Cards** | Top-panel 2-track USB WAV recorder, 32x32 X-USB interface, X-LIVE standalone dual SD card recording, Virtual Soundcheck. |
| **12** | **Network Setup, Remote Control & Software** | Static IP configuration, 5 GHz Wi-Fi optimization, X32-Edit sync safety, Mixing Station app customization, OSC protocol. |
| **13** | **Live Mixing Workflows & System Tuning** | Step-by-step soundcheck protocol, PA time-alignment formulas, ringing out stage monitors with RTA, broadcast streaming. |
| **App** | **Deep Dive: Firmware 4.x User Routing** | Comprehensive 1:1 flexible patching architecture, multi-stagebox setups, wireless mic integration. |
