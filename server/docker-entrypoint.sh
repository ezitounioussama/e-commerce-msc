#!/bin/sh
set -e

echo "[entrypoint] Running product seed..."
node seed.js

echo "[entrypoint] Running admin seed..."
node seedAdmin.js

echo "[entrypoint] Starting server..."
exec "$@"
