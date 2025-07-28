 // Smooth scrolling
 function scrollToSection(sectionId) {
    document.getElementById(sectionId).scrollIntoView({
        behavior: 'smooth'
    });
}

// Fade in animation on scroll
function handleScrollAnimations() {
    const elements = document.querySelectorAll('.fade-in');
    const windowHeight = window.innerHeight;

    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Download brochure function
function downloadBrochure() {
    // alert('Wedding brochure download would start here. In a real implementation, this would trigger a PDF download.');
    const link = document.createElement('a');
    link.href = 'LUX_Wedding_Planning_Guide.pdf';
    link.download = 'LUX_Wedding_Planning_Guide.pdf'; // Optional: rename on download
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

// Play video function
function playVideo() {
    // alert('Video player would open here. In a real implementation, this would open a video lightbox or player.');

    document.querySelector('.video-placeholder').style.display = 'none';
    document.getElementById('videoFrame').style.display = 'block';
}

// Carousel auto-scroll (optional)
function autoScrollCarousel() {
    const carousel = document.querySelector('.carousel');
    let scrollAmount = 0;
    const cardWidth = 380; // Card width + gap

    setInterval(() => {
        if (scrollAmount >= carousel.scrollWidth - carousel.clientWidth) {
            scrollAmount = 0;
        } else {
            scrollAmount += cardWidth;
        }
        carousel.scrollTo({
            left: scrollAmount,
            behavior: 'smooth'
        });
    }, 4000);
}

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    handleScrollAnimations();
    // autoScrollCarousel(); // Uncomment if you want auto-scrolling carousel
});

// Handle scroll events
window.addEventListener('scroll', handleScrollAnimations);

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

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
});

// Add hover effects for service cards
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});
