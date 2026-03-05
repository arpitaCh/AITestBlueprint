# SOP: Test Case Generation with Ollama

## Goal
Generate comprehensive test cases based on user-provided functionality descriptions using the local Llama 3.2 model via Ollama API.

## Inputs
- **user_input** (string): Natural language description of the functionality to test
  - Examples: "Login function with email validation", "Shopping cart add/remove items"

## Processing Logic

### 1. Prompt Construction
- Wrap user input in a system template that instructs the LLM to:
  - Generate test cases in a structured format
  - Include: Test Case ID, Description, Preconditions, Steps, Expected Results
  - Cover: Happy path, edge cases, negative scenarios
  - Use clear, actionable language

### 2. LLM Invocation
- Model: `llama3.2`
- Method: `ollama.generate()`
- Format: JSON mode (if supported) or structured text
- Timeout: 30 seconds
- Error handling: Retry once on connection failure

### 3. Response Processing
- Extract generated test cases
- Validate structure (ensure all required fields present)
- Format for display (markdown or plain text)

## Outputs
- **generated_test_cases** (string): Formatted test cases ready for display
- **metadata** (object): 
  - model: "llama3.2"
  - duration_ms: processing time
  - status: "success" | "error"

## Edge Cases
1. **Empty Input**: Return error message asking for description
2. **Very Long Input** (>2000 chars): Truncate with warning
3. **Ollama Unavailable**: Return friendly error with troubleshooting steps
4. **Malformed Response**: Return raw response with warning flag

## System Prompt Template
```
You are an expert QA engineer. Generate comprehensive test cases for the following functionality:

{user_input}

Format your response as follows:
- Test Case ID: TC-XXX
- Description: Brief description
- Preconditions: What must be true before testing
- Test Steps: Numbered steps
- Expected Result: What should happen

Generate at least 5 test cases covering:
1. Happy path (normal flow)
2. Edge cases (boundary conditions)
3. Negative scenarios (error handling)
```

## Dependencies
- Ollama service running locally
- `llama3.2` model pulled
- Python `ollama` library installed

## Error Codes
- `ERR_EMPTY_INPUT`: User input is empty
- `ERR_OLLAMA_UNAVAILABLE`: Cannot connect to Ollama
- `ERR_TIMEOUT`: Request took longer than 30s
- `ERR_INVALID_RESPONSE`: LLM response doesn't match expected format
