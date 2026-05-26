const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', function () {
    navLinks.classList.toggle('open');
    const icon = hamburger.querySelector('i');
    if (navLinks.classList.contains('open')) {
        icon.classList.replace('fa-bars', 'fa-xmark');
    } else {
        icon.classList.replace('fa-xmark', 'fa-bars');
    }
});

navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('open');
        hamburger.querySelector('i').classList.replace('fa-xmark', 'fa-bars');
    });
});

