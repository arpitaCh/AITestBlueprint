#!/bin/bash

# Quick CLI tool to generate test cases without starting the web server
# Usage: ./quick_generate.sh "Your user story here"

cd "$(dirname "$0")"

if [ -z "$1" ]; then
    echo "❌ Error: Please provide a user story"
    echo "Usage: ./quick_generate.sh \"Your user story here\""
    exit 1
fi

echo "🤖 Generating test cases..."
echo ""

python3 -c "
import sys
sys.path.insert(0, 'tools')
from generate_test_cases import generate_test_cases

result = generate_test_cases('$1')
if result['status'] == 'success':
    print(result['test_cases'])
else:
    print(f\"Error: {result['message']}\")
"
