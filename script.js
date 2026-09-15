// ========================================================================
// SPACE CANVAS ANIMATION
// ========================================================================
function initSpaceScene() {
    const canvas = document.getElementById('spaceCanvas');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const stars = [];
    const starCount = 150;
    
    // Create stars
    for (let i = 0; i < starCount; i++) {
        stars.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height,
            radius: Math.random() * 1.5,
            opacity: Math.random() * 0.7 + 0.3,
            twinkleSpeed: Math.random() * 0.02 + 0.01
        });
    }
    
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Twinkling effect
            star.opacity += star.twinkleSpeed;
            if (star.opacity >= 1 || star.opacity <= 0.3) {
                star.twinkleSpeed *= -1;
            }
            
            // Draw star
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow effect
            ctx.strokeStyle = `rgba(0, 242, 254, ${star.opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        });
        
        requestAnimationFrame(drawStars);
    }
    
    drawStars();
    
    // Handle window resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// ========================================================================
// PARALLAX EFFECT ON SCROLL
// ========================================================================
window.addEventListener('scroll', () => {
    const mars = document.querySelector('.mars-planet');
    const scrolled = window.pageYOffset;
    
    if (mars && scrolled < window.innerHeight) {
        mars.style.transform = `translateY(${scrolled * 0.5}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// ========================================================================
// DARK MODE TOGGLE
// ========================================================================
function initThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');
    const htmlElement = document.documentElement;
    
    // Check for saved theme preference or default to light mode
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    if (currentTheme === 'dark') {
        document.body.classList.add('dark-mode');
        themeToggle.textContent = '☀️';
    } else {
        themeToggle.textContent = '🌙';
    }
    
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark-mode');
        
        const isDarkMode = document.body.classList.contains('dark-mode');
        localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
        themeToggle.textContent = isDarkMode ? '☀️' : '🌙';
    });
}

// ========================================================================
// SCROLL ANIMATIONS - FADE IN ON SCROLL
// ========================================================================
function initScrollAnimations() {
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);
    
    // Observe all sections
    document.querySelectorAll('.section').forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(30px)';
        section.style.transition = 'all 0.6s ease-out';
        observer.observe(section);
    });
}

// ========================================================================
// SMOOTH SCROLL TO SECTIONS
// ========================================================================
function initSmoothScroll() {
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
}

// ========================================================================
// INITIALIZE ALL ON DOM READY
// ========================================================================
document.addEventListener('DOMContentLoaded', () => {
    initSpaceScene();
    initThemeToggle();
    initScrollAnimations();
    initSmoothScroll();
});

// ========================================================================
// RESPONSIVE CANVAS ON RESIZE
// ========================================================================
window.addEventListener('resize', () => {
    const canvas = document.getElementById('spaceCanvas');
    if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
