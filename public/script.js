// Theme management
(function() {
    'use strict';
    
    const THEME_STORAGE_KEY = 'gastofacil-theme';
    
    function getInitialTheme() {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        if (stored === 'dark' || stored === 'light') {
            return stored;
        }
        // Default to system preference
        return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    
    function setTheme(theme) {
        document.documentElement.setAttribute('data-theme', theme);
        localStorage.setItem(THEME_STORAGE_KEY, theme);
        updateThemeIcons(theme);
    }
    
    function toggleTheme() {
        const current = document.documentElement.getAttribute('data-theme') || 'light';
        const next = current === 'light' ? 'dark' : 'light';
        setTheme(next);
    }
    
    function updateThemeIcons(theme) {
        const sunIcon = document.getElementById('theme-icon-sun');
        const moonIcon = document.getElementById('theme-icon-moon');
        const mobileText = document.getElementById('theme-text-mobile');
        
        if (theme === 'dark') {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
            if (mobileText) mobileText.textContent = 'Cambiar a modo claro';
        } else {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
            if (mobileText) mobileText.textContent = 'Cambiar a modo oscuro';
        }
    }
    
    // Initialize theme on load
    const initialTheme = getInitialTheme();
    setTheme(initialTheme);
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        const stored = localStorage.getItem(THEME_STORAGE_KEY);
        // Only auto-switch if user hasn't manually set a preference
        if (!stored) {
            setTheme(e.matches ? 'dark' : 'light');
        }
    });
    
    // Expose globally for button clicks
    window.toggleTheme = toggleTheme;
    window.setTheme = setTheme;
})();

// Mobile menu toggle
(function() {
    'use strict';
    
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');
    const desktopThemeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('theme-toggle-mobile');
    
    if (menuToggle && mobileNav) {
        menuToggle.addEventListener('click', function() {
            const expanded = this.getAttribute('aria-expanded') === 'true';
            this.setAttribute('aria-expanded', !expanded);
            mobileNav.classList.toggle('active');
        });
    }
    
    // Theme toggle handlers
    if (desktopThemeToggle) {
        desktopThemeToggle.addEventListener('click', window.toggleTheme);
    }
    
    if (mobileThemeToggle) {
        mobileThemeToggle.addEventListener('click', window.toggleTheme);
    }
})();

// Update copyright year
(function() {
    'use strict';
    const yearSpan = document.getElementById('year');
    if (yearSpan) {
        yearSpan.textContent = new Date().getFullYear();
    }
})();
