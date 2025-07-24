 // Smooth scrolling for anchor links
 document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Scroll animations
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
    const counters = document.querySelectorAll('.counter');
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-count'));
        const increment = target / 100;
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            
            if (target === 4.9) {
                counter.textContent = current.toFixed(1);
            } else {
                counter.textContent = Math.floor(current);
            }
        }, 20);
    });
}

// Trigger counter animation when features section is visible
const featuresSection = document.querySelector('.features');
const featuresObserver = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            animateCounters();
            featuresObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

featuresObserver.observe(featuresSection);

// Add loading animation
window.addEventListener('load', function() {
    document.body.style.opacity = '1';
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




// 77777777777777777777777777777777777777777777777777777777777777777777777777777777


// Page Navigation Functions
function goToPage(pageName) {
    console.log('Navigating to:', pageName);
    alert(`Would navigate to ${pageName} page`);
}
// Contact Action Functions
function openLocationMap() {
    window.open('https://maps.google.com/?q=456+Elite+Boulevard+Prestige+Quarter', '_blank');
}
function initiatePhoneCall() {
    window.open('tel:+15557893548');
}
function composeEmail() {
    window.open('mailto:info@premiumevents.com?subject=Website Inquiry');
}
// Social Media Handler Functions
function handleFacebook() {
    window.open('https://facebook.com/premiumevents', '_blank');
}
function handleInstagram() {
    window.open('https://instagram.com/premiumevents', '_blank');
}
function handleTwitter() {
    window.open('https://twitter.com/premiumevents', '_blank');
}
function handleWhatsApp() {
    window.open('https://wa.me/15557893548?text=Hello! I\'m interested in your premium event planning services.', '_blank');
}
function handleLinkedIn() {
    window.open('https://linkedin.com/company/premiumevents', '_blank');
}
// Scroll to Top Function
function scrollToPageTop() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
}
// Show/Hide Scroll Button on Scroll
window.addEventListener('scroll', function() {
    const scrollButton = document.querySelector('.premium-events-scroll-button');
    if (window.pageYOffset > 400) {
        scrollButton.classList.add('show-button');
    } else {
        scrollButton.classList.remove('show-button');
    }
});
// Prevent default click behavior for social links in demo
document.querySelectorAll('.premium-events-social-button').forEach(button => {
    button.addEventListener('click', function(e) {
        e.preventDefault();
    });
});