class ChatWindow extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.messages = [];
    this.typing = false;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          bottom: 20px;
          right: 20px;
          width: 350px;
          max-height: 500px;
          background: #222;
          border-radius: 15px;
          box-shadow: 0 5px 30px rgba(255,0,255,0.3);
          overflow: hidden;
          z-index: 1000;
          transform: translateY(20px);
          opacity: 0;
          transition: transform 0.3s, opacity 0.3s;
        }
        
        :host([open]) {
          transform: translateY(0);
          opacity: 1;
        }
        
        .header {
          background: linear-gradient(90deg, #ff00ff, #0f0);
          color: black;
          padding: 15px;
          font-weight: bold;
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: black;
          font-size: 1.2rem;
          cursor: pointer;
        }
        
        .messages {
          padding: 15px;
          height: 350px;
          overflow-y: auto;
          scroll-behavior: smooth;
        }
        
        .input-area {
          display: flex;
          padding: 10px;
          border-top: 1px solid #444;
        }
        .input {
          flex: 1;
          background: #333;
          border: none;
          padding: 10px;
          border-radius: 20px;
          color: white;
          outline: none;
        }
        
        .media-btn {
          background: #444;
          color: white;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-right: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .message-media {
          max-width: 100%;
          max-height: 200px;
          border-radius: 10px;
          margin-top: 5px;
          cursor: pointer;
        }
        
        .message-media:hover {
          filter: brightness(1.2);
        }
.send-btn {
          background: linear-gradient(135deg, #ff00ff, #0f0);
          color: black;
          border: none;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          margin-left: 10px;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        
        .typing-indicator {
          color: #999;
          font-size: 0.8rem;
          padding: 5px 15px;
          font-style: italic;
        }
      </style>
      
      <div class="header">
        <span id="title">Chat with ${this.getAttribute('name')}</span>
        <button class="close-btn" id="close-btn">
          <i data-feather="x"></i>
        </button>
      </div>
      
      <div class="messages" id="messages"></div>
      
      ${this.typing ? `<div class="typing-indicator">${this.getAttribute('name')} is typing...</div>` : ''}
      
      <div class="input-area">
        <input type="text" class="input" id="message-input" placeholder="Type your message...">
        <button class="send-btn" id="send-btn">
          <i data-feather="send"></i>
        </button>
      </div>
    `;
    
    feather.replace();
    this.initChat();
    setTimeout(() => this.setAttribute('open', ''), 100);
  }
  
  initChat() {
    const messagesContainer = this.shadowRoot.getElementById('messages');
    const input = this.shadowRoot.getElementById('message-input');
    const sendBtn = this.shadowRoot.getElementById('send-btn');
    const closeBtn = this.shadowRoot.getElementById('close-btn');
    
    // Initial messages
    setTimeout(() => {
      this.addMessage(`Hey baby, what can I do for you tonight? 😘`, false);
    }, 500);
    
    setTimeout(() => {
      this.addMessage(`I'm available now if you want some company...`, false);
    }, 2000);
    
    // Send message
    const sendMessage = () => {
      if (input.value.trim()) {
        this.addMessage(input.value, true);
        input.value = '';
        
        // Simulate response
        setTimeout(() => {
          const responses = [
            "Mmm, I like that 😈",
            "Be there in 15 minutes, sugar",
            "That's gonna cost extra 😏",
            "You're making me wet just thinking about it",
            "I have just what you need",
            "Let me grab my toys and I'll be right over"
          ];
          this.addMessage(responses[Math.floor(Math.random() * responses.length)], false);
        }, 1000 + Math.random() * 2000);
      }
    };
    
    sendBtn.addEventListener('click', sendMessage);
    input.addEventListener('keypress', e => {
      if (e.key === 'Enter') sendMessage();
    });
    
    closeBtn.addEventListener('click', () => {
      this.removeAttribute('open');
      setTimeout(() => this.remove(), 300);
    });
  }
  
  addMessage(text, isUser) {
    const messagesContainer = this.shadowRoot.getElementById('messages');
    const bubble = document.createElement('chat-bubble');
    if (isUser) bubble.setAttribute('user', '');
    bubble.textContent = text;
    messagesContainer.appendChild(bubble);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }
}

customElements.define('chat-window', ChatWindow);