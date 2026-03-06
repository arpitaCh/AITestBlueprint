#!/bin/bash

# Initialize Playwright framework structure
echo "🚀 Initializing Playwright framework..."

mkdir -p pages tests/specs reporters utils

# Check if package.json exists, if not initialize
if [ ! -f package.json ]; then
    npm init -y
fi

# Install Playwright
npm install --save-dev @playwright/test

echo "✅ Folders created: pages, tests/specs, reporters, utils"
echo "👉 Now add your playwright.config.js and Page Objects."
