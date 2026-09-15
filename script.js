// Initialize 3D Space Portfolio
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle functionality
    const themeToggle = document.getElementById('themeToggle');
    const sun = themeToggle.querySelector('.sun');
    const moon = themeToggle.querySelector('.moon');
    
    // Check for saved theme preference or use system preference
    const savedTheme = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && systemPrefersDark)) {
        document.body.classList.add('light-theme');
        themeToggle.style.display = 'flex';
        sun.style.display = 'none';
        moon.style.display = 'block';
    } else {
        themeToggle.style.display = 'flex';
    }
    
    themeToggle.addEventListener('click', () => {
        if (document.body.classList.contains('light-theme')) {
            document.body.classList.remove('light-theme');
            localStorage.setItem('theme', 'dark');
            sun.style.display = 'block';
            moon.style.display = 'none';
        } else {
            document.body.classList.add('light-theme');
            localStorage.setItem('theme', 'light');
            sun.style.display = 'none';
            moon.style.display = 'block';
        }
    });
    
    // Mouse parallax effect for hero background
    const hero = document.querySelector('.hero');
    let mouseX = 0, mouseY = 0;
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX / window.innerWidth - 0.5;
        mouseY = e.clientY / window.innerHeight - 0.5;
        if (hero) {
            hero.style.backgroundPosition = `calc(50% + ${mouseX * 50}px) calc(50% + ${mouseY * 50}px)`;
        }
    });
    
    // Intersection Observer for element animations
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.animationPlayState = 'running';
            }
        });
    }, observerOptions);
    
    // Observe all animated elements
    document.querySelectorAll('.skill-card, .project-card, .about-text').forEach(element => {
        element.style.animationPlayState = 'paused';
        observer.observe(element);
    });
    
    // Navbar scroll effect
    const header = document.querySelector('#mainNav');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        lastScroll = currentScroll;
    });
    
    // Smooth scroll for anchor links
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
    
    // Add staggered animation delay to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.style.animationPlayState = 'running';
    });
    
    // Add staggered animation delay to skill cards
    const skillCards = document.querySelectorAll('.skill-card');
    skillCards.forEach((card, index) => {
        card.style.transitionDelay = `${index * 0.1}s`;
        card.style.animationPlayState = 'running';
    });
    
    // 3D tilt effect on project cards
    const projectCardElements = document.querySelectorAll('.project-card');
    projectCardElements.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = (y - centerY) / 20;
            const rotateY = (centerX - x) / 20;
            
            card.style.transform = `perspective(1000px) translateY(-4px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
        });
        
        card.addEventListener('mouseleave', () => {
            card.style.transform = '';
        });
    });
});