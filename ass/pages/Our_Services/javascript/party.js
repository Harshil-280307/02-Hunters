// Scroll Animation
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

document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el);
});

// Before/After Slider
let isDragging = false;
const sliderHandle = document.getElementById('sliderHandle');
const afterImage = document.getElementById('afterImage');
const sliderWrapper = sliderHandle.parentElement;

function updateSlider(clientX) {
    const rect = sliderWrapper.getBoundingClientRect();
    const percentage = Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100));
    
    sliderHandle.style.left = percentage + '%';
    afterImage.style.clipPath = `inset(0 ${100 - percentage}% 0 0)`;
}

sliderHandle.addEventListener('mousedown', (e) => {
    isDragging = true;
    e.preventDefault();
});

document.addEventListener('mousemove', (e) => {
    if (isDragging) {
        updateSlider(e.clientX);
    }
});

document.addEventListener('mouseup', () => {
    isDragging = false;
});

// Touch events for mobile
sliderHandle.addEventListener('touchstart', (e) => {
    isDragging = true;
    e.preventDefault();
});

document.addEventListener('touchmove', (e) => {
    if (isDragging) {
        updateSlider(e.touches[0].clientX);
    }
});

document.addEventListener('touchend', () => {
    isDragging = false;
});

// Carousel functionality
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-slide');
const totalSlides = slides.length;

function showSlide(index) {
    const carousel = document.getElementById('carouselSlides');
    carousel.style.transform = `translateX(-${index * 100}%)`;
    currentSlide = index;
}

function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
}

function prevSlide() {
    currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
    showSlide(currentSlide);
}

// Auto-advance carousel
setInterval(nextSlide, 5000);

// Accordion functionality
function toggleAccordion(header) {
    const item = header.parentElement;
    const isActive = item.classList.contains('active');
    
    // Close all accordion items
    document.querySelectorAll('.accordion-item').forEach(item => {
        item.classList.remove('active');
    });
    
    // Open clicked item if it wasn't active
    if (!isActive) {
        item.classList.add('active');
    }
}

// Form step functionality
function nextStep() {
    const step1 = document.getElementById('formStep1');
    const step2 = document.getElementById('formStep2');
    const stepIndicator1 = document.getElementById('step1');
    const stepIndicator2 = document.getElementById('step2');
    
    // Validate first step
    const requiredFields = step1.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#ff6b6b';
            field.addEventListener('input', () => {
                field.style.borderColor = '#eee';
            });
        }
    });
    
    if (isValid) {
        step1.style.display = 'none';
        step2.style.display = 'block';
        stepIndicator1.classList.remove('active');
        stepIndicator1.classList.add('completed');
        stepIndicator2.classList.add('active');
    }
}

// Form submission
document.getElementById('inquiryForm').addEventListener('submit', function(e) {
    e.preventDefault();
    
    // Here you would normally send the form data to a server
    alert('Thank you for your inquiry! We\'ll be in touch within 24 hours to discuss your dream celebration.');
    
    // Reset form
    this.reset();
    document.getElementById('formStep2').style.display = 'none';
    document.getElementById('formStep1').style.display = 'block';
    document.getElementById('step1').classList.add('active');
    document.getElementById('step1').classList.remove('completed');
    document.getElementById('step2').classList.remove('active');
});

// Lightbox functionality
function openLightbox(imageId) {
    const lightbox = document.getElementById('lightbox');
    const content = document.getElementById('lightboxContent');
    
    // Create placeholder content for demo
    const images = {
        gallery1: 'linear-gradient(45deg, var(--blush-coral), var(--gold-accent))',
        gallery2: 'linear-gradient(45deg, var(--mint), var(--lilac))',
        gallery3: 'linear-gradient(45deg, var(--lilac), var(--blush-coral))',
        gallery4: 'linear-gradient(45deg, var(--gold-accent), var(--mint))',
        gallery5: 'linear-gradient(45deg, var(--blush-coral), var(--mint))',
        gallery6: 'linear-gradient(45deg, var(--lilac), var(--gold-accent))'
    };
    
    content.innerHTML = `<div style="width: 600px; height: 400px; background: ${images[imageId]}; border-radius: 15px; display: flex; align-items: center; justify-content: center; color: white; font-size: 1.5rem; font-weight: 600;">Gallery Image Preview</div>`;
    lightbox.classList.add('active');
}

function closeLightbox() {
    document.getElementById('lightbox').classList.remove('active');
}

// Close lightbox on background click
document.getElementById('lightbox').addEventListener('click', function(e) {
    if (e.target === this) {
        closeLightbox();
    }
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

// Add sparkle animation to floating elements
function createSparkle() {
    const sparkle = document.createElement('div');
    sparkle.style.position = 'absolute';
    sparkle.style.width = '4px';
    sparkle.style.height = '4px';
    sparkle.style.background = 'var(--gold-accent)';
    sparkle.style.borderRadius = '50%';
    sparkle.style.pointerEvents = 'none';
    sparkle.style.animation = 'sparkle 2s ease-in-out';
    
    const x = Math.random() * window.innerWidth;
    const y = Math.random() * window.innerHeight;
    
    sparkle.style.left = x + 'px';
    sparkle.style.top = y + 'px';
    
    document.body.appendChild(sparkle);
    
    sparkle.addEventListener('animationend', () => {
        sparkle.remove();
    });
}

// Create sparkles periodically
setInterval(createSparkle, 3000);