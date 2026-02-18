export function initNavigation() {
  const currentPath = window.location.pathname;
  const page = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('nav ul li a:not(.cta-nav)');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}
