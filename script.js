const navLinks = document.querySelectorAll('.nav-links a');
const currentPath = window.location.pathname.split('/').pop();
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links[data-menu]');
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('theme');

const applyTheme = (theme) => {
  const body = document.body;
  if (theme === 'light') {
    body.classList.add('theme-light');
    body.classList.remove('theme-dark');
    document.documentElement.setAttribute('data-theme', 'light');
    if (themeToggle) themeToggle.innerHTML = '<span></span>Dark';
    localStorage.setItem('theme', 'light');
  } else {
    body.classList.remove('theme-light');
    body.classList.add('theme-dark');
    document.documentElement.setAttribute('data-theme', 'dark');
    if (themeToggle) themeToggle.innerHTML = '<span></span>Light';
    localStorage.setItem('theme', 'dark');
  }
};

const getPreferredTheme = () => {
  if (savedTheme) return savedTheme;
  return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
};

navLinks.forEach((link) => {
  if (link.getAttribute('href') === currentPath || (currentPath === '' && link.getAttribute('href') === 'index.html')) {
    link.classList.add('active');
  }
});

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', isOpen);
    menuToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
}

if (themeToggle) {
  themeToggle.addEventListener('click', () => {
    const nextTheme = document.body.classList.contains('theme-light') ? 'dark' : 'light';
    applyTheme(nextTheme);
  });
}

applyTheme(getPreferredTheme());

const contactForm = document.querySelector('form');
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    alert('Thank you for reaching out. We will respond as soon as possible.');
    contactForm.reset();
  });
}
