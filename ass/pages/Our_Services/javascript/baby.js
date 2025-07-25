 // Floating elements animation
 function createFloatingElements() {
    const elements = ['👶', '🍼', '🧸', '⭐', '🎈', '💕', '🌟', '🎁'];
    const container = document.getElementById('floatingElements');
    
    setInterval(() => {
        const element = document.createElement('div');
        element.className = 'floating-item';
        element.innerHTML = elements[Math.floor(Math.random() * elements.length)];
        element.style.left = Math.random() * 100 + 'vw';
        element.style.animationDuration = (Math.random() * 10 + 10) + 's';
        element.style.animationDelay = Math.random() * 5 + 's';
        
        container.appendChild(element);
        
        // Remove element after animation
        setTimeout(() => {
            if (element.parentNode) {
                element.parentNode.removeChild(element);
            }
        }, 20000);
    }, 2000);
}

// Scroll animations
function animateOnScroll() {
    const elements = document.querySelectorAll('.feature-card, .service-item, .addon-card, .timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
            }
        });
    }, { threshold: 0.1 });
    
    elements.forEach(element => {
        observer.observe(element);
    });
}

// Modal functions
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = 'flex';
    setTimeout(() => modal.classList.add('show'), 10);
}

function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.classList.remove('show');
    setTimeout(() => modal.style.display = 'none', 300);
}

// Gallery functions
function openGallery(imageId) {
    const images = [
        '', 
        '../../photos/baby06.jpg',
        '../../photos/baby07.jpg',
        '../../photos/baby08.webp',
        '../../photos/baby09.avif',
        '../../photos/baby10.jpg',
        '../../photos/baby11.jpg'
    ];
    
    const titles = [
        '', 'Amrita\'s Boho Baby Shower', 'Royal Prince Theme Celebration', 
        'Botanical Bloom Baby Shower', 'Minimal Chic Elegance', 
        'Teddy Wonderland Setup', 'Whimsical Circus Theme'
    ];
    
    const descriptions = [
        '', 'A beautiful celebration with natural textures and earthy tones',
        'An elegant royal-themed shower with gold accents and soft pastels',
        'Lush greenery and delicate florals created a garden paradise',
        'Clean lines and sophisticated simplicity for the modern parent',
        'Cozy browns and creams with adorable teddy bear accents',
        'A playful and colorful circus-themed celebration'
    ];
    
    document.getElementById('modalImage').src = images[imageId];
    document.getElementById('galleryTitle').innerText = titles[imageId];
    document.getElementById('galleryDescription').innerText = descriptions[imageId];
    openModal('galleryModal');
}

// Form submission
document.getElementById('planningForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Get form data
    const formData = new FormData(this);
    const data = Object.fromEntries(formData);
    
    // Simple validation
    if (!data.parentName || !data.email || !data.phone) {
        alert('Please fill in all required fields.');
        return;
    }
    
    // Simulate form submission
    const submitBtn = this.querySelector('.submit-btn');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = 'Sending... ✨';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        alert('Thank you! We\'ll contact you within 24 hours to discuss your dream baby shower. 💕');
        closeModal('planningModal');
        this.reset();
        submitBtn.innerHTML = originalText;
        submitBtn.disabled = false;
    }, 2000);
});

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

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
        const modalId = e.target.id;
        closeModal(modalId);
    }
});

// Initialize animations on page load
document.addEventListener('DOMContentLoaded', function() {
    createFloatingElements();
    animateOnScroll();
    
    // Add stagger animation to feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        card.style.animationDelay = (index * 0.2) + 's';
    });
});

// Carousel touch support for mobile
let isDown = false;
let startX;
let scrollLeft;

const carousel = document.querySelector('.themes-carousel');

carousel.addEventListener('mousedown', (e) => {
    isDown = true;
    carousel.classList.add('active');
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
    isDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mouseup', () => {
    isDown = false;
    carousel.classList.remove('active');
});

carousel.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});

// Touch events for mobile
carousel.addEventListener('touchstart', (e) => {
    startX = e.touches[0].pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('touchmove', (e) => {
    if (!startX) return;
    const x = e.touches[0].pageX - carousel.offsetLeft;
    const walk = (x - startX) * 2;
    carousel.scrollLeft = scrollLeft - walk;
});