"use strict";

/* ========================================================================
   SPACE CANVAS ANIMATION
======================================================================== */

function initSpaceScene() {
    const canvas = document.getElementById("spaceCanvas");

    if (!canvas) {
        return;
    }

    const ctx = canvas.getContext("2d");

    if (!ctx) {
        return;
    }

    const stars = [];
    const starCount = 150;

    function resizeCanvas() {
        const pixelRatio = Math.min(window.devicePixelRatio || 1, 2);

        canvas.width = window.innerWidth * pixelRatio;
        canvas.height = window.innerHeight * pixelRatio;

        canvas.style.width = `${window.innerWidth}px`;
        canvas.style.height = `${window.innerHeight}px`;

        ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    }

    function createStars() {
        stars.length = 0;

        for (let i = 0; i < starCount; i++) {
            stars.push({
                x: Math.random() * window.innerWidth,
                y: Math.random() * window.innerHeight,
                radius: Math.random() * 1.5 + 0.2,
                opacity: Math.random() * 0.7 + 0.3,
                twinkleSpeed: Math.random() * 0.02 + 0.01,
                direction: Math.random() > 0.5 ? 1 : -1
            });
        }
    }

    function drawStars() {
        ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

        stars.forEach((star) => {
            star.opacity += star.twinkleSpeed * star.direction;

            if (star.opacity >= 1) {
                star.opacity = 1;
                star.direction = -1;
            }

            if (star.opacity <= 0.3) {
                star.opacity = 0.3;
                star.direction = 1;
            }

            ctx.beginPath();
            ctx.fillStyle = `rgba(255, 255, 255, ${star.opacity})`;
            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );
            ctx.fill();

            ctx.beginPath();
            ctx.strokeStyle = `rgba(0, 242, 254, ${star.opacity * 0.5})`;
            ctx.lineWidth = 0.5;
            ctx.arc(
                star.x,
                star.y,
                star.radius + 1,
                0,
                Math.PI * 2
            );
            ctx.stroke();
        });

        requestAnimationFrame(drawStars);
    }

    resizeCanvas();
    createStars();
    drawStars();

    window.addEventListener("resize", () => {
        resizeCanvas();
        createStars();
    });
}

/* ========================================================================
   PARALLAX EFFECT
======================================================================== */

function initParallax() {
    const mars = document.querySelector(".mars-planet");

    if (!mars) {
        return;
    }

    let ticking = false;

    function updateParallax() {
        const scrolled = window.pageYOffset || window.scrollY;

        if (scrolled < window.innerHeight) {
            mars.style.transform = `
                translateY(${scrolled * 0.5}px)
                rotate(${scrolled * 0.1}deg)
            `;
        }

        ticking = false;
    }

    window.addEventListener("scroll", () => {
        if (!ticking) {
            window.requestAnimationFrame(updateParallax);
            ticking = true;
        }
    });
}

/* ========================================================================
   DARK MODE TOGGLE
======================================================================== */

function initThemeToggle() {
    const themeToggle = document.getElementById("themeToggle");

    if (!themeToggle) {
        return;
    }

    const savedTheme = localStorage.getItem("theme");

    function updateThemeButton(isDarkMode) {
        themeToggle.textContent = isDarkMode ? "☀️" : "🌙";
        themeToggle.setAttribute(
            "aria-label",
            isDarkMode
                ? "Switch to light mode"
                : "Switch to dark mode"
        );
    }

    if (savedTheme === "dark") {
        document.body.classList.add("dark-mode");
        updateThemeButton(true);
    } else {
        document.body.classList.remove("dark-mode");
        updateThemeButton(false);
    }

    themeToggle.addEventListener("click", () => {
        const isDarkMode = document.body.classList.toggle("dark-mode");

        localStorage.setItem(
            "theme",
            isDarkMode ? "dark" : "light"
        );

        updateThemeButton(isDarkMode);
    });
}

/* ========================================================================
   SCROLL FADE-IN ANIMATIONS
======================================================================== */

function initScrollAnimations() {
    const sections = document.querySelectorAll(".section");

    if (!sections.length) {
        return;
    }

    // Show everything normally if IntersectionObserver is unsupported.
    if (!("IntersectionObserver" in window)) {
        sections.forEach((section) => {
            section.style.opacity = "1";
            section.style.transform = "translateY(0)";
        });

        return;
    }

    const observer = new IntersectionObserver(
        (entries, observerInstance) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.style.opacity = "1";
                    entry.target.style.transform = "translateY(0)";
                    observerInstance.unobserve(entry.target);
                }
            });
        },
        {
            threshold: 0.1,
            rootMargin: "0px 0px -50px 0px"
        }
    );

    sections.forEach((section) => {
        section.style.opacity = "0";
        section.style.transform = "translateY(30px)";
        section.style.transition = "opacity 0.6s ease-out, transform 0.6s ease-out";

        observer.observe(section);
    });
}

/* ========================================================================
   SMOOTH SCROLL
======================================================================== */

function initSmoothScroll() {
    const navigationLinks = document.querySelectorAll(
        'a[href^="#"]'
    );

    navigationLinks.forEach((link) => {
        link.addEventListener("click", (event) => {
            const targetId = link.getAttribute("href");

            if (!targetId || targetId === "#") {
                return;
            }

            const target = document.querySelector(targetId);

            if (!target) {
                return;
            }

            event.preventDefault();

            target.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        });
    });
}

/* ========================================================================
   INITIALIZE EVERYTHING
======================================================================== */

document.addEventListener("DOMContentLoaded", () => {
    initSpaceScene();
    initParallax();
    initThemeToggle();
    initScrollAnimations();
    initSmoothScroll();
});
