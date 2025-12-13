// File: frontend/js/landing.js

document.addEventListener('DOMContentLoaded', () => {

    // --- MOBILE MENU TOGGLE LOGIC ---
    const mobileMenuBtn = document.getElementById('mobile-menu');
    const navLinks = document.getElementById('navLinks');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            // 'active' class toggle karega jo CSS mein display: flex karegi
            navLinks.classList.toggle('active');
        });
    }

});