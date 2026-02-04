/* ============================================
   FazEncarte.com - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', function () {

  // ---------- AOS Init ----------
  AOS.init({
    duration: 700,
    easing: 'ease-out-cubic',
    once: true,
    offset: 60
  });

  // ---------- Navbar scroll effect ----------
  const navbar = document.querySelector('.navbar');

  function handleNavbarScroll() {
    if (window.scrollY > 20) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleNavbarScroll, { passive: true });
  handleNavbarScroll();

  // ---------- Smooth scroll for nav links ----------
  document.querySelectorAll('a[href^="#"]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      var targetId = this.getAttribute('href');
      if (targetId === '#') return;

      var target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();

      // Close mobile menu if open
      var navCollapse = document.querySelector('.navbar-collapse');
      if (navCollapse && navCollapse.classList.contains('show')) {
        bootstrap.Collapse.getInstance(navCollapse).hide();
      }

      target.scrollIntoView({ behavior: 'smooth' });
    });
  });

  // ---------- Counter animation for hero stats ----------
  var statsAnimated = false;

  function animateCounters() {
    if (statsAnimated) return;

    var statNumbers = document.querySelectorAll('.stat-number');
    if (!statNumbers.length) return;

    var heroSection = document.getElementById('hero');
    if (!heroSection) return;

    var rect = heroSection.getBoundingClientRect();
    if (rect.top > window.innerHeight || rect.bottom < 0) return;

    statsAnimated = true;

    statNumbers.forEach(function (el) {
      var text = el.textContent.trim();
      var suffix = '';
      var target = 0;

      if (text.includes('+')) {
        suffix = '+';
        target = parseInt(text.replace('+', '').replace(/\D/g, ''));
      } else if (text.includes('min')) {
        suffix = 'min';
        target = parseInt(text.replace('min', ''));
      } else {
        target = parseInt(text.replace(/\D/g, '')) || 0;
      }

      if (target === 0) return;

      var duration = 1500;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);

        // Ease out cubic
        var eased = 1 - Math.pow(1 - progress, 3);
        var current = Math.floor(eased * target);

        el.textContent = current + suffix;

        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target + suffix;
        }
      }

      requestAnimationFrame(step);
    });
  }

  window.addEventListener('scroll', animateCounters, { passive: true });
  animateCounters(); // Try on load too

  // ---------- Active nav link on scroll ----------
  var sections = document.querySelectorAll('section[id]');
  var navLinks = document.querySelectorAll('.navbar .nav-link');

  function highlightNav() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var height = section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('href') === '#' + id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', highlightNav, { passive: true });
  highlightNav();

});
