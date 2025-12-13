#!/usr/bin/env bash
set -euo pipefail

if [ -z "${FARCASTER_KEY:-}" ]; then
  echo "FARCASTER_KEY environment variable is required"
  echo "Run: export FARCASTER_KEY=wc_secret_xxx"
  exit 1
fi

PAYLOAD_FILE="/tmp/farcaster_frame_payload.json"
cat > "$PAYLOAD_FILE" <<'JSON'
{
  "name": "NFT Drop Signal",
  "metadataUrl": "https://nft-drop-signal.vercel.app/api/frame"
}
JSON

echo "Registering Frame with Farcaster..."
curl -i -s -X POST "https://api.farcaster.xyz/v2/frames" \
  -H "Authorization: Bearer ${FARCASTER_KEY}" \
  -H "Content-Type: application/json" \
  -d @"$PAYLOAD_FILE"

rm -f "$PAYLOAD_FILE"
