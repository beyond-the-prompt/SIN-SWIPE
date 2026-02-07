class CustomFooter extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    display: block;
                    background: linear-gradient(90deg, #000000, #1f0033, #000000);
                    color: #666;
                    padding: 2rem 1rem;
                    text-align: center;
                    border-top: 2px solid #ff00ff;
                }
                
                .footer-content {
                    max-width: 1200px;
                    margin: 0 auto;
                }
                
                .footer-links {
                    display: flex;
                    justify-content: center;
                    gap: 2rem;
                    margin-bottom: 1.5rem;
                    flex-wrap: wrap;
                }
                
                .footer-link {
                    color: #ff00ff;
                    text-decoration: none;
                    transition: color 0.3s;
                }
                
                .footer-link:hover {
                    color: #0f0;
                }
                
                .social-links {
                    display: flex;
                    justify-content: center;
                    gap: 1.5rem;
                    margin-bottom: 1.5rem;
                }
                
                .social-link {
                    color: white;
                    transition: color 0.3s;
                }
                
                .social-link:hover {
                    color: #ff00ff;
                }
                
                .disclaimer {
                    font-size: 0.8rem;
                    max-width: 800px;
                    margin: 0 auto;
                    line-height: 1.5;
                }
                
                .tagline {
                    color: #ff00ff;
                    font-size: 1.2rem;
                    margin-top: 1rem;
                }
            </style>
            
            <div class="footer-content">
                <div class="footer-links">
                    <a href="index.html" class="footer-link">Home</a>
                    <a href="index.html#services" class="footer-link">Services</a>
                    <a href="index.html#vip" class="footer-link">VIP</a>
                    <a href="index.html#testimonials" class="footer-link">Hoe Views</a>
                    <a href="index.html#zones" class="footer-link">Zones</a>
                    <a href="#" class="footer-link">Privacy Policy</a>
                    <a href="#" class="footer-link">Terms of Service</a>
                </div>
<div class="social-links">
                    <a href="#" class="social-link"><i data-feather="instagram"></i></a>
                    <a href="#" class="social-link"><i data-feather="twitter"></i></a>
                    <a href="#" class="social-link"><i data-feather="facebook"></i></a>
                    <a href="#" class="social-link"><i data-feather="youtube"></i></a>
                </div>
                
                <p class="disclaimer">
                    © 2025 WhoreDash • This is a parody app for entertainment purposes only • Not a real service • 
                    No actual services are being offered • Don't try this at home • Seriously, this is just a joke • 
                    But if it was real, we'd be amazing at it
                </p>
                
                <p class="tagline">
                    "DoorDash x Tinder x OnlyFans: Swipe for your sins"
                </p>
            </div>
        `;

        // Replace icons
        const featherScript = document.createElement('script');
        featherScript.src = 'https://cdn.jsdelivr.net/npm/feather-icons/dist/feather.min.js';
        this.shadowRoot.appendChild(featherScript);
        
        featherScript.onload = () => {
            feather.replace();
        };
    }
}

customElements.define('custom-footer', CustomFooter);