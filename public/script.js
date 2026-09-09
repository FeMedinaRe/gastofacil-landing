document.addEventListener('DOMContentLoaded', () => {
    const toggle = document.querySelector('.menu-toggle');
    const mobileNav = document.querySelector('.mobile-nav');

    if (toggle && mobileNav) {
        toggle.addEventListener('click', () => {
            const open = mobileNav.classList.toggle('active');
            toggle.setAttribute('aria-expanded', String(open));
            toggle.setAttribute('aria-label', open ? 'Cerrar menú' : 'Abrir menú');
        });

        mobileNav.querySelectorAll('a').forEach((link) => {
            link.addEventListener('click', () => {
                mobileNav.classList.remove('active');
                toggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    const year = document.getElementById('year');
    if (year) year.textContent = String(new Date().getFullYear());
});
