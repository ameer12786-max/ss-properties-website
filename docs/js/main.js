/**
 * S&S Properties - Main JavaScript
 * Premium Property Development Website
 */

document.addEventListener('DOMContentLoaded', function() {
    
    // ===================================
    // Navigation
    // ===================================
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    
    // Scroll effect for navbar
    function handleScroll() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Run on page load
    
    // Mobile menu toggle
    if (navToggle) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            navToggle.classList.toggle('active');
        });
    }
    
    // Close mobile menu when clicking a link
    const navLinks = document.querySelectorAll('.nav-menu a');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        });
    });
    
    // Close mobile menu when clicking outside
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !navToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            navToggle.classList.remove('active');
        }
    });
    
    // ===================================
    // Smooth Scrolling
    // ===================================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            if (href !== '#') {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    const offsetTop = target.offsetTop - 80;
                    window.scrollTo({
                        top: offsetTop,
                        behavior: 'smooth'
                    });
                }
            }
        });
    });
    
    // ===================================
    // Stats Counter Animation
    // ===================================
    const statNumbers = document.querySelectorAll('.stat-number');
    let statsAnimated = false;
    
    function animateStats() {
        if (statsAnimated) return;
        
        const statsSection = document.querySelector('.stats');
        if (!statsSection) return;
        
        const sectionTop = statsSection.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight - 100) {
            statsAnimated = true;
            
            statNumbers.forEach(stat => {
                const target = parseInt(stat.getAttribute('data-target'));
                const duration = 2000;
                const step = target / (duration / 16);
                let current = 0;
                
                const counter = setInterval(() => {
                    current += step;
                    if (current >= target) {
                        stat.textContent = target;
                        clearInterval(counter);
                    } else {
                        stat.textContent = Math.floor(current);
                    }
                }, 16);
            });
        }
    }
    
    window.addEventListener('scroll', animateStats);
    animateStats(); // Check on page load
    
    // ===================================
    // Fade In Animation on Scroll
    // ===================================
    const fadeElements = document.querySelectorAll('.service-card, .project-card, .about-feature, .contact-card, .quick-link-card');
    
    function handleFadeIn() {
        fadeElements.forEach(element => {
            const elementTop = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementTop < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    }
    
    // Set initial styles for fade elements
    fadeElements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(30px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', handleFadeIn);
    setTimeout(handleFadeIn, 100); // Run after a short delay on page load
    
    // ===================================
    // Contact Form Handling
    // ===================================
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Set the _next URL dynamically
        const nextInput = contactForm.querySelector('input[name="_next"]');
        if (nextInput) {
            nextInput.value = window.location.href.replace('contact.html', 'index.html') + '?submitted=true';
        }
        
        // Form validation feedback
        contactForm.addEventListener('submit', function(e) {
            const btn = contactForm.querySelector('button[type="submit"]');
            const originalText = btn.innerHTML;
            btn.innerHTML = '<span>Sending...</span><i class="fas fa-spinner fa-spin"></i>';
            btn.disabled = true;
            
            // Re-enable after timeout in case of issues
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.disabled = false;
            }, 10000);
        });
        
        // Real-time validation
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('blur', function() {
                validateField(this);
            });
            
            input.addEventListener('input', function() {
                if (this.classList.contains('error')) {
                    validateField(this);
                }
            });
        });
        
        function validateField(field) {
            const value = field.value.trim();
            
            if (field.hasAttribute('required') && !value) {
                field.classList.add('error');
                field.style.borderColor = '#dc3545';
            } else if (field.type === 'email' && value && !isValidEmail(value)) {
                field.classList.add('error');
                field.style.borderColor = '#dc3545';
            } else {
                field.classList.remove('error');
                field.style.borderColor = '#e9ecef';
            }
        }
        
        function isValidEmail(email) {
            const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            return regex.test(email);
        }
    }
    
    // Check for form submission success
    if (window.location.search.includes('submitted=true')) {
        showNotification('Thank you! Your message has been sent successfully. We\'ll be in touch soon.', 'success');
        // Clean up URL
        window.history.replaceState({}, document.title, window.location.pathname);
    }
    
    // ===================================
    // Notification System
    // ===================================
    function showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
                <span>${message}</span>
            </div>
            <button class="notification-close"><i class="fas fa-times"></i></button>
        `;
        
        // Styles
        Object.assign(notification.style, {
            position: 'fixed',
            top: '100px',
            right: '20px',
            maxWidth: '400px',
            padding: '20px 25px',
            background: type === 'success' ? '#10b981' : '#3b82f6',
            color: '#fff',
            borderRadius: '8px',
            boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
            zIndex: '9999',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '15px',
            animation: 'slideIn 0.3s ease'
        });
        
        document.body.appendChild(notification);
        
        // Close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.style.cssText = 'background: none; border: none; color: #fff; cursor: pointer; padding: 5px;';
        closeBtn.addEventListener('click', () => notification.remove());
        
        // Auto remove
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => notification.remove(), 300);
        }, 5000);
    }
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100%); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100%); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    // ===================================
    // Image Gallery Lightbox
    // ===================================
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    galleryItems.forEach(item => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            if (img) {
                openLightbox(img.src, img.alt);
            }
        });
    });
    
    function openLightbox(src, alt) {
        const lightbox = document.createElement('div');
        lightbox.className = 'lightbox';
        lightbox.innerHTML = `
            <div class="lightbox-overlay"></div>
            <div class="lightbox-content">
                <img src="${src}" alt="${alt}">
                <button class="lightbox-close"><i class="fas fa-times"></i></button>
            </div>
        `;
        
        // Styles
        Object.assign(lightbox.style, {
            position: 'fixed',
            inset: '0',
            zIndex: '10000',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '40px'
        });
        
        const overlay = lightbox.querySelector('.lightbox-overlay');
        Object.assign(overlay.style, {
            position: 'absolute',
            inset: '0',
            background: 'rgba(0, 0, 0, 0.9)'
        });
        
        const content = lightbox.querySelector('.lightbox-content');
        Object.assign(content.style, {
            position: 'relative',
            maxWidth: '90vw',
            maxHeight: '90vh'
        });
        
        const imgEl = lightbox.querySelector('img');
        Object.assign(imgEl.style, {
            maxWidth: '100%',
            maxHeight: '85vh',
            objectFit: 'contain',
            borderRadius: '8px'
        });
        
        const closeBtn = lightbox.querySelector('.lightbox-close');
        Object.assign(closeBtn.style, {
            position: 'absolute',
            top: '-50px',
            right: '0',
            background: 'none',
            border: 'none',
            color: '#fff',
            fontSize: '2rem',
            cursor: 'pointer',
            padding: '10px'
        });
        
        document.body.appendChild(lightbox);
        document.body.style.overflow = 'hidden';
        
        // Close handlers
        const closeLightbox = () => {
            document.body.removeChild(lightbox);
            document.body.style.overflow = '';
        };
        
        closeBtn.addEventListener('click', closeLightbox);
        overlay.addEventListener('click', closeLightbox);
        document.addEventListener('keydown', function escHandler(e) {
            if (e.key === 'Escape') {
                closeLightbox();
                document.removeEventListener('keydown', escHandler);
            }
        });
    }
    
    // ===================================
    // Parallax Effect for Hero
    // ===================================
    const hero = document.querySelector('.hero');
    
    if (hero) {
        window.addEventListener('scroll', function() {
            const scrolled = window.scrollY;
            if (scrolled < window.innerHeight) {
                hero.style.backgroundPositionY = scrolled * 0.5 + 'px';
            }
        });
    }
    
    // ===================================
    // Active Navigation Link
    // ===================================
    const sections = document.querySelectorAll('section[id]');
    
    function updateActiveNav() {
        const scrollY = window.scrollY;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 150;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');
            
            if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
                document.querySelectorAll('.nav-menu a').forEach(link => {
                    link.classList.remove('active');
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.classList.add('active');
                    }
                });
            }
        });
    }
    
    window.addEventListener('scroll', updateActiveNav);
    
    // ===================================
    // Preloader (Optional)
    // ===================================
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
});
