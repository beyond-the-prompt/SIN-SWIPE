class LiveStats extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.stats = {
      usersOnline: 0,
      deliveriesToday: 0,
      matchesMade: 0
    };
  }

  connectedCallback() {
    this.render();
    this.startUpdatingStats();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
          background: rgba(0,0,0,0.7);
          border: 1px solid #ff00ff;
          border-radius: 10px;
          padding: 15px;
          margin: 20px 0;
        }
        
        .stats-title {
          font-size: 1.2rem;
          margin-bottom: 10px;
          color: #0f0;
          text-align: center;
        }
        
        .stats-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 10px;
        }
        
        .stat-item {
          text-align: center;
        }
        
        .stat-value {
          font-size: 1.5rem;
          font-weight: bold;
          color: #ff00ff;
          margin-bottom: 5px;
        }
        
        .stat-label {
          font-size: 0.8rem;
          color: #ccc;
        }
        
        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }
        
        .pulse {
          animation: pulse 2s infinite;
        }
      </style>
      
      <div class="stats-title">LIVE STATS</div>
      <div class="stats-grid">
        <div class="stat-item">
          <div class="stat-value" id="users">${this.stats.usersOnline}</div>
          <div class="stat-label">Users Online</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="deliveries">${this.stats.deliveriesToday}</div>
          <div class="stat-label">Deliveries Today</div>
        </div>
        <div class="stat-item">
          <div class="stat-value" id="matches">${this.stats.matchesMade}</div>
          <div class="stat-label">Matches Made</div>
        </div>
      </div>
    `;
  }

  startUpdatingStats() {
    // Simulate live updates
    setInterval(() => {
      this.stats.usersOnline = Math.floor(5000 + Math.random() * 1000);
      this.stats.deliveriesToday = Math.floor(1200 + Math.random() * 500);
      this.stats.matchesMade = Math.floor(800 + Math.random() * 300);
      
      this.shadowRoot.getElementById('users').textContent = this.stats.usersOnline;
      this.shadowRoot.getElementById('deliveries').textContent = this.stats.deliveriesToday;
      this.shadowRoot.getElementById('matches').textContent = this.stats.matchesMade;
      
      // Add pulse animation to random stat
      const statIds = ['users', 'deliveries', 'matches'];
      const randomStat = statIds[Math.floor(Math.random() * statIds.length)];
      const statElement = this.shadowRoot.getElementById(randomStat);
      
      statElement.classList.add('pulse');
      setTimeout(() => {
        statElement.classList.remove('pulse');
      }, 2000);
    }, 3000);
  }
}

customElements.define('live-stats', LiveStats);