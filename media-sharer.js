
class MediaSharer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this._handleOutsideClick = this._handleOutsideClick.bind(this);
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          --primary-color: #8a2be2;
          --hover-color: #9932cc;
          --bg-color: #1a1a1a;
          --text-color: #f0f0f0;
          
          display: block;
          position: fixed;
          bottom: 80px;
          right: 20px;
          width: 320px;
          background: var(--bg-color);
          border-radius: 16px;
          box-shadow: 0 10px 25px rgba(0,0,0,0.3),
                      0 0 0 1px rgba(255,255,255,0.05);
          padding: 20px;
          z-index: 1000;
          transform: translateY(20px);
          opacity: 0;
          transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        
        :host([open]) {
          transform: translateY(0);
          opacity: 1;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
          padding-bottom: 10px;
          border-bottom: 1px solid rgba(255,255,255,0.1);
        }
        
        .title {
          font-weight: 600;
          color: var(--primary-color);
          font-size: 1.1rem;
          letter-spacing: 0.5px;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: var(--text-color);
          cursor: pointer;
          opacity: 0.7;
          transition: opacity 0.2s;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 4px;
          border-radius: 50%;
        }
        
        .close-btn:hover {
          opacity: 1;
          background: rgba(255,255,255,0.1);
        }
        
        .media-options {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 12px;
        }
        
        .media-option {
          aspect-ratio: 1;
          background: #2a2a2a;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          cursor: pointer;
          transition: all 0.3s cubic-bezier(0.25, 0.46, 0.45, 0.94);
          overflow: hidden;
          position: relative;
        }
        
        .media-option::before {
          content: '';
          position: absolute;
          inset: 0;
          background: linear-gradient(45deg, rgba(138,43,226,0.3), transparent);
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        .media-option:hover {
          transform: translateY(-5px) scale(1.05);
          box-shadow: 0 5px 15px rgba(138,43,226,0.3);
        }
        
        .media-option:hover::before {
          opacity: 1;
        }
        
        .media-option img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform 0.3s;
        }
        
        .media-option:hover img {
          transform: scale(1.1);
        }
        
        .media-badge {
          position: absolute;
          bottom: 8px;
          right: 8px;
          background: rgba(0,0,0,0.7);
          color: white;
          font-size: 0.7rem;
          padding: 2px 6px;
          border-radius: 10px;
          text-transform: uppercase;
          font-weight: 500;
        }
      </style>
      <div class="header">
        <div class="title">Share Your Media</div>
        <button class="close-btn" id="close-btn">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
      </div>
      
      <div class="media-options">
        <div class="media-option" data-type="image">
          <img src="http://static.photos/people/200x200/1" alt="Image" loading="lazy">
          <span class="media-badge">Image</span>
        </div>
        <div class="media-option" data-type="image">
          <img src="http://static.photos/vintage/200x200/2" alt="Image" loading="lazy">
          <span class="media-badge">Image</span>
        </div>
        <div class="media-option" data-type="image">
          <img src="http://static.photos/cosmetic/200x200/3" alt="Image" loading="lazy">
          <span class="media-badge">Image</span>
        </div>
        <div class="media-option" data-type="gif">
          <img src="http://static.photos/retail/200x200/4" alt="GIF" loading="lazy">
          <span class="media-badge">GIF</span>
        </div>
        <div class="media-option" data-type="gif">
          <img src="http://static.photos/technology/200x200/5" alt="GIF" loading="lazy">
          <span class="media-badge">GIF</span>
        </div>
        <div class="media-option" data-type="video">
          <img src="http://static.photos/black/200x200/6" alt="Video" loading="lazy">
          <span class="media-badge">Video</span>
        </div>
      </div>
    `;

    this.shadowRoot.getElementById('close-btn').addEventListener('click', () => {
      this._close();
    });

    this.shadowRoot.querySelectorAll('.media-option').forEach(option => {
      option.addEventListener('click', () => {
        const type = option.dataset.type;
        const src = option.querySelector('img').src;
        this._dispatchSelection(type, src);
      });
    });

    setTimeout(() => {
      this.setAttribute('open', '');
      document.addEventListener('click', this._handleOutsideClick);
    }, 100);
  }

  disconnectedCallback() {
    document.removeEventListener('click', this._handleOutsideClick);
  }

  _close() {
    this.removeAttribute('open');
    setTimeout(() => this.remove(), 300);
  }

  _dispatchSelection(type, src) {
    this.dispatchEvent(new CustomEvent('media-selected', {
      detail: { type, src },
      bubbles: true,
      composed: true
    }));
    this._close();
  }

  _handleOutsideClick(event) {
    const path = event.composedPath();
    if (!path.includes(this)) {
      this._close();
    }
  }
}
}

customElements.define('media-sharer', MediaSharer);