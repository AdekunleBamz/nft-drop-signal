#!/usr/bin/env bash
set -euo pipefail

if [ -z "${VERCEL_TOKEN:-}" ]; then
  echo "ERROR: VERCEL_TOKEN is required as an environment variable."
  echo "Run: export VERCEL_TOKEN=your_token"
  exit 1
fi

if [ -z "${VERCEL_PROJECT_ID:-}" ]; then
  echo "ERROR: VERCEL_PROJECT_ID is required as an environment variable."
  echo "Find it in the Vercel project settings and run: export VERCEL_PROJECT_ID=project_id"
  exit 1
fi

if [ -z "${NANSEN_API_KEY:-}" ]; then
  echo "ERROR: NANSEN_API_KEY is required as an environment variable."
  echo "Run: export NANSEN_API_KEY=your_nansen_key"
  exit 1
fi

API_URL="https://api.vercel.com/v9/projects/${VERCEL_PROJECT_ID}/env"

echo "Creating/updating environment variable 'NANSEN_API_KEY' for project ${VERCEL_PROJECT_ID}..."

payload=$(cat <<EOF
{
  "key": "NANSEN_API_KEY",
  "value": "${NANSEN_API_KEY}",
  "target": ["production","preview","development"],
  "type": "encrypted"
}
EOF
)

resp=$(curl -s -w "\n%{http_code}" -X POST "$API_URL" \
  -H "Authorization: Bearer ${VERCEL_TOKEN}" \
  -H "Content-Type: application/json" \
  -d "$payload")

# split body and status
http_status=$(echo "$resp" | tail -n1)
body=$(echo "$resp" | sed '$d')

if [ "$http_status" = "200" ] || [ "$http_status" = "201" ]; then
  echo "Success: environment variable created."
  echo "$body"
  exit 0
else
  echo "Vercel API returned status $http_status"
  echo "$body"
  exit 2
fi
