// Initialize 3D Space Portfolio
document.addEventListener('DOMContentLoaded', function() {
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
    const header = document.querySelector('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (currentScroll > 100) {
            header.style.background = 'rgba(10, 10, 30, 0.98)';
            header.style.boxShadow = '0 20px 40px -20px rgba(0, 0, 0, 0.5), 0 0 30px rgba(0, 255, 136, 0.3)';
        } else {
            header.style.background = 'rgba(10, 10, 30, 0.95)';
            header.style.boxShadow = '0 10px 30px rgba(0, 0, 0, 0.5), 0 0 20px rgba(0, 255, 136, 0.2)';
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