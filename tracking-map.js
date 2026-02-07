class TrackingMap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.progress = 0;
    this.interval = null;
  }

  connectedCallback() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          position: fixed;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%);
          width: 80%;
          max-width: 500px;
          background: #111;
          border-radius: 15px;
          padding: 20px;
          box-shadow: 0 5px 30px rgba(255,0,255,0.5);
          z-index: 1001;
          opacity: 0;
          transition: opacity 0.3s;
        }
        
        :host([open]) {
          opacity: 1;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 15px;
        }
        
        .title {
          font-size: 1.2rem;
          font-weight: bold;
          background: linear-gradient(90deg, #ff00ff, #0f0);
          -webkit-background-clip: text;
          background-clip: text;
          color: transparent;
        }
        
        .close-btn {
          background: none;
          border: none;
          color: white;
          font-size: 1.2rem;
          cursor: pointer;
        }
        
        .map {
          width: 100%;
          height: 300px;
          background: #222;
          border-radius: 10px;
          position: relative;
          overflow: hidden;
          margin-bottom: 15px;
        }
        
        .map-overlay {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: linear-gradient(135deg, rgba(255,0,255,0.1), rgba(0,255,0,0.1));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
          color: #666;
        }
        
        .route {
          position: absolute;
          top: 50%;
          left: 10%;
          width: 80%;
          height: 4px;
          background: rgba(255,255,255,0.3);
        }
        
        .progress {
          position: absolute;
          top: 0;
          left: 0;
          width: 0;
          height: 100%;
          background: linear-gradient(90deg, #ff00ff, #0f0);
        }
        
        .pin {
          position: absolute;
          top: 50%;
          left: 10%;
          transform: translate(-50%, -50%);
          width: 30px;
          height: 30px;
          background: linear-gradient(135deg, #ff00ff, #0f0);
          border-radius: 50% 50% 50% 0;
          transform: rotate(-45deg);
          margin-top: -15px;
        }
        
        .pin::after {
          content: '';
          position: absolute;
          top: 5px;
          left: 5px;
          width: 20px;
          height: 20px;
          background: #111;
          border-radius: 50%;
        }
        
        .details {
          display: flex;
          justify-content: space-between;
        }
        
        .detail {
          text-align: center;
        }
        
        .detail-value {
          font-size: 1.2rem;
          font-weight: bold;
        }
        
        .detail-label {
          font-size: 0.8rem;
          color: #999;
        }
      </style>
      
      <div class="header">
        <div class="title">Your Sin Is On The Way</div>
        <button class="close-btn" id="close-btn">
          <i data-feather="x"></i>
        </button>
      </div>
      
      <div class="map">
        <div class="map-overlay">WHOREDASH GPS TRACKING</div>
        <div class="route">
          <div class="progress" id="progress"></div>
        </div>
        <div class="pin" id="pin"></div>
      </div>
      
      <div class="details">
        <div class="detail">
          <div class="detail-value" id="distance">0.5 mi</div>
          <div class="detail-label">Distance</div>
        </div>
        <div class="detail">
          <div class="detail-value" id="time">5 min</div>
          <div class="detail-label">ETA</div>
        </div>
        <div class="detail">
          <div class="detail-value" id="price">$45</div>
          <div class="detail-label">Price</div>
        </div>
      </div>
    `;
    
    feather.replace();
    this.initTracking();
    
    const closeBtn = this.shadowRoot.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
      this.removeAttribute('open');
      clearInterval(this.interval);
      setTimeout(() => this.remove(), 300);
    });
    
    setTimeout(() => this.setAttribute('open', ''), 100);
  }
  
  initTracking() {
    const progressBar = this.shadowRoot.getElementById('progress');
    const pin = this.shadowRoot.getElementById('pin');
    const distanceEl = this.shadowRoot.getElementById('distance');
    const timeEl = this.shadowRoot.getElementById('time');
    
    this.interval = setInterval(() => {
      this.progress += Math.random() * 5;
      if (this.progress >= 100) {
        this.progress = 100;
        clearInterval(this.interval);
        this.dispatchEvent(new CustomEvent('delivery-arrived'));
      }
      
      progressBar.style.width = `${this.progress}%`;
      pin.style.left = `${10 + (this.progress / 100 * 80)}%`;
      
      const remainingDistance = (5 * (100 - this.progress) / 100).toFixed(1);
      distanceEl.textContent = `${remainingDistance} mi`;
      
      const eta = Math.ceil((100 - this.progress) / 20);
      timeEl.textContent = `${eta} min`;
    }, 1000);
  }
}

customElements.define('tracking-map', TrackingMap);