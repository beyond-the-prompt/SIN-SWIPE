class DeliveryCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          width: 100%;
          max-width: 400px;
          height: 600px;
          margin: 0 auto;
          background: #1a1a1a;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 10px 30px rgba(255, 0, 255, 0.2);
          transition: transform 0.3s;
          user-select: none;
          touch-action: none;
        }
        
        .card-image {
          width: 100%;
          height: 70%;
          object-fit: cover;
        }
        
        .card-content {
          padding: 20px;
        }
        
        .name {
          font-size: 2rem;
          font-weight: bold;
          margin-bottom: 5px;
          background: linear-gradient(45deg, #ff00ff, #0f0);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .description {
          color: #ccc;
          margin-bottom: 15px;
        }
        
        .stats {
          display: flex;
          justify-content: space-between;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #999;
        }
        
        .stat-value {
          font-size: 1.2rem;
          font-weight: bold;
        }
        
        .badge {
          position: absolute;
          top: 15px;
          right: 15px;
          background: linear-gradient(45deg, #ff00ff, #0f0);
          color: black;
          padding: 5px 10px;
          border-radius: 20px;
          font-weight: bold;
          font-size: 0.8rem;
        }
        
        .swipe-feedback {
          position: absolute;
          top: 50px;
          width: 100%;
          text-align: center;
          font-weight: bold;
          font-size: 2rem;
          opacity: 0;
          pointer-events: none;
          z-index: 10;
        }
        
        .swipe-like {
          right: 20px;
          color: #0f0;
          transform: rotate(15deg);
        }
        
        .swipe-nope {
          left: 20px;
          color: #f00;
          transform: rotate(-15deg);
        }
        
        .chat-btn {
          position: absolute;
          bottom: 20px;
          right: 20px;
          background: linear-gradient(45deg, #ff00ff, #0f0);
          color: black;
          border: none;
          padding: 10px 20px;
          border-radius: 30px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s;
        }
        
        .chat-btn:hover {
          transform: scale(1.05);
        }
      </style>
      <video class="card-image" autoplay loop muted playsinline>
        <source src="https://huggingface.co/spaces/Bearcare/whoredash-sinful-swipe-delivery/resolve/main/videos/N983XaMVfyzflBOVJ4jk.mp4" type="video/mp4">
      </video>
<div class="swipe-feedback swipe-like">LIKE</div>
      <div class="swipe-feedback swipe-nope">NOPE</div>
      
      <div class="card-content">
        <h3 class="name"></h3>
        <p class="description"></p>
        <div class="stats">
          <div class="stat">
            <div class="stat-value" id="distance"></div>
            <div class="stat-label">Distance</div>
          </div>
          <div class="stat">
            <div class="stat-value" id="price"></div>
            <div class="stat-label">Price</div>
          </div>
          <div class="stat">
            <div class="stat-value" id="rating"></div>
            <div class="stat-label">Rating</div>
          </div>
        </div>
      </div>
      
      <button class="chat-btn">
        <i data-feather="message-square"></i> Chat Now
      </button>
    `;
    
    this.startX = 0;
    this.moveX = 0;
    this.isSwiping = false;
  }

  connectedCallback() {
    this.loadData();
    this.initSwipe();
    this.initChat();
  }

  loadData() {
    const types = ['hooker', 'drugs', 'booze', 'massage', 'toys'];
    const type = types[Math.floor(Math.random() * types.length)];
    const name = this.getRandomName();
    const img = this.getRandomImage(type);
    
    this.shadowRoot.querySelector('.card-image').src = img;
    this.shadowRoot.querySelector('.name').textContent = name;
    this.shadowRoot.querySelector('.description').textContent = this.getRandomDescription(type);
    this.shadowRoot.querySelector('#distance').textContent = `${(Math.random() * 5 + 0.5).toFixed(1)} mi`;
    this.shadowRoot.querySelector('#price').textContent = `$${Math.floor(Math.random() * 50 + 20)}`;
    this.shadowRoot.querySelector('#rating').textContent = `${(Math.random() * 2 + 3).toFixed(1)}`;
    
    if (Math.random() > 0.7) {
      const badge = document.createElement('div');
      badge.className = 'badge';
      badge.textContent = 'VIP';
      this.shadowRoot.appendChild(badge);
    }
    
    feather.replace();
  }

  getRandomName() {
    const first = ['Candy', 'Diamond', 'Lexus', 'Destiny', 'Angel', 'Porsche', 'Chanel', 'Gucci', 'Mercedes', 'Tiffany'];
    const last = ['Doe', 'Sinclair', 'Delight', 'Bliss', 'Honey', 'Love', 'Dream', 'Fox', 'Bunny', 'Star'];
    return `${first[Math.floor(Math.random() * first.length)]} ${last[Math.floor(Math.random() * last.length)]}`;
  }
  getRandomImage(type) {
    const categories = {
      hooker: ['people', 'vintage', 'cosmetic', 'retail'],
      drugs: ['science', 'medical', 'education', 'legal'],
      booze: ['food', 'restaurant', 'vintage', 'black'],
      massage: ['wellness', 'medical', 'people', 'indoor'],
      toys: ['technology', 'retail', 'indoor', 'black']
    };

    const themes = categories[type] || ['people', 'technology', 'retail'];
    const theme = themes[Math.floor(Math.random() * themes.length)];
    const seed = Math.floor(Math.random() * 1000);
    
    return `http://static.photos/${theme}/640x360/${seed}`;
  }
getRandomDescription(type) {
    const descriptions = {
      hooker: [
        "Available for all your sinful desires. Specializes in deep tissue... among other things.",
        "Your personal pleasure provider. No judgment, just satisfaction.",
        "Professional companion with 5 years experience. Discretion guaranteed.",
        "Will make you forget your name. In a good way."
      ],
      drugs: [
        "Pharmaceutical grade happiness. Guaranteed to make your problems disappear.",
        "Premium quality substances for your recreational needs.",
        "Chemist with a heart. Only the purest for my clients.",
        "Your one-stop sin shop for chemical enlightenment."
      ],
      booze: [
        "Liquor delivery specialist. Because stores close but bad decisions don't.",
        "I'll bring the party to you. No need to leave your shame cave.",
        "24/7 alcohol concierge. Whatever your poison, I got you.",
        "Your drunken fairy godmother. Bibbidi bobbidi booze."
      ],
      massage: [
        "Licensed masseuse (wink wink). Specializes in happy endings.",
        "Therapeutic touch with benefits. You'll leave satisfied in more ways than one.",
        "Stress relief specialist. I'll rub you the right way.",
        "Deep tissue and deeper pleasures. No questions asked."
      ],
      toys: [
        "Adult toy curator. For when UberEats just isn't satisfying.",
        "Your pleasure is my business. Discreet packaging guaranteed.",
        "Specialized in high-end intimate devices. Battery included.",
        "Bringing joy to lonely nights since 2015."
      ]
    };
    
    return descriptions[type][Math.floor(Math.random() * descriptions[type].length)];
  }

  initSwipe() {
    const card = this.shadowRoot.host;
    const likeFeedback = this.shadowRoot.querySelector('.swipe-like');
    const nopeFeedback = this.shadowRoot.querySelector('.swipe-nope');
    
    card.addEventListener('touchstart', e => {
      this.startX = e.touches[0].clientX;
      this.isSwiping = true;
    }, { passive: true });
    
    card.addEventListener('touchmove', e => {
      if (!this.isSwiping) return;
      this.moveX = e.touches[0].clientX - this.startX;
      
      card.style.transform = `translateX(${this.moveX}px) rotate(${this.moveX / 20}deg)`;
      
      if (this.moveX > 0) {
        likeFeedback.style.opacity = Math.min(this.moveX / 100, 1);
        nopeFeedback.style.opacity = 0;
      } else {
        nopeFeedback.style.opacity = Math.min(-this.moveX / 100, 1);
        likeFeedback.style.opacity = 0;
      }
    }, { passive: true });
    
    card.addEventListener('touchend', () => {
      if (!this.isSwiping) return;
      this.isSwiping = false;
      
      if (Math.abs(this.moveX) > 100) {
        card.style.transition = 'transform 0.5s, opacity 0.5s';
        card.style.transform = `translateX(${this.moveX > 0 ? 500 : -500}px) rotate(${this.moveX > 0 ? 30 : -30}deg)`;
        card.style.opacity = 0;
        
        setTimeout(() => {
          if (this.moveX > 0) {
            this.dispatchEvent(new CustomEvent('swipe-right', {
              bubbles: true,
              detail: {
                name: this.shadowRoot.querySelector('.name').textContent,
                price: parseFloat(this.shadowRoot.querySelector('#price').textContent.replace('$', ''))
              }
            }));
          }
          card.remove();
        }, 500);
      } else {
        card.style.transform = '';
        likeFeedback.style.opacity = 0;
        nopeFeedback.style.opacity = 0;
      }
    }, { passive: true });
    
    // Mouse events for desktop
    card.addEventListener('mousedown', e => {
      this.startX = e.clientX;
      this.isSwiping = true;
      card.style.cursor = 'grabbing';
    });
    
    card.addEventListener('mousemove', e => {
      if (!this.isSwiping) return;
      this.moveX = e.clientX - this.startX;
      
      card.style.transform = `translateX(${this.moveX}px) rotate(${this.moveX / 20}deg)`;
      
      if (this.moveX > 0) {
        likeFeedback.style.opacity = Math.min(this.moveX / 100, 1);
        nopeFeedback.style.opacity = 0;
      } else {
        nopeFeedback.style.opacity = Math.min(-this.moveX / 100, 1);
        likeFeedback.style.opacity = 0;
      }
    });
    
    card.addEventListener('mouseup', () => {
      if (!this.isSwiping) return;
      this.isSwiping = false;
      card.style.cursor = '';
      
      if (Math.abs(this.moveX) > 100) {
        card.style.transition = 'transform 0.5s, opacity 0.5s';
        card.style.transform = `translateX(${this.moveX > 0 ? 500 : -500}px) rotate(${this.moveX > 0 ? 30 : -30}deg)`;
        card.style.opacity = 0;
        
        setTimeout(() => {
          if (this.moveX > 0) {
            this.dispatchEvent(new CustomEvent('swipe-right', {
              bubbles: true,
              detail: {
                name: this.shadowRoot.querySelector('.name').textContent,
                price: parseFloat(this.shadowRoot.querySelector('#price').textContent.replace('$', ''))
              }
            }));
          }
          card.remove();
        }, 500);
      } else {
        card.style.transform = '';
        likeFeedback.style.opacity = 0;
        nopeFeedback.style.opacity = 0;
      }
    });
    
    card.addEventListener('mouseleave', () => {
      if (this.isSwiping) {
        this.isSwiping = false;
        card.style.transform = '';
        card.style.cursor = '';
        likeFeedback.style.opacity = 0;
        nopeFeedback.style.opacity = 0;
      }
    });
  }

  initChat() {
    const chatBtn = this.shadowRoot.querySelector('.chat-btn');
    chatBtn.addEventListener('click', () => {
      this.dispatchEvent(new CustomEvent('start-chat', {
        bubbles: true,
        detail: {
          name: this.shadowRoot.querySelector('.name').textContent,
          image: this.shadowRoot.querySelector('.card-image').src
        }
      }));
    });
  }
}

customElements.define('delivery-card', DeliveryCard);