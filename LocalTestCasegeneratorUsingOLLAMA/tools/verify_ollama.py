import ollama
import sys

def verify_ollama_connection():
    model = "llama3.2"
    print(f"Testing connection to Ollama with model: {model}...")
    
    try:
        # Simple generation to test handshake
        response = ollama.generate(model=model, prompt="Are you ready to generate test cases? Answer with 'Yes, I am ready.'")
        print("Response received:")
        print(response['response'])
        
        if response['response']:
            print("✅ SUCCESS: Ollama connection verified.")
            sys.exit(0)
        else:
            print("❌ FAILURE: No response content.")
            sys.exit(1)
            
    except Exception as e:
        print(f"❌ ERROR: Could not connect to Ollama. Details: {e}")
        sys.exit(1)

if __name__ == "__main__":
    verify_ollama_connection()
