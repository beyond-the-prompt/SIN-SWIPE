class SensoryFeedback extends HTMLElement {
    connectedCallback() {
        this.attachShadow({ mode: 'open' });
        this.shadowRoot.innerHTML = `
            <style>
                :host {
                    position: fixed;
                    pointer-events: none;
                    z-index: 9999;
                }
                
                .ripple {
                    position: absolute;
                    border-radius: 50%;
                    background: radial-gradient(circle, rgba(255,0,255,0.5), transparent 70%);
                    transform: translate(-50%, -50%);
                    animation: ripple 1s ease-out;
                }
                
                @keyframes ripple {
                    0% { transform: translate(-50%, -50%) scale(0); opacity: 1; }
                    100% { transform: translate(-50%, -50%) scale(3); opacity: 0; }
                }
            </style>
        `;
        
        document.addEventListener('click', (e) => {
            if (e.target.closest('a, button, [role="button"]')) {
                this.createRipple(e.clientX, e.clientY);
            }
        });
    }
    
    createRipple(x, y) {
        const ripple = document.createElement('div');
        ripple.className = 'ripple';
        
        Object.assign(ripple.style, {
            left: `${x}px`,
            top: `${y}px`,
            width: '100px',
            height: '100px'
        });
        
        this.shadowRoot.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 1000);
    }
}

customElements.define('sensory-feedback', SensoryFeedback);