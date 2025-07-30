 // ========================
        // HEADER SCROLL EFFECT
        // ========================
        window.addEventListener('scroll', () => {
            const header = document.getElementById('header');
            if (window.scrollY > 100) {
                header.classList.add('scrolled');
            } else {
                header.classList.remove('scrolled');
            }
        });

        // ========================
        // SMOOTH SCROLLING FOR NAVIGATION
        // ========================
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            });
        });

        // ========================
        // BEFORE & AFTER SLIDER
        // ========================
        const slider = document.getElementById('comparisonSlider');
        const afterImage = document.getElementById('afterImage');
        const handle = document.getElementById('sliderHandle');
        
        let isDragging = false;

        // Handle mouse events
        handle.addEventListener('mousedown', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('mousemove', (e) => {
            if (!isDragging) return;
            
            const rect = slider.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            updateSlider(percentage);
        });

        document.addEventListener('mouseup', () => {
            isDragging = false;
        });

        // Handle touch events for mobile
        handle.addEventListener('touchstart', (e) => {
            isDragging = true;
            e.preventDefault();
        });

        document.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            
            const touch = e.touches[0];
            const rect = slider.getBoundingClientRect();
            const x = touch.clientX - rect.left;
            const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
            
            updateSlider(percentage);
        });

        document.addEventListener('touchend', () => {
            isDragging = false;
        });

        // Update slider function
        // Updates the position of slider handle and clip-path
        // Adjusts the reveal area of the after image
        function updateSlider(percentage) {
            handle.style.left = percentage + '%';
            afterImage.style.clipPath = `polygon(${percentage}% 0%, 100% 0%, 100% 100%, ${percentage}% 100%)`;
        }

        // ========================
        // INTERSECTION OBSERVER FOR ANIMATIONS
        // ========================
        const observerOptions = {
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        };

        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, observerOptions);

        // Observe all fade-in elements
        document.querySelectorAll('.fade-in').forEach(el => {
            observer.observe(el);
        });

        // ========================
        // TIMELINE ANIMATION
        // ========================
        const timelineObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('visible');
                }
            });
        }, {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        });

        document.querySelectorAll('.timeline-item').forEach(item => {
            timelineObserver.observe(item);
        });

        // ========================
        // MOBILE NAVIGATION TOGGLE
        // ========================
        const navToggle = document.querySelector('.nav-toggle');
        const navMenu = document.querySelector('.nav-menu');

        navToggle.addEventListener('click', () => {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });

        // ========================
        // SERVICE CARD HOVER EFFECTS
        // ========================
        document.querySelectorAll('.service-card').forEach(card => {
            card.addEventListener('mouseenter', function() {
                this.style.transform = 'translateY(-10px) scale(1.02)';
            });
            
            card.addEventListener('mouseleave', function() {
                this.style.transform = 'translateY(0) scale(1)';
            });
        });

        // ========================
        // GALLERY LIGHTBOX EFFECT
        // ========================
        document.querySelectorAll('.gallery-item').forEach(item => {
            item.addEventListener('click', function() {
                const img = this.querySelector('img');
                const overlay = this.querySelector('.gallery-overlay');
                
                // Simple zoom effect on click
                this.style.transform = 'scale(1.1)';
                
                setTimeout(() => {
                    this.style.transform = 'scale(1)';
                }, 300);
            });
        });

        // ========================
        // SCROLL TO TOP FUNCTIONALITY
        // ========================
        const scrollToTop = () => {
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        };

        // Show scroll to top button when user scrolls down
        window.addEventListener('scroll', () => {
            const scrollTop = document.createElement('div');
            if (window.scrollY > 500 && !document.querySelector('.scroll-top-btn')) {
                scrollTop.className = 'scroll-top-btn';
                scrollTop.innerHTML = '<i class="fas fa-chevron-up"></i>';
                scrollTop.style.cssText = `
                    position: fixed;
                    bottom: 2rem;
                    right: 2rem;
                    width: 50px;
                    height: 50px;
                    background: var(--gradient-primary);
                    border-radius: 50%;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    cursor: pointer;
                    box-shadow: var(--shadow-soft);
                    z-index: 1000;
                    transition: all 0.3s ease;
                `;
                
                scrollTop.addEventListener('click', scrollToTop);
                document.body.appendChild(scrollTop);
            } else if (window.scrollY <= 500 && document.querySelector('.scroll-top-btn')) {
                document.querySelector('.scroll-top-btn').remove();
            }
        });

        // ========================
        // INITIALIZE ON PAGE LOAD
        // ========================
        document.addEventListener('DOMContentLoaded', () => {
            // Add initial animations
            setTimeout(() => {
                document.querySelector('.hero-content').style.opacity = '1';
                document.querySelector('.hero-content').style.transform = 'translateY(0)';
            }, 300);

            // Initialize comparison slider at center
            updateSlider(50);
        });

        // ========================
        // PERFORMANCE OPTIMIZATION
        // ========================
        // Throttle scroll events for better performance
        let ticking = false;
        
        const throttledScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    // Scroll-based animations go here
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledScroll);




 // Page Navigation Functions
function goToPage(pageName) {

    const path = `./ass/pages/Our_Services/${pageName}`;
    window.location.href = path;

    // console.log('Navigating to:', pageName);
    // alert(`Would navigate to ${pageName} page`);
}


 // Page Navigation Functions
 function goToPageN(pageName) {

    const path = `${pageName}`;
    window.location.href = path;

    // console.log('Navigating to:', pageName);
    // alert(`Would navigate to ${pageName} page`);
}