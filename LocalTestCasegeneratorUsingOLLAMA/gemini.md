# Project Constitution (Gemini)

## 1. Overview
**Project:** Local LLM Test Case Generator
**Goal:** Create a local web-based chat interface that uses the Ollama API (specifically `llama3.2`) to generate test cases based on user input and a predefined system template.

## 2. Architecture (A.N.T. Layering)
- **Adapter (Frontend):** 
  - Vanilla HTML/CSS/JavaScript.
  - Chat interface for user input and displaying generated test cases.
- **Nexus (Backend):** 
  - Python (FastAPI or Flask) server.
  - Handlers for API endpoints.
  - Manages the Ollama client connection.
- **Tool (Core Logic):** 
  - `ollama` Python library.
  - Prompt Template management.

## 3. Data Schemas

### API Requests
**POST /generate**
```json
{
  "user_input": "string (Description of the functionality to test)"
}
```

### API Responses
**Success (200 OK)**
```json
{
  "status": "success",
  "generated_test_cases": "string (The markdown/text response from Ollama)",
  "metadata": {
    "model": "llama3.2",
    "duration_ms": 1234
  }
}
```

## 4. Behavioral Rules
1.  **Model Enforce:** Must use `llama3.2` via Ollama.
2.  **Template Driven:** All requests must be wrapped in a specific system instruction/template (to be defined by User).
3.  **Local Only:** No external API calls to cloud providers.
4.  **UI Experience:** Simple, clean, "Premium" feel chat interface (per system design guidelines).

## 5. Directory Structure
- `app/`
    - `main.py` (Backend)
    - `templates/` (Prompt templates)
    - `static/` (Frontend assets: index.html, style.css, script.js)
