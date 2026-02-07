class CategoryCarousel extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.category = this.getAttribute('category') || 'liquor';
    this.items = [];
    this.currentIndex = 0;
    this.touchStartX = 0;
    this.touchEndX = 0;
  }

  connectedCallback() {
    this.loadItems();
    this.render();
    this.initSwipe();
  }

  loadItems() {
    const categories = {
      liquor: {
        name: "Liquor Delivery",
        description: "Because stores close but bad decisions don't",
        items: [
          { name: "Hennessy Delivery", price: 45, description: "Premium cognac to drown your sorrows", distance: "0.5 mi", rating: 4.8 },
          { name: "24/7 Booze Run", price: 25, description: "Whatever your poison, we got it", distance: "1.2 mi", rating: 4.5 },
          { name: "VIP Bottle Service", price: 150, description: "Show off to your broke friends", distance: "0.8 mi", rating: 4.9 }
        ]
      },
      weed: {
        name: "Weed & More",
        description: "From CBD to WTF",
        items: [
          { name: "Premium Flower", price: 60, description: "Top shelf, sticky icky", distance: "0.3 mi", rating: 4.9 },
          { name: "Edible Delights", price: 35, description: "Baked goods that'll bake you", distance: "1.5 mi", rating: 4.7 },
          { name: "Special Sauce", price: 80, description: "For when you want to see sounds", distance: "0.7 mi", rating: 4.6 }
        ]
      },
      toys: {
        name: "Adult Toys",
        description: "For when UberEats just isn't satisfying",
        items: [
          { name: "Pleasure Pack", price: 75, description: "Everything you need for solo fun", distance: "1.0 mi", rating: 4.8 },
          { name: "Deluxe Collection", price: 120, description: "The VIP treatment for your privates", distance: "0.4 mi", rating: 4.9 },
          { name: "Beginner's Kit", price: 50, description: "Start your sinful journey", distance: "1.2 mi", rating: 4.5 }
        ]
      },
      massage: {
        name: "Massages",
        description: "Happy endings guaranteed or your sin back",
        items: [
          { name: "Deep Tissue +", price: 100, description: "Works out all your knots", distance: "0.6 mi", rating: 4.7 },
          { name: "Couples Special", price: 180, description: "Bring a friend for extra fun", distance: "1.1 mi", rating: 4.9 },
          { name: "VIP Full Service", price: 250, description: "All the extras you can imagine", distance: "0.5 mi", rating: 5.0 }
        ]
      }
    };

    this.categoryData = categories[this.category];
    this.items = this.categoryData.items;
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: relative;
          overflow: hidden;
          min-height: 400px;
        }
        
        .carousel-container {
          display: flex;
          transition: transform 0.5s cubic-bezier(0.25, 0.8, 0.25, 1);
          height: 100%;
        }
        
        .carousel-item {
          flex: 0 0 100%;
          padding: 1rem;
          box-sizing: border-box;
        }
        
        .item-card {
          background: linear-gradient(135deg, #1a1a1a, #2a2a2a);
          border-radius: 16px;
          padding: 2rem;
          height: 100%;
          display: flex;
          flex-direction: column;
          border: 1px solid #ff00ff;
          box-shadow: 0 10px 30px rgba(255, 0, 255, 0.2);
          position: relative;
          overflow: hidden;
        }
        
        .item-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
          border-radius: 12px;
          margin-bottom: 1.5rem;
          background: #333;
        }
        
        .item-name {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #ff00ff;
        }
        
        .item-description {
          color: #ccc;
          margin-bottom: 1rem;
          flex-grow: 1;
        }
        
        .item-stats {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1.5rem;
        }
        
        .stat {
          text-align: center;
        }
        
        .stat-value {
          font-weight: bold;
          color: #0f0;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #888;
        }
        
        .order-btn {
          background: linear-gradient(135deg, #ff00ff, #0f0);
          color: black;
          border: none;
          padding: 12px;
          border-radius: 8px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s;
          text-align: center;
        }
        
        .order-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 5px 15px rgba(0, 255, 0, 0.3);
        }
        
        .nav-dots {
          display: flex;
          justify-content: center;
          margin-top: 1rem;
          gap: 0.5rem;
        }
        
        .dot {
          width: 10px;
          height: 10px;
          border-radius: 50%;
          background: #444;
          cursor: pointer;
          transition: background 0.3s;
        }
        
        .dot.active {
          background: #0f0;
          transform: scale(1.2);
        }
        
        .category-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }
        
        .category-name {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          background: linear-gradient(90deg, #ff00ff, #0f0);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .category-description {
          color: #aaa;
          font-size: 1.1rem;
        }
        
        @media (max-width: 768px) {
          :host {
            min-height: 350px;
          }
          
          .item-card {
            padding: 1.5rem;
          }
          
          .item-image {
            height: 150px;
          }
        }
      </style>
      
      <div class="category-header">
        <h3 class="category-name">${this.categoryData.name}</h3>
        <p class="category-description">${this.categoryData.description}</p>
      </div>
      
      <div class="carousel-container" id="carousel">
        ${this.items.map((item, index) => `
          <div class="carousel-item">
            <div class="item-card">
              <img src="${this.getRandomImage()}" class="item-image" alt="${item.name}" loading="lazy">
              <h4 class="item-name">${item.name}</h4>
              <p class="item-description">${item.description}</p>
              
              <div class="item-stats">
                <div class="stat">
                  <div class="stat-value">$${item.price}</div>
                  <div class="stat-label">Price</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${item.distance}</div>
                  <div class="stat-label">Distance</div>
                </div>
                <div class="stat">
                  <div class="stat-value">${item.rating}</div>
                  <div class="stat-label">Rating</div>
                </div>
              </div>
              
              <button class="order-btn" data-id="${index}">
                Order Now
              </button>
            </div>
          </div>
        `).join('')}
      </div>
      
      <div class="nav-dots">
        ${this.items.map((_, index) => `
          <div class="dot ${index === 0 ? 'active' : ''}" data-index="${index}"></div>
        `).join('')}
      </div>
    `;

    this.carousel = this.shadowRoot.getElementById('carousel');
    this.initEventListeners();
    this.updateCarousel();
  }

  getRandomImage() {
    const themes = {
      liquor: ['black', 'vintage', 'food', 'restaurant'],
      weed: ['green', 'nature', 'science', 'medical'],
      toys: ['technology', 'retail', 'black', 'indoor'],
      massage: ['wellness', 'people', 'cosmetic', 'indoor']
    };
    const theme = themes[this.category][Math.floor(Math.random() * themes[this.category].length)];
    return `http://static.photos/${theme}/640x360/${Math.floor(Math.random() * 1000)}`;
  }

  initEventListeners() {
    this.shadowRoot.querySelectorAll('.order-btn').forEach(btn => {
      btn.addEventListener('click', (e) => {
        const item = this.items[parseInt(e.target.dataset.id)];
        this.dispatchEvent(new CustomEvent('order-item', {
          detail: { item, category: this.category },
          bubbles: true,
          composed: true
        }));
      });
    });

    this.shadowRoot.querySelectorAll('.dot').forEach(dot => {
      dot.addEventListener('click', (e) => {
        this.currentIndex = parseInt(e.target.dataset.index);
        this.updateCarousel();
      });
    });
  }

  initSwipe() {
    const carousel = this.carousel;

    carousel.addEventListener('touchstart', (e) => {
      this.touchStartX = e.changedTouches[0].screenX;
    }, { passive: true });

    carousel.addEventListener('touchend', (e) => {
      this.touchEndX = e.changedTouches[0].screenX;
      this.handleSwipe();
    }, { passive: true });
  }

  handleSwipe() {
    const threshold = 50;
    const diff = this.touchStartX - this.touchEndX;

    if (diff > threshold) {
      // Swipe left - next item
      this.currentIndex = Math.min(this.currentIndex + 1, this.items.length - 1);
    } else if (diff < -threshold) {
      // Swipe right - previous item
      this.currentIndex = Math.max(this.currentIndex - 1, 0);
    }

    this.updateCarousel();
  }

  updateCarousel() {
    const transformValue = `translateX(-${this.currentIndex * 100}%)`;
    this.carousel.style.transform = transformValue;

    // Update dots
    this.shadowRoot.querySelectorAll('.dot').forEach((dot, index) => {
      dot.classList.toggle('active', index === this.currentIndex);
    });
  }
}

customElements.define('category-carousel', CategoryCarousel);