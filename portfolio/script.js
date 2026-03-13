// ============================
// Navigation Menu Toggle
// ============================
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');
const navLinks = document.querySelectorAll('.nav-link');

hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    hamburger.classList.toggle('active');
});

// Close menu when a link is clicked
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    });
});

// ============================
// Smooth Scroll for Navigation
// ============================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const href = this.getAttribute('href');
        if (href !== '#' && document.querySelector(href)) {
            e.preventDefault();
            const target = document.querySelector(href);
            const offsetTop = target.offsetTop - 80; // account for fixed navbar
            
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// ============================
// Navbar Background on Scroll
// ============================
const navbar = document.querySelector('.navbar');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        navbar.style.borderBottomColor = 'rgba(51, 65, 85, 0.5)';
        navbar.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================
// Form Validation and Submission
// ============================
const contactForm = document.getElementById('contactForm');
const formInputs = {
    name: document.getElementById('name'),
    email: document.getElementById('email'),
    message: document.getElementById('message')
};

// Email validation regex
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Real-time validation
Object.values(formInputs).forEach(input => {
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => clearError(input));
});

function validateField(field) {
    const value = field.value.trim();
    const errorElement = field.parentElement.querySelector('.form-error');
    
    if (!value) {
        showError(field, 'This field is required');
        return false;
    }
    
    if (field.id === 'email' && !emailRegex.test(value)) {
        showError(field, 'Please enter a valid email address');
        return false;
    }
    
    if (field.id === 'message' && value.length < 10) {
        showError(field, 'Message must be at least 10 characters');
        return false;
    }
    
    clearError(field);
    return true;
}

function showError(field, message) {
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = message;
        field.style.borderColor = '#ef4444';
    }
}

function clearError(field) {
    const errorElement = field.parentElement.querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = '';
        field.style.borderColor = '';
    }
}

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Validate all fields
    let isValid = true;
    Object.values(formInputs).forEach(input => {
        if (!validateField(input)) {
            isValid = false;
        }
    });
    
    if (isValid) {
        // Show success message
        const successMessage = document.createElement('div');
        successMessage.style.cssText = `
            padding: 1rem;
            margin-bottom: 1rem;
            background: rgba(16, 185, 129, 0.1);
            border: 1px solid #10b981;
            border-radius: 8px;
            color: #10b981;
            text-align: center;
            animation: slideDown 0.3s ease-out;
        `;
        successMessage.textContent = '✓ Thank you! Your message has been sent successfully.';
        
        contactForm.insertBefore(successMessage, contactForm.firstChild);
        
        // Reset form
        contactForm.reset();
        
        // Remove success message after 5 seconds
        setTimeout(() => {
            successMessage.style.animation = 'slideUp 0.3s ease-out';
            setTimeout(() => successMessage.remove(), 300);
        }, 5000);
    }
});

// ============================
// Scroll Animations (Intersection Observer)
// ============================
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add animation classes when elements come into view
            if (entry.target.classList.contains('project-card')) {
                entry.target.style.animation = 'fadeInScale 0.6s ease-out forwards';
            } else if (entry.target.classList.contains('skill-category')) {
                entry.target.style.animation = 'slideInUp 0.6s ease-out forwards';
            }
            
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe all project cards and skill categories
document.querySelectorAll('.project-card, .skill-category').forEach(el => {
    observer.observe(el);
});

// ============================
// Parallax Effect
// ============================
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    
    // Hero section parallax
    const heroSection = document.querySelector('.hero');
    if (heroSection) {
        const heroContent = heroSection.querySelector('.hero-content');
        if (heroContent && scrollPosition < heroSection.clientHeight) {
            heroContent.style.transform = `translateY(${scrollPosition * 0.5}px)`;
        }
    }
});

// ============================
// Active Navigation Link
// ============================
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollPosition >= sectionTop - 200) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').slice(1) === current) {
            link.style.color = 'var(--primary-color)';
        } else {
            link.style.color = '';
        }
    });
});

// ============================
// Counter Animation
// ============================
function animateCounters() {
    const stats = document.querySelectorAll('.stat h3');
    const observerOptions = {
        threshold: 0.5
    };
    
    const countObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const target = entry.target;
                const endValue = parseInt(target.textContent);
                const duration = 2000; // 2 seconds
                const steps = 60;
                const stepDuration = duration / steps;
                let currentStep = 0;
                
                const originalText = target.textContent;
                const numericValue = parseInt(originalText);
                const suffix = originalText.replace(/[0-9]/g, '');
                
                const interval = setInterval(() => {
                    currentStep++;
                    const progress = currentStep / steps;
                    const currentValue = Math.floor(numericValue * progress);
                    target.textContent = currentValue + suffix;
                    
                    if (currentStep === steps) {
                        target.textContent = originalText;
                        clearInterval(interval);
                    }
                }, stepDuration);
                
                countObserver.unobserve(target);
            }
        });
    }, observerOptions);
    
    stats.forEach(stat => countObserver.observe(stat));
}

// Call counter animation when page loads
document.addEventListener('DOMContentLoaded', animateCounters);

// ============================
// Typing Effect for Hero Subtitle
// ============================
function typeWriterEffect() {
    const subtitle = document.querySelector('.hero-subtitle');
    if (!subtitle) return;
    
    const text = subtitle.textContent;
    subtitle.textContent = '';
    let index = 0;
    
    function type() {
        if (index < text.length) {
            subtitle.textContent += text.charAt(index);
            index++;
            setTimeout(type, 50);
        }
    }
    
    // Start typing after a delay
    setTimeout(type, 500);
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', typeWriterEffect);

// ============================
// Theme Toggle (Optional)
// ============================
// You can implement a dark/light theme toggle here if needed

// ============================
// Add keyboard navigation
// ============================
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
    }
});

// ============================
// Prevent page flicker on load
// ============================
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
});

// Make scrollPosition variable global
let scrollPosition = window.pageYOffset;
window.addEventListener('scroll', () => {
    scrollPosition = window.pageYOffset;
});
