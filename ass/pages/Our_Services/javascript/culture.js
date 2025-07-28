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

// Timeline animation on scroll
const timelineItems = document.querySelectorAll('.timeline-item');
const observerOptions = {
    threshold: 0.3,
    rootMargin: '0px 0px -50px 0px'
};

const timelineObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

timelineItems.forEach(item => {
    timelineObserver.observe(item);
});

// FAQ Accordion functionality
const faqItems = document.querySelectorAll('.faq-item');
faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const icon = question.querySelector('i');
    
    question.addEventListener('click', () => {
        const isActive = item.classList.contains('active');
        
        // Close all FAQ items
        faqItems.forEach(faqItem => {
            faqItem.classList.remove('active');
            const faqIcon = faqItem.querySelector('.faq-question i');
            faqIcon.classList.remove('fa-minus');
            faqIcon.classList.add('fa-plus');
        });
        
        // Open clicked item if it wasn't active
        if (!isActive) {
            item.classList.add('active');
            icon.classList.remove('fa-plus');
            icon.classList.add('fa-minus');
        }
    });
});




const playBtn = document.querySelector('.play-btn');
const videoPlaceholder = document.querySelector('.video-placeholder');

playBtn.addEventListener('click', () => {
    playBtn.style.transform = 'scale(0.8)';
    setTimeout(() => {
        playBtn.style.transform = 'scale(1)';
        videoPlaceholder.innerHTML = `
            <iframe width="100%" height="400"
                src="https://www.youtube.com/embed/F-Cax4TJoBE?si=29JzJDJDi5fPeLvI"
                title="YouTube video" frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen></iframe>
        `;
    }, 150);
});







// // Video play button functionality
// const playBtn = document.querySelector('.play-btn');
// const videoPlaceholder = document.querySelector('.video-placeholder');

// playBtn.addEventListener('click', () => {
//     // Create a simple animation effect
//     playBtn.style.transform = 'scale(0.8)';
//     setTimeout(() => {
//         playBtn.style.transform = 'scale(1)';
//         // In a real implementation, this would start video playback
//         alert('Video would play here. This is a demonstration of the interactive element.');
//     }, 150);
// });

// Event cards hover effect enhancement
const eventCards = document.querySelectorAll('.event-card');
eventCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
        const icon = card.querySelector('.event-icon');
        icon.style.transform = 'scale(1.2) rotate(5deg)';
        icon.style.transition = 'all 0.3s ease';
    });
    
    card.addEventListener('mouseleave', () => {
        const icon = card.querySelector('.event-icon');
        icon.style.transform = 'scale(1) rotate(0deg)';
    });
});

// Gallery lightbox effect
const galleryItems = document.querySelectorAll('.gallery-item');
galleryItems.forEach(item => {
    item.addEventListener('click', () => {
        const title = item.querySelector('h3').textContent;
        const subtitle = item.querySelector('p').textContent;
        
        // Simple lightbox simulation
        const lightbox = document.createElement('div');
        lightbox.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(0,0,0,0.9);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 1000;
            color: white;
            text-align: center;
            cursor: pointer;
        `;
        
        lightbox.innerHTML = `
            <div>
                <h2 style="margin-bottom: 1rem; font-family: 'Playfair Display', serif;">${title}</h2>
                <p style="font-size: 1.2rem; margin-bottom: 2rem;">${subtitle}</p>
                <div style="width: 400px; height: 300px; background: linear-gradient(45deg, #d4af37, #f4a300); border-radius: 16px; display: flex; align-items: center; justify-content: center; font-size: 1.5rem;">
                    Gallery Image Placeholder
                </div>
                <p style="margin-top: 2rem; opacity: 0.7;">Click to close</p>
            </div>
        `;
        
        lightbox.addEventListener('click', () => {
            document.body.removeChild(lightbox);
        });
        
        document.body.appendChild(lightbox);
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
});

// Add floating animation to feature icons with staggered timing
const featureIcons = document.querySelectorAll('.feature-icon');
featureIcons.forEach((icon, index) => {
    icon.style.animationDelay = `${index * 0.2}s`;
});

// Testimonial slider functionality (simple version)
const testimonials = [
    {
        text: "The team created such a beautiful and spiritual atmosphere for our daughter's naming ceremony. Every detail was perfect and the pandit was so knowledgeable. Our family felt truly blessed.",
        author: "Priya & Raj Sharma",
        event: "Naamkaran Ceremony"
    },
    {
        text: "Our wedding ceremony was absolutely divine. The mandap decoration was breathtaking and the coordination was flawless. Thank you for making our special day so memorable.",
        author: "Anita & Vikram Patel",
        event: "Traditional Wedding"
    },
    {
        text: "The Diwali celebration organized by the team brought our entire community together. The arrangements were authentic and the spiritual energy was incredible.",
        author: "Meera Agarwal",
        event: "Diwali Festival"
    }
];

let currentTestimonial = 0;
const testimonialElement = document.querySelector('.testimonial');

function updateTestimonial() {
    const current = testimonials[currentTestimonial];
    testimonialElement.innerHTML = `
        <p>${current.text}</p>
        <div class="testimonial-author">- ${current.author}<br><small>${current.event}</small></div>
    `;
    currentTestimonial = (currentTestimonial + 1) % testimonials.length;
}

// Auto-rotate testimonials every 5 seconds
setInterval(updateTestimonial, 5000);

// Add entrance animations for sections
const sections = document.querySelectorAll('.section');
const sectionObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(30px)';
    section.style.transition = 'all 0.8s ease';
    sectionObserver.observe(section);
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.cta-btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.cssText = `
            position: absolute;
            width: ${size}px;
            height: ${size}px;
            left: ${x}px;
            top: ${y}px;
            background: rgba(255,255,255,0.3);
            border-radius: 50%;
            transform: scale(0);
            animation: ripple 0.6s linear;
            pointer-events: none;
        `;
        
        this.style.position = 'relative';
        this.style.overflow = 'hidden';
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple animation to CSS
const style = document.createElement('style');
style.textContent = `
    @keyframes ripple {
        to {
            transform: scale(2);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// Mobile menu handling (if needed)
function handleMobileView() {
    const isMobile = window.innerWidth <= 768;
    
    if (isMobile) {
        // Adjust animations for mobile
        const heroContent = document.querySelector('.hero-content');
        if (heroContent) {
            heroContent.style.padding = '1rem';
        }
        
        // Disable parallax on mobile for performance
        window.removeEventListener('scroll', () => {});
    }
}

window.addEventListener('resize', handleMobileView);
handleMobileView(); // Call on initial load

// Add loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Contact form handling (if contact section is added)
function handleContactForm() {
    // This would handle form submissions in a real implementation
    console.log('Contact form functionality ready');
}

// Initialize all functionality
document.addEventListener('DOMContentLoaded', () => {
    handleContactForm();
    console.log('Sacred Celebrations website loaded successfully!');
});





// 00000000000000000000000000000000000000000

