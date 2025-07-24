 // Smooth scrolling for CTA button
 document.querySelector('.cta-button').addEventListener('click', function(e) {
    e.preventDefault();
    document.querySelector('#contact').scrollIntoView({
        behavior: 'smooth'
    });
});

// Music toggle functionality
/* let isPlaying = false;
const musicToggle = document.getElementById('musicToggle');

musicToggle.addEventListener('click', function() {
    isPlaying = !isPlaying;
    if (isPlaying) {
        this.textContent = '🎵';
        this.style.animation = 'bounce 2s infinite';
    } else {
        this.textContent = '🎵';
        this.style.animation = 'none';
    }
}); */


let isPlaying = false;
const musicToggle = document.getElementById('musicToggle');
const backgroundMusic = document.getElementById('backgroundMusic');

musicToggle.addEventListener('click', function () {
    isPlaying = !isPlaying;

    if (isPlaying) {
        backgroundMusic.play();
        this.textContent = '🔊'; // Change icon if you want
        this.style.animation = 'bounce 2s infinite';
    } else {
        backgroundMusic.pause();
        backgroundMusic.currentTime = 0; // Reset to start
        this.textContent = '🎵';
        this.style.animation = 'none';
    }
});




// Scroll animations using Intersection Observer
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.touch-item, .timeline-item').forEach(item => {
    observer.observe(item);
});

// Gallery lightbox functionality
const galleryItems = document.querySelectorAll('.gallery-item');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
const lightboxClose = document.getElementById('lightboxClose');

galleryItems.forEach(item => {
    item.addEventListener('click', function() {
        const img = this.querySelector('img');
        lightboxImage.src = img.src;
        lightboxImage.alt = img.alt;
        lightbox.classList.add('active');
    });
});

lightboxClose.addEventListener('click', function() {
    lightbox.classList.remove('active');
});

lightbox.addEventListener('click', function(e) {
    if (e.target === this) {
        this.classList.remove('active');
    }
});

// Testimonial carousel functionality
let currentSlide = 0;
const track = document.getElementById('testimonialTrack');
const dots = document.querySelectorAll('.nav-dot');
const totalSlides = 4;

function updateCarousel() {
    track.style.transform = `translateX(-${currentSlide * 100}%)`;
    dots.forEach((dot, index) => {
        dot.classList.toggle('active', index === currentSlide);
    });
}

dots.forEach((dot, index) => {
    dot.addEventListener('click', function() {
        currentSlide = index;
        updateCarousel();
    });
});

// Auto-rotate carousel
setInterval(function() {
    currentSlide = (currentSlide + 1) % totalSlides;
    updateCarousel();
}, 5000);

// Package tabs functionality
const packageTabs = document.querySelectorAll('.package-tab');
const packageContent = document.getElementById('packageContent');

const packages = {
    essentials: {
        title: 'Essentials Package',
        features: [
            { icon: '💐', text: 'Personalized floral arrangements' },
            { icon: '📸', text: 'Professional photography (2 hours)' },
            { icon: '🍰', text: 'Custom anniversary cake' },
            { icon: '🎵', text: 'Curated music playlist' },
            { icon: '🕯️', text: 'Romantic lighting setup' },
            { icon: '📋', text: 'Event coordination' }
        ],
        price: 'Starting from ₹75,000'
    },
    signature: {
        title: 'Signature Package',
        features: [
            { icon: '💐', text: 'Premium floral installations' },
            { icon: '📸', text: 'Full-day photography & videography' },
            { icon: '🎻', text: 'Live musicians performance' },
            { icon: '🍰', text: 'Multi-tier custom anniversary cake' },
            { icon: '🥂', text: 'Welcome cocktail reception' },
            { icon: '🎭', text: 'Surprise entertainment acts' },
            { icon: '💎', text: 'Luxury decor elements' },
            { icon: '📱', text: '24/7 dedicated coordinator' }
        ],
        price: 'Starting from ₹1,50,000'
    },
    legacy: {
        title: 'Legacy Package',
        features: [
            { icon: '🌟', text: 'Complete venue transformation' },
            { icon: '📸', text: 'Professional photo/video team' },
            { icon: '🎼', text: 'Live orchestra or band' },
            { icon: '🍰', text: 'Designer anniversary cake collection' },
            { icon: '🥂', text: 'Premium bar & catering' },
            { icon: '✈️', text: 'Guest accommodation coordination' },
            { icon: '🎁', text: 'Personalized anniversary gifts' },
            { icon: '📚', text: 'Custom memory book creation' },
            { icon: '🚗', text: 'Luxury transportation' },
            { icon: '👥', text: 'Full event management team' }
        ],
        price: 'Starting from ₹3,00,000'
    }
};

function updatePackageContent(packageType) {
    const pkg = packages[packageType];
    const featuresHTML = pkg.features.map(feature => 
        `<div class="feature-item">
            <div class="feature-icon">${feature.icon}</div>
            <span>${feature.text}</span>
        </div>`
    ).join('');

    packageContent.innerHTML = `
        <div class="package-info">
            <h3>${pkg.title}</h3>
            <div class="package-features">
                ${featuresHTML}
            </div>
            <div class="package-price">${pkg.price}</div>
        </div>
    `;
}

packageTabs.forEach(tab => {
    tab.addEventListener('click', function() {
        packageTabs.forEach(t => t.classList.remove('active'));
        this.classList.add('active');
        updatePackageContent(this.dataset.package);
    });
});

// Video placeholder functionality
document.getElementById('videoPlay').addEventListener('click', function() {
    // In a real implementation, this would play an actual video
    alert('Anniversary highlight reel would play here. This is a demo - in production, this would embed a video player with your custom anniversary montage.');
});

// Form submission
document.getElementById('contactForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Basic form validation
    const inputs = this.querySelectorAll('input[required], select[required], textarea[required]');
    let isValid = true;
    
    inputs.forEach(input => {
        if (!input.value.trim()) {
            isValid = false;
            input.style.borderColor = '#ff6b6b';
        } else {
            input.style.borderColor = '';
        }
    });
    
    if (isValid) {
        // In a real implementation, this would submit to your backend
        alert('Thank you for your inquiry! Our anniversary planning team will contact you within 24 hours to begin crafting your perfect celebration.');
        this.reset();
    } else {
        alert('Please fill in all required fields.');
    }
});

// WhatsApp float functionality
document.querySelector('.whatsapp-float').addEventListener('click', function() {
    // Replace with your actual WhatsApp business number
    window.open('https://wa.me/919876543210?text=Hi! I\'d like to plan an anniversary celebration with LUX.', '_blank');
});

// Smooth reveal animations on scroll
const revealElements = document.querySelectorAll('.style-card, .testimonial-card, .package-content');

const revealObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.8s ease';
    revealObserver.observe(el);
});

// Add some interactive hover effects
document.querySelectorAll('.style-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = '';
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    const rate = scrolled * -0.5;
    
    if (hero) {
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation for the page
window.addEventListener('load', function() {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});