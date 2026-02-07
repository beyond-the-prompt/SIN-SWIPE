class NotificationBell extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.notifications = [];
  }

  connectedCallback() {
    this.render();
    this.initEventListeners();
    this.checkForNotifications();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: inline-block;
          position: relative;
          cursor: pointer;
        }
        
        .bell {
          position: relative;
          width: 24px;
          height: 24px;
          color: white;
        }
        
        .badge {
          position: absolute;
          top: -5px;
          right: -5px;
          background: linear-gradient(135deg, #ff00ff, #0f0);
          color: black;
          width: 18px;
          height: 18px;
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 10px;
          font-weight: bold;
        }
        
        .dropdown {
          position: absolute;
          right: 0;
          top: 40px;
          width: 300px;
          background: #222;
          border-radius: 10px;
          box-shadow: 0 5px 30px rgba(255,0,255,0.3);
          z-index: 1000;
          max-height: 400px;
          overflow-y: auto;
          display: none;
        }
        
        .dropdown.open {
          display: block;
          animation: fadeIn 0.3s;
        }
        
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        
        .notification {
          padding: 12px;
          border-bottom: 1px solid #444;
          transition: background 0.3s;
        }
        
        .notification:hover {
          background: #333;
        }
        
        .notification-title {
          font-weight: bold;
          margin-bottom: 5px;
          color: #ff00ff;
        }
        
        .notification-message {
          font-size: 0.9rem;
          color: #ccc;
        }
        
        .notification-time {
          font-size: 0.7rem;
          color: #666;
          text-align: right;
          margin-top: 5px;
        }
        
        .empty {
          padding: 20px;
          text-align: center;
          color: #666;
        }
      </style>
      
      <div class="bell" id="bell">
        <i data-feather="bell"></i>
        ${this.notifications.length > 0 ? `<span class="badge">${this.notifications.length}</span>` : ''}
      </div>
      
      <div class="dropdown" id="dropdown">
        ${this.notifications.length > 0 ? 
          this.notifications.map(notif => `
            <div class="notification">
              <div class="notification-title">${notif.title}</div>
              <div class="notification-message">${notif.message}</div>
              <div class="notification-time">${notif.time}</div>
            </div>
          `).join('') : 
          `<div class="empty">No new notifications</div>`}
      </div>
    `;
    
    feather.replace();
  }

  initEventListeners() {
    this.shadowRoot.getElementById('bell').addEventListener('click', () => {
      this.toggleDropdown();
    });
    
    document.addEventListener('click', (e) => {
      if (!this.contains(e.target)) {
        this.closeDropdown();
      }
    });
  }

  toggleDropdown() {
    const dropdown = this.shadowRoot.getElementById('dropdown');
    dropdown.classList.toggle('open');
  }

  closeDropdown() {
    const dropdown = this.shadowRoot.getElementById('dropdown');
    dropdown.classList.remove('open');
  }

  checkForNotifications() {
    // Simulate getting notifications
    setTimeout(() => {
      this.addNotification({
        title: 'New Match!',
        message: 'Candy 🍑 is available now',
        time: '2 mins ago'
      });
    }, 3000);
    
    setTimeout(() => {
      this.addNotification({
        title: 'Special Offer',
        message: '50% off first order - code: PIMPMEUP',
        time: '15 mins ago'
      });
    }, 8000);
  }

  addNotification(notification) {
    this.notifications.unshift(notification);
    this.render();
    this.showNotificationToast(notification);
  }

  showNotificationToast(notification) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 transform translate-x-full opacity-0';
    toast.innerHTML = `
      <div class="font-bold">${notification.title}</div>
      <div>${notification.message}</div>
    `;
    
    document.body.appendChild(toast);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(0)';
      toast.style.opacity = '1';
    }, 10);
    
    setTimeout(() => {
      toast.style.transform = 'translateX(100%)';
      toast.style.opacity = '0';
      
      setTimeout(() => {
        toast.remove();
      }, 500);
    }, 3000);
  }
}

customElements.define('notification-bell', NotificationBell);