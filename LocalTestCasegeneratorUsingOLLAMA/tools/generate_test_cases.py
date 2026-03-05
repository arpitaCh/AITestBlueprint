"""
Tool: Test Case Generator using Ollama
Layer 3 - Deterministic execution tool

This tool takes a user input description and generates test cases using Ollama.
It follows the SOP defined in architecture/test_case_generation.md
"""

import ollama
import sys
import json
from typing import Dict, Any

# Error codes from SOP
ERR_EMPTY_INPUT = "ERR_EMPTY_INPUT"
ERR_OLLAMA_UNAVAILABLE = "ERR_OLLAMA_UNAVAILABLE"
ERR_TIMEOUT = "ERR_TIMEOUT"
ERR_INVALID_RESPONSE = "ERR_INVALID_RESPONSE"

SYSTEM_PROMPT_TEMPLATE = """You are an expert QA engineer. Generate comprehensive test cases for the following functionality:

{user_input}

Format your response as follows for each test case:
- Test Case ID: TC-XXX
- Description: Brief description
- Preconditions: What must be true before testing
- Test Steps: Numbered steps
- Expected Result: What should happen

Generate at least 5 test cases covering:
1. Happy path (normal flow)
2. Edge cases (boundary conditions)
3. Negative scenarios (error handling)

Be specific and actionable in your test steps."""

def generate_test_cases(user_input: str, model: str = "llama3.2") -> Dict[str, Any]:
    """
    Generate test cases using Ollama.
    
    Args:
        user_input: User's description of functionality to test
        model: Ollama model to use (default: llama3.2)
    
    Returns:
        Dictionary with status, generated_test_cases, and metadata
    """
    # Edge case: Empty input
    if not user_input or not user_input.strip():
        return {
            "status": "error",
            "error_code": ERR_EMPTY_INPUT,
            "message": "Please provide a description of the functionality to test.",
            "generated_test_cases": "",
            "metadata": {"model": model, "duration_ms": 0}
        }
    
    # Edge case: Very long input
    if len(user_input) > 2000:
        user_input = user_input[:2000]
        print("⚠️ Warning: Input truncated to 2000 characters", file=sys.stderr)
    
    # Construct prompt
    prompt = SYSTEM_PROMPT_TEMPLATE.format(user_input=user_input)
    
    try:
        import time
        start_time = time.time()
        
        # Invoke Ollama
        response = ollama.generate(
            model=model,
            prompt=prompt,
            options={
                "temperature": 0.7,
                "num_predict": 2048
            }
        )
        
        duration_ms = int((time.time() - start_time) * 1000)
        
        # Extract response
        if not response or 'response' not in response:
            return {
                "status": "error",
                "error_code": ERR_INVALID_RESPONSE,
                "message": "Received invalid response from Ollama",
                "generated_test_cases": "",
                "metadata": {"model": model, "duration_ms": duration_ms}
            }
        
        generated_text = response['response']
        
        return {
            "status": "success",
            "generated_test_cases": generated_text,
            "metadata": {
                "model": model,
                "duration_ms": duration_ms
            }
        }
        
    except Exception as e:
        error_message = str(e)
        
        # Determine error type
        if "connection" in error_message.lower() or "refused" in error_message.lower():
            error_code = ERR_OLLAMA_UNAVAILABLE
            friendly_message = "Cannot connect to Ollama. Please ensure Ollama is running (try 'ollama serve')."
        elif "timeout" in error_message.lower():
            error_code = ERR_TIMEOUT
            friendly_message = "Request timed out. The model may be too slow or overloaded."
        else:
            error_code = "ERR_UNKNOWN"
            friendly_message = f"An unexpected error occurred: {error_message}"
        
        return {
            "status": "error",
            "error_code": error_code,
            "message": friendly_message,
            "generated_test_cases": "",
            "metadata": {"model": model, "duration_ms": 0}
        }

if __name__ == "__main__":
    # CLI interface for testing
    if len(sys.argv) < 2:
        print("Usage: python generate_test_cases.py '<functionality description>'")
        sys.exit(1)
    
    user_input = sys.argv[1]
    result = generate_test_cases(user_input)
    
    print(json.dumps(result, indent=2))
    
    if result["status"] == "error":
        sys.exit(1)
