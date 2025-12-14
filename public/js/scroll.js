// Scroll effects for ElektroShop homepage
// - Reveal elements on scroll (IntersectionObserver)
// - Parallax background for hero
// - Sticky header class toggle
// - Smooth scroll helpers

(function () {
    'use strict';

    function onReady(fn) {
        if (document.readyState !== 'loading') {
            fn();
        } else {
            document.addEventListener('DOMContentLoaded', fn);
        }
    }

    onReady(function () {
        // Reveal / fade-in for elements with .category-card, .product-card, .reveal
        const revealSelector = '.category-card, .product-card, .reveal';
        const revealElements = document.querySelectorAll(revealSelector);
        if (revealElements.length) {
            // Slightly slower reveal: add a small delay before applying the visible class
            const revealDelayBase = 260; // base delay in ms
            const ro = new IntersectionObserver((entries) => {
                entries.forEach((entry, idx) => {
                    if (entry.isIntersecting) {
                        // stagger and delay so the effect feels slower and smoother
                        const extra = Math.min(300, idx * 60);
                        setTimeout(() => {
                            entry.target.classList.add('visible');
                        }, revealDelayBase + extra);
                        // unobserve immediately to avoid retriggering
                        ro.unobserve(entry.target);
                    }
                });
            }, { threshold: 0.12 });

            revealElements.forEach(el => ro.observe(el));
        }

        // Parallax for hero background (subtle)
        const hero = document.querySelector('.hero');
        if (hero) {
            // throttle with requestAnimationFrame and slow down parallax multiplier for gentler movement
            let ticking = false;
            const parallaxMultiplier = 0.06; // smaller = slower
            window.addEventListener('scroll', () => {
                if (!ticking) {
                    window.requestAnimationFrame(() => {
                        const scrolled = window.scrollY || window.pageYOffset;
                        hero.style.backgroundPosition = `center calc(50% + ${scrolled * parallaxMultiplier}px)`;
                        ticking = false;
                    });
                    ticking = true;
                }
            }, { passive: true });
        }

        // Sticky header styling on scroll
        const header = document.querySelector('header');
        if (header) {
            const threshold = 40;
            window.addEventListener('scroll', () => {
                if (window.scrollY > threshold) header.classList.add('scrolled');
                else header.classList.remove('scrolled');
            }, { passive: true });
        }

        // Smooth scrolling for buttons (just in case)
        const productsBtn = document.getElementById('products-btn');
        if (productsBtn) {
            productsBtn.addEventListener('click', (e) => {
                // If link has href to products page, allow default navigation; otherwise, smooth scroll inside page.
                const href = productsBtn.getAttribute('href');
                if (href && href.startsWith('#')) {
                    e.preventDefault();
                    const target = document.querySelector(href);
                    if (target) target.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }

        // categories button scroll handled by existing function scrollToCategories in page script

    });
})();
