 // Scroll animation for fade-in elements
 function animateOnScroll() {
    const elements = document.querySelectorAll('.fade-in');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.classList.add('visible');
        }
    });
}

// Parallax effect for hero section
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    const scrolled = window.pageYOffset;
    const rate = scrolled * -0.5;
    
    hero.style.transform = `translateY(${rate}px)`;
}

// Modal functionality
function openModal(imageId) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    
    // Create placeholder image URLs based on imageId
    const imageUrls = {
        'gallery1': '../../photos/prewed08.jpg',
        'gallery2': '../../photos/prewed09.jpg',
        'gallery3': '../../photos/prewed10.jpg',
        'gallery4': '../../photos/prewed11.jpg',
    };
    
    modal.style.display = 'block';
    modalImg.src = imageUrls[imageId] || imageUrls['gallery1'];
    
    // Add click animation effect
    modalImg.style.transform = 'scale(0.8)';
    setTimeout(() => {
        modalImg.style.transition = 'transform 0.3s ease';
        modalImg.style.transform = 'scale(1)';
    }, 50);
}

// Close modal
function closeModal() {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    
    modalImg.style.transform = 'scale(0.8)';
    setTimeout(() => {
        modal.style.display = 'none';
        modalImg.style.transition = '';
        modalImg.style.transform = '';
    }, 200);
}

// Smooth scrolling for navigation links
function smoothScroll(target) {
    const targetElement = document.querySelector(target);
    if (targetElement) {
        targetElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    // Initial animation check
    animateOnScroll();
    
    // Scroll event listeners
    window.addEventListener('scroll', function() {
        animateOnScroll();
        parallaxEffect();
    });
    
    // Modal event listeners
    const closeBtn = document.querySelector('.close');
    const modal = document.getElementById('imageModal');
    
    closeBtn.addEventListener('click', closeModal);
    
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    // Escape key to close modal
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeModal();
        }
    });
    
    // Smooth scrolling for all internal links
    document.querySelectorAll('a[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId !== '#') {
                smoothScroll(targetId);
            }
        });
    });
    
    // Button ripple effect enhancement
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function(e) {
            // Create ripple effect
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    });
    
    // Add some interactive hover effects to cards
    document.querySelectorAll('.location-card, .package-card, .gallery-item').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = this.style.transform.replace('translateY(0px)', '') + ' translateY(-10px)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = this.style.transform.replace('translateY(-10px)', 'translateY(0px)');
        });
    });
    
    // Video play button functionality
    const playButton = document.querySelector('.play-button');
    const playBtn = document.getElementById('customPlayBtn');
    const videoBox = document.getElementById('videoPlaceholder');
    
    
    playBtn.addEventListener('click', function () {
        // Replace the placeholder with the actual YouTube iframe
        videoBox.innerHTML = `
            <iframe width="100%" height="100%" 
                src="https://www.youtube.com/embed/kebq86BTZFA?si=AxVJQai0ZjXllj1L" 
                title="YouTube video player" 
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowfullscreen
                style="border-radius: 20px;">
            </iframe>
        `;
    });
    
    // if (playButton) {
    //     playButton.addEventListener('click', function() {
    //         // Simple pulse animation
    //         this.style.transform = 'scale(1.2)';
    //         setTimeout(() => {
    //             this.style.transform = 'scale(1)';
    //         }, 200);
            
    //         // You can add actual video playing functionality here
    //         alert('Video functionality would be implemented here with actual video player');
    //     });
    // }
    
    // Add stagger animation to grid items
    function staggerAnimation() {
        const grids = document.querySelectorAll('.locations-grid, .packages-grid, .gallery-grid, .approach-steps');
        
        grids.forEach(grid => {
            const items = grid.children;
            for (let i = 0; i < items.length; i++) {
                items[i].style.animationDelay = (i * 0.1) + 's';
            }
        });
    }
    
    staggerAnimation();
});

// Add CSS for ripple effect
const style = document.createElement('style');
style.textContent = `
    .ripple {
        position: absolute;
        background: rgba(255, 255, 255, 0.3);
        border-radius: 50%;
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .location-card, .package-card, .gallery-item {
        transition: all 0.3s ease;
    }
`;
document.head.appendChild(style);