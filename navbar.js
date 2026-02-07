class CustomNavbar extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    position: fixed;
                    top: 0;
                    left: 0;
                    right: 0;
                    z-index: 1000;
                    background: rgba(0, 0, 0, 0.9);
                    backdrop-filter: blur(10px);
                    border-bottom: 2px solid #ff00ff;
                }
                
                nav {
                    display: flex;
                    justify-content: space-between;
                    align-items: center;
                    padding: 1rem 2rem;
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .logo {
                    font-size: 1.8rem;
                    font-weight: bold;
                    background: linear-gradient(90deg, #ff00ff, #0f0);
                    -webkit-background-clip: text;
                    background-clip: text;
                    color: transparent;
                    text-shadow: 0 0 10px rgba(255, 0, 255, 0.5);
                }
                
                .nav-links {
                    display: flex;
                    gap: 2rem;
                }
                
                .nav-link {
                    color: white;
                    text-decoration: none;
                    font-weight: bold;
                    transition: color 0.3s;
                }
                
                .nav-link:hover {
                    color: #ff00ff;
                }
                
                .mobile-menu-btn {
                    display: none;
                    background: none;
                    border: none;
                    color: white;
                    font-size: 1.5rem;
                    cursor: pointer;
                }
                
                .mobile-menu {
                    display: none;
                    flex-direction: column;
                    gap: 1rem;
                    padding: 1rem;
                    background: rgba(0, 0, 0, 0.95);
                }
                
                @media (max-width: 768px) {
                    .nav-links {
                        display: none;
                    }
                    
                    .mobile-menu-btn {
                        display: block;
                    }
                    
                    .mobile-menu.active {
                        display: flex;
                    }
                }
            </style>
            
            <nav>
                <a href="#" class="logo">WHOREDASH</a>
                <div class="nav-links">
                    <a href="index.html" class="nav-link">Home</a>
                    <a href="index.html#services" class="nav-link">Services</a>
                    <a href="index.html#vip" class="nav-link">VIP</a>
                    <a href="index.html#testimonials" class="nav-link">Hoe Views</a>
                    <a href="index.html#zones" class="nav-link">Zones</a>
                </div>
<button class="mobile-menu-btn" id="mobile-menu-btn">
                    <i data-feather="menu"></i>
                </button>
            </nav>
                <div class="mobile-menu" id="mobile-menu">
                    <a href="index.html" class="nav-link">Home</a>
                    <a href="menu-cannabis.html" class="nav-link">Cannabis</a>
                    <a href="menu-alcohol.html" class="nav-link">Alcohol</a>
                    <a href="menu-sex.html" class="nav-link">Adult Services</a>
                    <a href="index.html#vip" class="nav-link">VIP</a>
                    <a href="index.html#testimonials" class="nav-link">Hoe Views</a>
                    <a href="index.html#zones" class="nav-link">Zones</a>
</div>
`;

        // Initialize mobile menu functionality
        const mobileMenuBtn = this.shadowRoot.getElementById('mobile-menu-btn');
        const mobileMenu = this.shadowRoot.getElementById('mobile-menu');
        
        if (mobileMenuBtn && mobileMenu) {
            mobileMenuBtn.addEventListener('click', () => {
                mobileMenu.classList.toggle('active');
                feather.replace();
            });
        }

        // Replace icons
        const featherScript = document.createElement('script');
        featherScript.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
        this.shadowRoot.appendChild(featherScript);
        
        featherScript.onload = () => {
            feather.replace();
        };
    }
}

customElements.define('custom-navbar', CustomNavbar);