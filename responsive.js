/**
 * RESPONSIVE CHURCH WEBSITE JAVASCRIPT
 * Handles mobile menu, viewport adjustments, and responsive interactions
 */

// DOM Ready
document.addEventListener('DOMContentLoaded', function() {
    initializeResponsiveFeatures();
});

/**
 * Initialize all responsive features
 */
function initializeResponsiveFeatures() {
    createMobileMenu();
    handleViewportMeta();
    setupResponsiveImages();
    setupTouchInteractions();
    setupResponsiveModals();
    setupScrollEffects();
}

/**
 * Mobile Menu Toggle
 */
function createMobileMenu() {
    // Create mobile menu button
    const mobileMenuBtn = document.createElement('button');
    mobileMenuBtn.className = 'mobile-menu-toggle';
    mobileMenuBtn.innerHTML = '☰';
    mobileMenuBtn.setAttribute('aria-label', 'Toggle navigation menu');
    
    // Add to header
    const nav = document.querySelector('nav');
    const navLinks = document.querySelector('.nav-links');
    
    if (nav && navLinks) {
        nav.appendChild(mobileMenuBtn);
        
        // Toggle menu
        mobileMenuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            mobileMenuBtn.innerHTML = navLinks.classList.contains('active') ? '✕' : '☰';
        });
        
        // Close menu when clicking on links
        const links = navLinks.querySelectorAll('a');
        links.forEach(link => {
            link.addEventListener('click', function() {
                navLinks.classList.remove('active');
                mobileMenuBtn.innerHTML = '☰';
            });
        });
    }
}

/**
 * Optimize viewport for mobile devices
 */
function handleViewportMeta() {
    const viewport = document.querySelector('meta[name="viewport"]');
    if (viewport) {
        viewport.setAttribute('content', 'width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes');
    }
}

/**
 * Make images responsive
 */
function setupResponsiveImages() {
    const images = document.querySelectorAll('img');
    images.forEach(img => {
        img.style.maxWidth = '100%';
        img.style.height = 'auto';
    });
}

/**
 * Enhanced touch interactions for mobile
 */
function setupTouchInteractions() {
    // Add touch-friendly hover states
    const touchElements = document.querySelectorAll('.feature, .leader-card, .job-card, .service-time');
    
    touchElements.forEach(element => {
        element.addEventListener('touchstart', function() {
            this.style.transform = 'scale(0.98)';
        });
        
        element.addEventListener('touchend', function() {
            this.style.transform = 'scale(1)';
        });
    });
}

/**
 * Responsive modal handling
 */
function setupResponsiveModals() {
    // Close modals on outside click
    const modals = document.querySelectorAll('.modal');
    modals.forEach(modal => {
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
            }
        });
    });
    
    // Handle modal sizing on mobile
    function adjustModalSize() {
        const modalContents = document.querySelectorAll('.modal-content');
        modalContents.forEach(content => {
            if (window.innerWidth <= 768) {
                content.style.margin = '10% auto';
                content.style.maxHeight = '80vh';
                content.style.overflowY = 'auto';
            } else {
                content.style.margin = '15% auto';
                content.style.maxHeight = 'none';
                content.style.overflowY = 'visible';
            }
        });
    }
    
    window.addEventListener('resize', adjustModalSize);
    adjustModalSize(); // Initial call
}

/**
 * Smooth scroll effects
 */
function setupScrollEffects() {
    // Smooth scroll for anchor links
    const anchorLinks = document.querySelectorAll('a[href^="#"]');
    anchorLinks.forEach(link => {
        link.addEventListener('click', function(e) {
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
    
    // Add scroll-to-top button for mobile
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '↑';
    scrollTopBtn.className = 'scroll-top-btn';
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 20px;
        right: 20px;
        background: var(--color-primary);
        color: white;
        border: none;
        border-radius: 50%;
        width: 50px;
        height: 50px;
        font-size: 20px;
        cursor: pointer;
        display: none;
        z-index: 999;
        box-shadow: 0 4px 12px rgba(0,0,0,0.3);
        transition: all 0.3s ease;
    `;
    
    document.body.appendChild(scrollTopBtn);
    
    // Show/hide scroll button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'block';
        } else {
            scrollTopBtn.style.display = 'none';
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
}

/**
 * Handle orientation changes
 */
window.addEventListener('orientationchange', function() {
    setTimeout(function() {
        // Recalculate layouts after orientation change
        window.dispatchEvent(new Event('resize'));
    }, 300);
});

/**
 * Prevent zoom on double tap for mobile
 */
let lastTouchEnd = 0;
document.addEventListener('touchend', function(event) {
    const now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
        event.preventDefault();
    }
    lastTouchEnd = now;
}, false);

/**
 * Enhanced form handling for mobile
 */
function enhanceForms() {
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        // Add input focus handling for mobile keyboards
        const inputs = form.querySelectorAll('input, textarea, select');
        inputs.forEach(input => {
            input.addEventListener('focus', function() {
                // Ensure input is visible above mobile keyboard
                if (window.innerWidth <= 768) {
                    setTimeout(() => {
                        this.scrollIntoView({
                            behavior: 'smooth',
                            block: 'center'
                        });
                    }, 300);
                }
            });
        });
    });
}

// Initialize form enhancements
enhanceForms();

/**
 * Performance optimization for images
 */
function lazyLoadImages() {
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src || img.src;
                    img.classList.remove('lazy');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        const lazyImages = document.querySelectorAll('img.lazy');
        lazyImages.forEach(img => imageObserver.observe(img));
    }
}

// Initialize lazy loading
lazyLoadImages();

/**
 * Network-aware loading
 */
if ('connection' in navigator) {
    const connection = navigator.connection;
    if (connection.effectiveType === '2g' || connection.saveData) {
        // Optimize for slow connections
        document.body.classList.add('slow-connection');
    }
}