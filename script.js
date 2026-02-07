
// Notification system
class Notifications {
  constructor() {
    this.notifications = [];
    this.bell = null;
  }

  init() {
    this.bell = document.querySelector('notification-bell');
    this.setupNotificationTriggers();
  }

  setupNotificationTriggers() {
    // Example triggers
    setInterval(() => {
      const promotions = [
        "Flash sale! 30% off for next hour - code: FLASH30",
        "New service available: Couples Therapy 😉",
        "Weekend special: Buy 2, get 1 free",
        "VIP members get free delivery today"
      ];
      this.showNotification({
        title: "Special Offer",
        message: promotions[Math.floor(Math.random() * promotions.length)]
      });
    }, 180000); // Every 3 minutes
  }

  showNotification(notification) {
    if (this.bell) {
      this.bell.addNotification(notification);
    } else {
      console.warn("Notification bell not found");
    }
  }
}

const notifications = new Notifications();

// Initialize cart
let cart = [];

// Function to add item to cart
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCartUI();
    
    // Show notification
    const notification = document.createElement('div');
    notification.className = 'fixed top-4 right-4 bg-pink-600 text-white px-4 py-2 rounded-lg shadow-lg';
    notification.textContent = `Added ${itemName} to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.remove();
    }, 2000);
}

// Update cart UI
function updateCartUI() {
    const cartCount = document.getElementById('cart-count');
    const cartTotal = document.getElementById('cart-total');
    
    if (cartCount && cartTotal) {
        cartCount.textContent = cart.length;
        const total = cart.reduce((sum, item) => sum + item.price, 0);
        cartTotal.textContent = total.toFixed(2);
    }
}

// Mobile menu toggle (for navbar component)
function toggleMobileMenu() {
    const menu = document.getElementById('mobile-menu');
    if (menu) {
        menu.classList.toggle('hidden');
    }
}

// Initialize swipe functionality for cards
function initSwipeCards() {
    const cards = document.querySelectorAll('.swipe-card');
    
    cards.forEach(card => {
        let startX, moveX;
        
        card.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
        });
        
        card.addEventListener('touchmove', (e) => {
            moveX = e.touches[0].clientX - startX;
            card.style.transform = `translateX(${moveX}px) rotate(${moveX / 10}deg)`;
            
            const like = card.querySelector('.swipe-like');
            const nope = card.querySelector('.swipe-nope');
            
            if (moveX > 0) {
                like.style.opacity = Math.min(moveX / 100, 1);
                nope.style.opacity = 0;
            } else {
                nope.style.opacity = Math.min(-moveX / 100, 1);
                like.style.opacity = 0;
            }
        });
        
        card.addEventListener('touchend', () => {
            if (Math.abs(moveX) > 100) {
                card.style.transition = 'transform 0.5s, opacity 0.5s';
                card.style.transform = `translateX(${moveX > 0 ? '100%' : '-100%'}) rotate(${moveX > 0 ? 20 : -20}deg)`;
                card.style.opacity = 0;
                
                setTimeout(() => {
                    card.remove();
                    if (moveX > 0) {
                        // Swiped right - add to cart
                        const price = parseFloat(card.dataset.price);
                        addToCart(card.dataset.name, price);
                    }
                }, 500);
            } else {
                card.style.transform = 'translateX(0) rotate(0deg)';
                card.querySelector('.swipe-like').style.opacity = 0;
                card.querySelector('.swipe-nope').style.opacity = 0;
            }
        });
    });
}
// Tab switching functionality
function initTabs() {
  const tabBtns = document.querySelectorAll('.tab-btn');
  const tabPanes = document.querySelectorAll('.tab-pane');

  tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      // Remove active class from all buttons and panes
      tabBtns.forEach(b => b.classList.remove('active'));
      tabPanes.forEach(p => p.classList.remove('active'));
      
      // Add active class to clicked button and corresponding pane
      btn.classList.add('active');
      const tabId = btn.dataset.tab;
      document.getElementById(`${tabId}-tab`).classList.add('active');
      
      // Play sound effect
      playSoundEffect('click');
    });
  });
}
// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  notifications.init();
  initTabs();
  
  // Listen for whoredasher selection
  document.addEventListener('whoredasher-selected', (e) => {
    const { name, price } = e.detail;
    showToastNotification(`Selected ${name} for ${price}`);
    addToCart(name, parseFloat(price.replace(/\D/g, '')) / 100);
    
    // Show tracking map
    const trackingMap = document.createElement('tracking-map');
    trackingMap.setAttribute('price', price);
    document.body.appendChild(trackingMap);
    
    trackingMap.addEventListener('delivery-arrived', () => {
      const chatWindow = document.createElement('chat-window');
      chatWindow.setAttribute('name', name);
      document.body.appendChild(chatWindow);
    });
  });
initParticles();
    initSensoryFeedback();
    initDeliveryCards();
    initVideoPreviews();
    initConfetti();
// Add event listeners to category buttons
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            const category = btn.dataset.category;
            createRippleEffect(e);
            showCategoryMedia(category);
        });
    });
    
    // Initialize media share button
    const mediaBtn = document.getElementById('media-share-btn');
    if (mediaBtn) {
        mediaBtn.addEventListener('click', (e) => {
            const sharer = document.createElement('media-sharer');
            sharer.addEventListener('media-selected', (event) => {
                showToastNotification(`Media shared: ${event.detail.type}`);
                // In a real app, this would send the media to chat
            });
            document.body.appendChild(sharer);
        });
    }
});

function showCategoryMedia(category) {
    const themes = {
        liquor: ['black', 'vintage', 'food', 'restaurant'],
        weed: ['green', 'nature', 'science', 'medical'],
        toys: ['technology', 'retail', 'black', 'indoor'],
        massages: ['wellness', 'people', 'cosmetic', 'indoor']
    };
    
    const overlay = document.createElement('div');
    overlay.className = 'fixed inset-0 bg-black bg-opacity-80 z-50 flex items-center justify-center';
    
    const mediaContainer = document.createElement('div');
    mediaContainer.className = 'grid grid-cols-2 md:grid-cols-3 gap-4 p-4 max-w-4xl';
    
    // Add 6 random media items
    for (let i = 0; i < 6; i++) {
        const theme = themes[category]?.[Math.floor(Math.random() * themes[category]?.length)] || 'black';
        const mediaItem = document.createElement('div');
        mediaItem.className = 'bg-gray-800 rounded-xl overflow-hidden cursor-pointer transform hover:scale-105 transition-all';
        
        const img = document.createElement('img');
        img.src = `http://static.photos/${theme}/640x360/${Math.floor(Math.random() * 1000)}`;
        img.className = 'w-full h-full object-cover';
        
        mediaItem.appendChild(img);
        mediaContainer.appendChild(mediaItem);
    }
    
    const closeBtn = document.createElement('button');
    closeBtn.className = 'absolute top-4 right-4 bg-pink-600 text-white p-2 rounded-full';
    closeBtn.innerHTML = '<i data-feather="x"></i>';
    closeBtn.onclick = () => overlay.remove();
    
    overlay.appendChild(mediaContainer);
    overlay.appendChild(closeBtn);
    document.body.appendChild(overlay);
    feather.replace();
}
// Initialize delivery cards functionality
function initDeliveryCards() {
  const deliveryContainer = document.createElement('div');
  deliveryContainer.id = 'delivery-container';
  deliveryContainer.style.position = 'relative';
  deliveryContainer.style.minHeight = '500px';
  document.querySelector('main').appendChild(deliveryContainer);
  
  // Listen for order events from carousels
  document.addEventListener('order-item', (e) => {
    const { item, category } = e.detail;
    addToCart(item.name, item.price);
    
    // Show tracking map
    const trackingMap = document.createElement('tracking-map');
    trackingMap.setAttribute('price', item.price);
    document.body.appendChild(trackingMap);
    
    trackingMap.addEventListener('delivery-arrived', () => {
      showToastNotification(`${item.name} has arrived! Enjoy your ${category} 😈`);
    });
  });
  
  // Load initial cards
  loadMoreCards();
// Listen for swipe events
    document.addEventListener('swipe-right', (e) => {
        addToCart(e.detail.name, e.detail.price);
        
        // Show tracking map
        const trackingMap = document.createElement('tracking-map');
        trackingMap.setAttribute('price', `${e.detail.price}`);
        document.body.appendChild(trackingMap);
        
        trackingMap.addEventListener('delivery-arrived', () => {
            showToastNotification(`${e.detail.name} has arrived! Get ready for sin 😈`);
            
            // Open chat automatically
            const chatWindow = document.createElement('chat-window');
            chatWindow.setAttribute('name', e.detail.name);
            document.body.appendChild(chatWindow);
        });
        
        // Load more cards
        setTimeout(loadMoreCards, 1000);
    });
    
    // Listen for chat events
    document.addEventListener('start-chat', (e) => {
        const chatWindow = document.createElement('chat-window');
        chatWindow.setAttribute('name', e.detail.name);
        document.body.appendChild(chatWindow);
    });
}
function loadMoreCards() {
  const container = document.getElementById('delivery-container');
  if (!container) return;
  
  // Clear existing cards
  container.innerHTML = '';
  
  // Add 3 new cards with optimized loading
  requestAnimationFrame(() => {
    for (let i = 0; i < 3; i++) {
      const card = document.createElement('delivery-card');
      container.appendChild(card);
      
      // Lazy load images when card is visible
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const img = entry.target.shadowRoot.querySelector('.card-image');
            if (img && img.dataset.src) {
              img.src = img.dataset.src;
              img.removeAttribute('data-src');
            }
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.1 });
      
      observer.observe(card);
    }
  });
}
// Create particle background
function initParticles() {
    const container = document.createElement('div');
    container.className = 'particles';
    document.body.appendChild(container);
    
    for (let i = 0; i < 50; i++) {
        const particle = document.createElement('div');
        particle.className = 'particle';
        
        // Random properties
        const size = Math.random() * 5 + 1;
        const posX = Math.random() * 100;
        const posY = Math.random() * 100;
        const delay = Math.random() * 10;
        const duration = Math.random() * 10 + 10;
        
        Object.assign(particle.style, {
            width: `${size}px`,
            height: `${size}px`,
            left: `${posX}%`,
            top: `${posY}%`,
            opacity: Math.random() * 0.5,
            animation: `float ${duration}s ease-in-out ${delay}s infinite`
        });
        
        container.appendChild(particle);
    }
}

