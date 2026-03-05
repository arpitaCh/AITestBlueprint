# Local LLM Test Case Generator

A web-based test case generator powered by Ollama (Llama 3.2) running locally.

## Architecture

This project follows the **B.L.A.S.T.** protocol with **A.N.T.** 3-layer architecture:

- **Layer 1 (Architecture):** `architecture/test_case_generation.md` - Business logic SOP
- **Layer 2 (Navigation):** `app/main.py` - FastAPI routing and orchestration
- **Layer 3 (Tools):** `tools/generate_test_cases.py` - Deterministic execution

## Prerequisites

1. **Ollama installed and running**
   ```bash
   # Install Ollama from https://ollama.ai
   ollama serve
   ```

2. **Llama 3.2 model pulled**
   ```bash
   ollama pull llama3.2
   ```

3. **Python 3.11+**

## Installation

```bash
# Install dependencies
pip3 install -r requirements.txt
```

## Usage

### Start the Server

```bash
python3 app/main.py
```

The server will start on `http://localhost:8000`

### Access the UI

Open your browser and navigate to:
```
http://localhost:8000
```

### Using the Chat Interface

1. Type a description of the functionality you want to test
   - Example: "Login function with email validation"
   - Example: "Shopping cart add/remove items"

2. Click "Generate" or press Enter

3. The system will generate comprehensive test cases including:
   - Happy path scenarios
   - Edge cases
   - Negative test scenarios

### CLI Tool (for testing)

You can also test the core tool directly:

```bash
python3 tools/generate_test_cases.py "Your functionality description"
```

## Project Structure

```
TestCaseGeneratorUsingLLM/
├── app/
│   ├── main.py              # FastAPI backend (Layer 2)
│   └── static/
│       ├── index.html       # Chat UI
│       ├── css/style.css    # Premium dark theme
│       └── js/script.js     # Frontend logic
├── architecture/
│   └── test_case_generation.md  # SOP (Layer 1)
├── tools/
│   ├── verify_ollama.py     # Connection verification
│   └── generate_test_cases.py   # Core tool (Layer 3)
├── .tmp/                    # Temporary files
├── requirements.txt
└── README.md
```

## Features

- ✅ Local LLM (no cloud dependencies)
- ✅ Premium dark mode UI
- ✅ Real-time test case generation
- ✅ Comprehensive error handling
- ✅ Edge case coverage
- ✅ Deterministic architecture

## Troubleshooting

**Error: "Cannot connect to Ollama"**
- Ensure Ollama is running: `ollama serve`
- Verify the model is available: `ollama list`

**Slow generation**
- First generation may take longer (model loading)
- Typical generation time: 15-30 seconds

## Development

To modify the test case generation logic:
1. Update the SOP in `architecture/test_case_generation.md`
2. Update the tool in `tools/generate_test_cases.py`
3. Test with CLI before deploying to web interface
