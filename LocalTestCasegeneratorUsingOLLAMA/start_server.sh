#!/bin/bash

# Navigate to the project directory
cd "$(dirname "$0")"

# Start the FastAPI server
echo "🚀 Starting Test Case Generator..."
echo "📍 Server will be available at: http://localhost:8000"
echo "⏹️  Press CTRL+C to stop the server"
echo ""

python3 app/main.py
