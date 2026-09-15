// Space Canvas Animation
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
            twinklSpeed: Math.random() * 0.02 + 0.01
        });
    }
    
    function drawStars() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        stars.forEach(star => {
            // Twinkling effect
            star.opacity += star.twinklSpeed;
            if (star.opacity >= 1 || star.opacity <= 0.3) {
                star.twinklSpeed *= -1;
            }
            
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.beginPath();
            ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
            ctx.fill();
            
            // Glow
            ctx.strokeStyle = `rgba(0, 242, 254, ${star.opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
        });
        
        requestAnimationFrame(drawStars);
    }
    
    drawStars();
    
    // Handle resize
    window.addEventListener('resize', () => {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });
}

// Parallax effect on scroll
window.addEventListener('scroll', () => {
    const mars = document.querySelector('.mars-planet');
    const scrolled = window.pageYOffset;
    if (mars) {
        mars.style.transform = `translateY(${scrolled * 0.5}px) rotate(${scrolled * 0.1}deg)`;
    }
});

// Initialize on load
document.addEventListener('DOMContentLoaded', initSpaceScene);