// Create ripple effect on interactions
function initSensoryFeedback() {
    document.body.addEventListener('click', (e) => {
        if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON') {
            createRippleEffect(e);
        }
    });
}

function createRippleEffect(e) {
    const feedback = document.createElement('div');
    feedback.className = 'sensory-feedback';
    
    Object.assign(feedback.style, {
        left: `${e.clientX}px`,
        top: `${e.clientY}px`,
        width: '100px',
        height: '100px'
    });
    
    document.body.appendChild(feedback);
    
    setTimeout(() => {
        feedback.remove();
    }, 1000);
}

// Enhanced toast notification
function showToastNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'fixed top-4 right-4 bg-gradient-to-r from-pink-600 to-purple-600 text-white px-6 py-3 rounded-lg shadow-xl z-50 transform translate-x-full opacity-0';
    toast.textContent = message;
    
    const icon = document.createElement('i');
    icon.setAttribute('data-feather', 'check-circle');
    icon.className = 'inline mr-2';
    toast.prepend(icon);
    
    document.body.appendChild(toast);
    feather.replace();
    
    // Animate in
    setTimeout(() => {
        toast.style.transform = 'translateX(0)';
        toast.style.opacity = '1';
    }, 10);
    
    // Animate out after delay
    setTimeout(() => {
        toast.style.transform = 'translateX(100%)';
        toast.style.opacity = '0';
        
        setTimeout(() => {
            toast.remove();
        }, 500);
    }, 3000);
}
// Initialize video previews on hover
function initVideoPreviews() {
    document.querySelectorAll('.category-btn').forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            const video = document.createElement('video');
            video.src = `https://huggingface.co/spaces/Bearcare/whoredash-sinful-swipe-delivery/resolve/main/videos/${Math.random() > 0.5 ? 'Jji7n3WtYeHD5ehx2Fzl.mp4' : 'N983XaMVfyzflBOVJ4jk.mp4'}`;
            video.autoplay = true;
            video.loop = true;
            video.muted = true;
            video.playsInline = true;
            video.className = 'absolute inset-0 w-full h-full object-cover opacity-0 group-hover:opacity-100 transition-opacity';
            
            const container = btn.querySelector('.video-container') || btn.appendChild(document.createElement('div'));
            container.className = 'video-container absolute inset-0 overflow-hidden';
            container.appendChild(video);
            
            setTimeout(() => {
                video.style.opacity = '1';
            }, 50);
        });
    });
}

