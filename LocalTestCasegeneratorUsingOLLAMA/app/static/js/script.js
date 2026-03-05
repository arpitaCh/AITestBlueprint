document.addEventListener('DOMContentLoaded', () => {
    const userInput = document.getElementById('user-input');
    const sendBtn = document.getElementById('send-btn');
    const chatHistory = document.getElementById('chat-history');

    // Auto-resize textarea
    userInput.addEventListener('input', function () {
        this.style.height = 'auto';
        this.style.height = (this.scrollHeight) + 'px';
        if (this.value.trim().length > 0) {
            sendBtn.removeAttribute('disabled');
        } else {
            sendBtn.setAttribute('disabled', 'true');
        }
    });

    // Send on Enter (without shift)
    userInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            if (!sendBtn.disabled) sendBtn.click();
        }
    });

    sendBtn.addEventListener('click', async () => {
        const text = userInput.value.trim();
        if (!text) return;

        // Add User Message
        appendMessage('user', text);
        userInput.value = '';
        userInput.style.height = '56px';
        sendBtn.disabled = true;

        // Show Loading
        const loadingId = appendLoading();

        try {
            const response = await fetch('/generate', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ user_input: text })
            });

            if (!response.ok) throw new Error('Network response was not ok');

            const data = await response.json();

            // Remove Loading
            removeMessage(loadingId);

            // Add Assistant Message
            appendMessage('system', data.generated_test_cases);

        } catch (error) {
            removeMessage(loadingId);
            appendMessage('system', `❌ Error: ${error.message}`);
        }
    });

    function appendMessage(role, text) {
        const div = document.createElement('div');
        div.className = `message ${role}`;

        const avatar = document.createElement('div');
        avatar.className = 'avatar';
        avatar.innerHTML = role === 'user' ? '👤' : '🤖';

        const content = document.createElement('div');
        content.className = 'content';
        content.style.whiteSpace = 'pre-wrap'; // Preserve formatting
        content.textContent = text;

        div.appendChild(avatar);
        div.appendChild(content);

        chatHistory.appendChild(div);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return div.id = 'msg-' + Date.now();
    }

    function appendLoading() {
        const id = 'loading-' + Date.now();
        const div = document.createElement('div');
        div.id = id;
        div.className = 'message system';
        div.innerHTML = `
            <div class="avatar">🤖</div>
            <div class="content">
                <span class="typing-indicator">Thinking...</span>
            </div>
        `;
        chatHistory.appendChild(div);
        chatHistory.scrollTop = chatHistory.scrollHeight;
        return id;
    }

    function removeMessage(id) {
        const el = document.getElementById(id);
        if (el) el.remove();
    }
});
