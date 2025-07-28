 // Smooth scrolling for anchor links
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

// FAQ Toggle Function
function toggleFAQ(question) {
    const answer = question.nextElementSibling;
    const icon = question.querySelector('span:last-child');
    
    // Close all other FAQs
    document.querySelectorAll('.faq-answer').forEach(faq => {
        if (faq !== answer) {
            faq.classList.remove('active');
            faq.previousElementSibling.querySelector('span:last-child').textContent = '+';
        }
    });
    
    // Toggle current FAQ
    answer.classList.toggle('active');
    icon.textContent = answer.classList.contains('active') ? '−' : '+';
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.party-card, .process-step, .gallery-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease-out';
    observer.observe(el);
});

// Add loading animation delay for cards
document.querySelectorAll('.party-card').forEach((card, index) => {
    card.style.transitionDelay = `${index * 0.1}s`;
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Gallery item hover effects
document.querySelectorAll('.gallery-item').forEach(item => {
    item.addEventListener('mouseenter', function() {
        this.style.transform = 'scale(1.05) rotate(1deg)';
    });
    
    item.addEventListener('mouseleave', function() {
        this.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Testimonial rotation (simple version)
const testimonials = [
    {
        quote: "Lux Events made my daughter's 5th birthday absolutely magical! Every detail was perfect, from the unicorn decorations to the face painting. The kids had an amazing time!",
        author: "Sarah M. - Princess Unicorn Party"
    },
    {
        quote: "The superhero party was incredible! My son felt like a real hero, and the entertainment kept all 20 kids engaged for hours. Professional and creative service!",
        author: "Mike R. - Superhero Adventure Party"
    },
    {
        quote: "Our 25th birthday celebration was elegant and fun. The team understood exactly what we wanted and delivered beyond expectations. Highly recommended!",
        author: "Priya S. - Milestone Birthday Celebration"
    }
];

let currentTestimonial = 0;
const testimonialElement = document.querySelector('.testimonial');

function rotateTestimonials() {
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
    const testimonial = testimonials[currentTestimonial];
    
    testimonialElement.style.opacity = '0';
    
    setTimeout(() => {
        testimonialElement.querySelector('.testimonial-quote').textContent = `"${testimonial.quote}"`;
        testimonialElement.querySelector('.testimonial-author').textContent = testimonial.author;
        testimonialElement.style.opacity = '1';
    }, 300);
}

// Auto-rotate testimonials every 5 seconds
setInterval(rotateTestimonials, 5000);

// Add sparkle animation to hero
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.innerHTML = '✨';
    sparkle.style.position = 'absolute';
    sparkle.style.fontSize = Math.random() * 20 + 10 + 'px';
    sparkle.style.left = Math.random() * 100 + '%';
    sparkle.style.top = Math.random() * 100 + '%';
    sparkle.style.opacity = '0';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkleFloat 3s ease-out forwards';
    
    document.querySelector('.hero').appendChild(sparkle);
    
    setTimeout(() => {
        sparkle.remove();
    }, 3000);
}

// Add sparkles periodically
setInterval(createSparkle, 2000);

// Add CSS for sparkle animation
const sparkleCSS = `
    @keyframes sparkleFloat {
        0% {
            opacity: 0;
            transform: translateY(0) rotate(0deg);
        }
        50% {
            opacity: 1;
        }
        100% {
            opacity: 0;
            transform: translateY(-100px) rotate(180deg);
        }
    }
`;

const styleSheet = document.createElement('style');
styleSheet.textContent = sparkleCSS;
document.head.appendChild(styleSheet);

// Add floating animation to party cards
document.querySelectorAll('.party-card').forEach((card, index) => {
    card.style.animation = `float 6s ease-in-out infinite ${index * 0.5}s`;
});

// Add float animation CSS
const floatCSS = `
    @keyframes float {
        0%, 100% {
            transform: translateY(0px);
        }
        50% {
            transform: translateY(-10px);
        }
    }
`;

const floatStyleSheet = document.createElement('style');
floatStyleSheet.textContent = floatCSS;
document.head.appendChild(floatStyleSheet);

// Confetti effect for CTA section
function createConfetti() {
    const colors = ['#d4af37', '#ffd6e8', '#cce4ff'];
    const confettiCount = 50;
    
    for (let i = 0; i < confettiCount; i++) {
        const confetti = document.createElement('div');
        confetti.style.position = 'absolute';
        confetti.style.width = Math.random() * 10 + 5 + 'px';
        confetti.style.height = confetti.style.width;
        confetti.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
        confetti.style.left = Math.random() * 100 + '%';
        confetti.style.top = '-10px';
        confetti.style.borderRadius = Math.random() > 0.5 ? '50%' : '0';
        confetti.style.pointerEvents = 'none';
        confetti.style.animation = `confettiFall ${Math.random() * 3 + 2}s linear forwards`;
        
        document.querySelector('.final-cta').appendChild(confetti);
        
        setTimeout(() => {
            confetti.remove();
        }, 5000);
    }
}

// Add confetti animation CSS
const confettiCSS = `
    @keyframes confettiFall {
        to {
            transform: translateY(calc(100vh + 100px)) rotate(720deg);
        }
    }
`;

const confettiStyleSheet = document.createElement('style');
confettiStyleSheet.textContent = confettiCSS;
document.head.appendChild(confettiStyleSheet);

// Trigger confetti when CTA section comes into view
const ctaObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            createConfetti();
        }
    });
}, { threshold: 0.5 });

ctaObserver.observe(document.querySelector('.final-cta'));