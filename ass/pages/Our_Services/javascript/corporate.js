 // Header scroll effect
 window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Back to top button
const backToTop = document.getElementById('backToTop');
window.addEventListener('scroll', function() {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', function(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Smooth scrolling for navigation links
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

// Fade in animation on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, observerOptions);

document.querySelectorAll('.fade-in').forEach(el => {
    observer.observe(el);
});

// Counter animation
function animateCounters() {
    const counters = document.querySelectorAll('.metric-number');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                counter.textContent = target + (target === 98 ? '%' : target === 5 ? '+' : target === 150 ? '+' : '');
                clearInterval(timer);
            } else {
                counter.textContent = Math.floor(current) + (target === 98 ? '%' : target === 5 ? '+' : target === 150 ? '+' : '');
            }
        }, 20);
    });
}

// Trigger counter animation when metrics section is visible
const metricsObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            metricsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

const metricsSection = document.querySelector('.metrics');
if (metricsSection) {
    metricsObserver.observe(metricsSection);
}

// FAQ accordion
document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const faqItem = this.parentElement;
        const answer = this.nextElementSibling;
        const isActive = faqItem.classList.contains('active');

        // Close all FAQ items
        document.querySelectorAll('.faq-item').forEach(item => {
            item.classList.remove('active');
            item.querySelector('.faq-answer').classList.remove('active');
        });

        // Open clicked item if it wasn't active
        if (!isActive) {
            faqItem.classList.add('active');
            answer.classList.add('active');
        }
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Portfolio item interactions
document.querySelectorAll('.portfolio-item').forEach(item => {
    item.addEventListener('click', function() {
        // Here you could add modal functionality or redirect to detailed case study
        console.log('Portfolio item clicked:', this.querySelector('h3').textContent);
    });
});

// Form validation and submission (if forms are added later)
function validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
}

// Add loading states for CTA buttons
document.querySelectorAll('.cta-button').forEach(button => {
    button.addEventListener('click', function(e) {
        if (this.getAttribute('href') === '#contact' || this.getAttribute('href') === '#') {
            e.preventDefault();
            
            // Add loading state
            const originalText = this.textContent;
            this.textContent = 'Processing...';
            this.style.opacity = '0.7';
            this.style.pointerEvents = 'none';
            
            // Simulate form processing
            setTimeout(() => {
                this.textContent = originalText;
                this.style.opacity = '1';
                this.style.pointerEvents = 'auto';
                
                // Here you would typically redirect to a contact form or show a modal
                alert('Thank you for your interest! We\'ll contact you within 24 hours to discuss your event needs.');
            }, 2000);
        }
    });
});

// Add particle effect to hero section (optional enhancement)
function createParticles() {
    const hero = document.querySelector('.hero');
    const particlesCount = 50;
    
    for (let i = 0; i < particlesCount; i++) {
        const particle = document.createElement('div');
        particle.style.position = 'absolute';
        particle.style.width = '2px';
        particle.style.height = '2px';
        particle.style.background = 'rgba(212, 175, 55, 0.5)';
        particle.style.borderRadius = '50%';
        particle.style.left = Math.random() * 100 + '%';
        particle.style.top = Math.random() * 100 + '%';
        particle.style.animation = `float ${3 + Math.random() * 4}s ease-in-out infinite`;
        particle.style.animationDelay = Math.random() * 2 + 's';
        hero.appendChild(particle);
    }
}

// Add floating animation keyframes
const style = document.createElement('style');
style.textContent = `
    @keyframes float {
        0%, 100% { transform: translateY(0px) translateX(0px); opacity: 0; }
        50% { transform: translateY(-20px) translateX(10px); opacity: 1; }
    }
`;
document.head.appendChild(style);

// Initialize particles on load
window.addEventListener('load', createParticles);

// Add intersection observer for staggered animations
const staggerObserver = new IntersectionObserver(function(entries) {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('visible');
            }, index * 100);
        }
    });
}, observerOptions);

// Apply staggered animation to service cards
document.querySelectorAll('.service-card').forEach(card => {
    staggerObserver.observe(card);
});

// Apply staggered animation to timeline steps
document.querySelectorAll('.timeline-step').forEach(step => {
    staggerObserver.observe(step);
});

console.log('LUX Corporate Events - Landing page loaded successfully');