// Enhanced confetti effects
function initConfetti() {
    const cartButton = document.getElementById('cart-button');
    if (cartButton) {
        cartButton.addEventListener('click', () => {
            confetti({
                particleCount: 150,
                spread: 70,
                origin: { y: 0.6 },
                colors: ['#ff00ff', '#0f0', '#fff'],
                shapes: ['circle', 'square'],
                scalar: 1.2
            });
        });
    }
}

// Add sound effects to interactions
function playSoundEffect(type) {
    const sounds = {
        click: 'https://assets.mixkit.co/sfx/preview/mixkit-select-click-1109.mp3',
        success: 'https://assets.mixkit.co/sfx/preview/mixkit-achievement-bell-600.mp3',
        error: 'https://assets.mixkit.co/sfx/preview/mixkit-warning-alarm-688.mp3'
    };
    
    if (sounds[type]) {
        const audio = new Audio(sounds[type]);
        audio.volume = 0.3;
        audio.play();
    }
}

// Update existing addToCart function to include sensory feedback
function addToCart(itemName, itemPrice) {
    cart.push({ name: itemName, price: itemPrice });
    updateCartUI();
    
    // Show enhanced notification
    showToastNotification(`Added ${itemName} to cart!`);
    playSoundEffect('success');
    
    // Add confetti effect
    if (typeof confetti === 'function') {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
            colors: ['#ff00ff', '#0f0', '#fff']
        });
    }
}
