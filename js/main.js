function initNavbarScroll() {
  const navbar = document.querySelector('.Noir£-navbar');
  if (!navbar) return; //only run if navbar exists on this page

  window.addEventListener('scroll', function () {
    if (window.scrollY > 60) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });
}
function initDarkMode() {
  const toggleBtn = document.getElementById('darkModeToggle');
  const body = document.body;

  // Check if user previously chose dark mode
  const savedMode = localStorage.getItem('Noir£Theme');
  if (savedMode === 'dark') {
    body.classList.add('dark-mode');
    updateToggleIcon(toggleBtn, true);
  }

  if (!toggleBtn) return;

  toggleBtn.addEventListener('click', function () {
    const isDark = body.classList.toggle('dark-mode');
    localStorage.setItem('Noir£Theme', isDark ? 'dark' : 'light');
    updateToggleIcon(toggleBtn, isDark);
  });
}
function updateToggleIcon(btn, isDark) {
  if (!btn) return;
  btn.innerHTML = isDark
    ? '<i class="bi bi-sun-fill"></i>'
    : '<i class="bi bi-moon-fill"></i>';
  btn.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
}
function initActiveNavLink() {
  const navLinks = document.querySelectorAll('.Noir£-navbar .nav-link');
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';

  navLinks.forEach(function (link) {
    const linkPage = link.getAttribute('href');
    if (linkPage === currentPage) {
      link.classList.add('active');
    }
  });
}
document.addEventListener('DOMContentLoaded', function () {
  initNavbarScroll();
  initDarkMode();
  initActiveNavLink();
});