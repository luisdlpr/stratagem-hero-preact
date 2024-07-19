#!/bin/bash

# Define the input JSON file
INPUT_FILE="output.json"

URL_PREFIX="https://helldivers.wiki.gg"

# Check if the input file exists
if [ ! -f "$INPUT_FILE" ]; then
  echo "File $INPUT_FILE not found!"
  exit 1
fi

# Extract URLs and call curl on each
jq -r '.[].thumbnail' "$INPUT_FILE" | while read -r url; do
  extracted_value=$(echo "$url" | sed 's|.*/||')
  echo "Downloading: $URL_PREFIX$url into $extracted_value"
  curl "$URL_PREFIX$url" > "thumbnails/$extracted_value"
done
