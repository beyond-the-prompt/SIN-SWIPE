class ChatBubble extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const isUser = this.hasAttribute('user');
    const message = this.textContent;
    
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          margin: 10px 0;
          animation: fadeIn 0.3s ease-out;
        }
        
        .bubble {
          max-width: 80%;
          padding: 12px 16px;
          border-radius: 20px;
          position: relative;
          word-wrap: break-word;
        }
        
        .user {
          background: linear-gradient(135deg, #ff00ff, #0f0);
          color: black;
          margin-left: auto;
          border-bottom-right-radius: 5px;
        }
        
        .other {
          background: #333;
          color: white;
          margin-right: auto;
          border-bottom-left-radius: 5px;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(10px); }
          to { opacity: 1; transform: translateY(0); }
        }
      </style>
      
      <div class="bubble ${isUser ? 'user' : 'other'}">
        ${message}
        <span class="time">${new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
      </div>
    `;
  }
}

customElements.define('chat-bubble', ChatBubble);