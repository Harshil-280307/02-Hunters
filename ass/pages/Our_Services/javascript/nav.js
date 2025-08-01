class ModernNavbar {
    constructor() {
        this.navbar = document.getElementById('navbar');
        this.mobileToggle = document.getElementById('mobileToggle');
        this.navbarMenu = document.getElementById('navbarMenu');
        this.hamburgerLines = document.querySelectorAll('.hamburger-line');
        this.lastScrollTop = 0;
        this.scrollThreshold = 100;
        
        this.init();
    }

    init() {
        this.setupMobileMenu();
        this.setupScrollEffects();
        this.setupSmoothScrolling();
        this.setupHoverEffects();
        this.setupKeyboardNavigation();
    }

    setupMobileMenu() {
        this.mobileToggle.addEventListener('click', (e) => {
            e.preventDefault();
            this.toggleMobileMenu();
        });

        // Close menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!this.navbar.contains(e.target) && 
                this.navbarMenu.classList.contains('mobile-active')) {
                this.closeMobileMenu();
            }
        });

        // Close menu on link click
        document.querySelectorAll('.navbar-link, .navbar-cta').forEach(link => {
            link.addEventListener('click', () => {
                if (window.innerWidth <= 768) {
                    this.closeMobileMenu();
                }
            });
        });

        // Handle resize
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.closeMobileMenu();
            }
        });
    }

    toggleMobileMenu() {
        const isActive = this.navbarMenu.classList.contains('mobile-active');
        
        if (isActive) {
            this.closeMobileMenu();
        } else {
            this.openMobileMenu();
        }
    }

    openMobileMenu() {
        this.navbarMenu.classList.add('mobile-active');
        this.hamburgerLines.forEach(line => line.classList.add('active'));
        document.body.style.overflow = 'hidden';
    }

    closeMobileMenu() {
        this.navbarMenu.classList.remove('mobile-active');
        this.hamburgerLines.forEach(line => line.classList.remove('active'));
        document.body.style.overflow = '';
    }

    setupScrollEffects() {
        let ticking = false;

        const updateNavbar = () => {
            const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
            
            // Add scrolled class
            if (scrollTop > 50) {
                this.navbar.classList.add('scrolled');
            } else {
                this.navbar.classList.remove('scrolled');
            }

            // Hide/show navbar based on scroll direction
            if (scrollTop > this.scrollThreshold) {
                if (scrollTop > this.lastScrollTop && scrollTop > 200) {
                    // Scrolling down
                    this.navbar.classList.add('hidden');
                } else {
                    // Scrolling up
                    this.navbar.classList.remove('hidden');
                }
            }
            
            this.lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
            ticking = false;
        };

        window.addEventListener('scroll', () => {
            if (!ticking) {
                requestAnimationFrame(updateNavbar);
                ticking = true;
            }
        }, { passive: true });
    }

    setupSmoothScrolling() {
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', (e) => {
                e.preventDefault();
                const target = document.querySelector(anchor.getAttribute('href'));
                
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            });
        });
    }

    setupHoverEffects() {
        // Enhanced hover effects for links
        document.querySelectorAll('.navbar-link, .navbar-cta').forEach(element => {
            element.addEventListener('mouseenter', (e) => {
                const rect = e.target.getBoundingClientRect();
                const ripple = document.createElement('div');
                ripple.style.cssText = `
                    position: absolute;
                    border-radius: 50%;
                    background: rgba(139, 69, 19, 0.2);
                    transform: scale(0);
                    animation: ripple 0.6s linear;
                    left: ${e.clientX - rect.left - 10}px;
                    top: ${e.clientY - rect.top - 10}px;
                    width: 20px;
                    height: 20px;
                    pointer-events: none;
                `;
                
                element.style.position = 'relative';
                element.appendChild(ripple);
                
                setTimeout(() => {
                    ripple.remove();
                }, 600);
            });
        });

        // CSS for ripple animation
        const style = document.createElement('style');
        style.textContent = `
            @keyframes ripple {
                to {
                    transform: scale(4);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(style);
    }

    setupKeyboardNavigation() {
        // Enhanced keyboard accessibility
        document.querySelectorAll('.navbar-link, .navbar-cta, .mobile-toggle').forEach(element => {
            element.addEventListener('keydown', (e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    element.click();
                }
            });
        });

        // Focus management
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && this.navbarMenu.classList.contains('mobile-active')) {
                this.closeMobileMenu();
                this.mobileToggle.focus();
            }
        });
    }
}

// Initialize navbar when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new ModernNavbar();
});

// Add floating particles effect
function createFloatingParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    document.body.appendChild(particleContainer);

    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: 4px;
            height: 4px;
            background: rgba(139, 69, 19, 0.1);
            border-radius: 50%;
            animation: float-${i} ${8 + Math.random() * 4}s linear infinite;
            left: ${Math.random() * 100}%;
            animation-delay: ${Math.random() * 8}s;
        `;
        
        const keyframes = `
            @keyframes float-${i} {
                0% {
                    transform: translateY(100vh) rotate(0deg);
                    opacity: 0;
                }
                10% {
                    opacity: 1;
                }
                90% {
                    opacity: 1;
                }
                100% {
                    transform: translateY(-100px) rotate(360deg);
                    opacity: 0;
                }
            }
        `;
        
        const style = document.createElement('style');
        style.textContent = keyframes;
        document.head.appendChild(style);
        
        particleContainer.appendChild(particle);
    }
}

// Initialize particles
setTimeout(createFloatingParticles, 1000);



