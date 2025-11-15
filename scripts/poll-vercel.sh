#!/usr/bin/env bash
set -euo pipefail

if [ -z "${VERCEL_TOKEN:-}" ] || [ -z "${PROJECT_ID:-}" ]; then
  echo "Usage: export VERCEL_TOKEN=...; export PROJECT_ID=...; bash scripts/poll-vercel.sh"
  exit 1
fi

max=20
sleep_sec=6
count=0

echo "Polling Vercel project ${PROJECT_ID} for deployment status (timeout $(($max*$sleep_sec))s)..."
while [ $count -lt $max ]; do
  resp=$(curl -s -H "Authorization: Bearer ${VERCEL_TOKEN}" "https://api.vercel.com/v1/projects/${PROJECT_ID}")
  ready=$(echo "$resp" | grep -o '"readyState":"[A-Z]*"' | head -n1 | sed 's/"readyState":"//;s/"//') || true
  url=$(echo "$resp" | grep -o '"deploymentHostname":"[^"]*' | head -n1 | sed 's/"deploymentHostname":"//') || true
  if [ -n "$ready" ]; then
    echo "Attempt $((count+1)): $ready"
  else
    echo "Attempt $((count+1)): no readyState yet"
  fi
  if [ "$ready" = "READY" ]; then
    echo "Deployment is READY. Visit: https://$url"
    exit 0
  fi
  count=$((count+1))
  sleep $sleep_sec
done

if [ -n "$url" ]; then
  echo "Timed out waiting. Last known state: ${ready:-unknown}. Try: https://$url"
else
  echo "Timed out waiting and could not determine deployment URL. Check Vercel dashboard."
fi
exit 2
