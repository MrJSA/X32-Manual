#!/bin/sh
# Pulls the newest container image and restarts the X32 manual service.
# Usage (on the server): ./update.sh
set -eu
cd "$(dirname "$0")"

if command -v docker >/dev/null 2>&1; then
    docker compose pull
    docker compose up -d --remove-orphans
    docker image prune -f >/dev/null 2>&1 || true
    echo "X32 Manual updated (Docker):"
    docker compose ps
else
    podman pull ghcr.io/mrjsa/x32-manual:latest
    systemctl restart x32-manual
    echo "X32 Manual updated (Podman Quadlet):"
    systemctl status x32-manual --no-pager
fi
