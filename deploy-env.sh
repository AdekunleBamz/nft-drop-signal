#!/bin/bash

TOKEN="bzyy1JpKdzjy1Gj2oeqblx3H"
API_KEY="[REDACTED_NANSEN_API_KEY]"
PROJECT_ID="nft-drop-signal"

# Set environment variable
echo "Setting NANSEN_API_KEY environment variable..."
curl -s -X POST "https://api.vercel.com/v9/projects/$PROJECT_ID/env" \
  -H "Authorization: Bearer $TOKEN" \
  -H "Content-Type: application/json" \
  -d "{\"key\":\"NANSEN_API_KEY\",\"value\":\"$API_KEY\",\"type\":\"secret\",\"target\":[\"production\",\"preview\",\"development\"]}" | jq '.'

echo ""
echo "Environment variable configured. You can now manually trigger a redeploy from Vercel dashboard or push a new commit to main."
