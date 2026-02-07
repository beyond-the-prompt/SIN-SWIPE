class WhoredasherSelector extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.whoredashers = [
      {
        name: "Candi 🍑",
        specialty: "Party Starter",
        description: "I'll bring the drinks and the vibes. Perfect for bachelor parties or lonely nights.",
        price: "$300/hr",
        image: "http://static.photos/people/640x360/1"
      },
      {
        name: "Lexus 👠",
        specialty: "Luxury Companion",
        description: "High class escort for business events or private dinners. Discretion guaranteed.",
        price: "$500/hr",
        image: "http://static.photos/retail/640x360/2"
      },
      {
        name: "Diamond 💎",
        specialty: "BDSM Expert",
        description: "Your pleasure is my pain. Safe words required.",
        price: "$400/hr",
        image: "http://static.photos/black/640x360/3"
      }
    ];
  }

  connectedCallback() {
    this.render();
    this.initEventListeners();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: rgba(0,0,0,0.8);
          border-radius: 16px;
          padding: 2rem;
          border: 2px solid #ff00ff;
          box-shadow: 0 10px 30px rgba(255,0,255,0.3);
        }
        
        .title {
          font-size: 1.8rem;
          font-weight: bold;
          margin-bottom: 1.5rem;
          text-align: center;
          background: linear-gradient(90deg, #ff00ff, #0f0);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .whoredashers {
          display: grid;
          gap: 1.5rem;
        }
        
        .whoredasher {
          background: #1a1a1a;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid #ff00ff;
          transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .whoredasher:hover {
          transform: translateY(-5px);
          box-shadow: 0 10px 20px rgba(255,0,255,0.2);
        }
        
        .whoredasher-image {
          width: 100%;
          height: 200px;
          object-fit: cover;
        }
        
        .whoredasher-details {
          padding: 1.5rem;
        }
        
        .whoredasher-name {
          font-size: 1.5rem;
          font-weight: bold;
          margin-bottom: 0.5rem;
          color: #ff00ff;
        }
        
        .whoredasher-specialty {
          display: inline-block;
          background: rgba(0,255,0,0.2);
          color: #0f0;
          padding: 0.25rem 0.75rem;
          border-radius: 20px;
          font-size: 0.9rem;
          margin-bottom: 1rem;
        }
        
        .whoredasher-description {
          color: #ccc;
          margin-bottom: 1.5rem;
          line-height: 1.5;
        }
        
        .whoredasher-footer {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }
        
        .whoredasher-price {
          font-size: 1.2rem;
          font-weight: bold;
          color: #0f0;
        }
        
        .select-btn {
          background: linear-gradient(135deg, #ff00ff, #0f0);
          color: black;
          border: none;
          padding: 0.5rem 1.5rem;
          border-radius: 20px;
          font-weight: bold;
          cursor: pointer;
          transition: transform 0.3s;
        }
        
        .select-btn:hover {
          transform: scale(1.05);
        }
        
        @media (min-width: 768px) {
          .whoredashers {
            grid-template-columns: repeat(3, 1fr);
          }
        }
      </style>
      
      <h2 class="title">Select Your Whoredasher</h2>
      
      <div class="whoredashers">
        ${this.whoredashers.map(whoredasher => `
          <div class="whoredasher" data-name="${whoredasher.name}">
            <img src="${whoredasher.image}" class="whoredasher-image" alt="${whoredasher.name}" loading="lazy">
            <div class="whoredasher-details">
              <h3 class="whoredasher-name">${whoredasher.name}</h3>
              <span class="whoredasher-specialty">${whoredasher.specialty}</span>
              <p class="whoredasher-description">${whoredasher.description}</p>
              <div class="whoredasher-footer">
                <span class="whoredasher-price">${whoredasher.price}</span>
                <button class="select-btn">Select</button>
              </div>
            </div>
          </div>
        `).join('')}
      </div>
    `;
  }

  initEventListeners() {
    this.shadowRoot.querySelectorAll('.select-btn').forEach((btn, index) => {
      btn.addEventListener('click', () => {
        const whoredasher = this.whoredashers[index];
        this.dispatchEvent(new CustomEvent('whoredasher-selected', {
          detail: whoredasher,
          bubbles: true,
          composed: true
        }));
      });
    });
  }
}

customElements.define('whoredasher-selector', WhoredasherSelector);