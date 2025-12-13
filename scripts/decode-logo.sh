#!/usr/bin/env bash
# Decode placeholder base64 into public/logo.png
set -euo pipefail
cd "$(dirname "${BASH_SOURCE[0]}")/.."
if [ ! -f public/logo.png.b64 ]; then
  echo "Missing public/logo.png.b64"
  exit 1
fi
mkdir -p public
base64 -d public/logo.png.b64 > public/logo.png
echo "Wrote public/logo.png (placeholder). Replace with your real PNG and git commit."
