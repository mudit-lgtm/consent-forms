/* main.js — Non-critical progressive enhancement */

// ---- FAQ Accordion ----
document.addEventListener('DOMContentLoaded', function () {
  // FAQ toggle
  document.querySelectorAll('.faq-question').forEach(function (btn) {
    btn.addEventListener('click', function () {
      var item = btn.closest('.faq-item');
      var isOpen = item.classList.contains('open');
      // Close all
      document.querySelectorAll('.faq-item.open').forEach(function (el) {
        el.classList.remove('open');
      });
      // Open clicked if was closed
      if (!isOpen) item.classList.add('open');
    });
  });

  // Mobile nav toggle
  var toggle = document.querySelector('.nav-toggle');
  var navLinks = document.querySelector('.nav-links');
  if (toggle && navLinks) {
    toggle.addEventListener('click', function () {
      navLinks.classList.toggle('open');
    });
  }

  // Mobile dropdown toggle
  document.querySelectorAll('.dropdown > a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      if (window.innerWidth <= 768) {
        e.preventDefault();
        var dropdown = link.closest('.dropdown');
        dropdown.classList.toggle('open');
      }
    });
  });

  // Copy template text
  var copyBtns = document.querySelectorAll('.btn-copy');
  copyBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
      var targetId = btn.getAttribute('data-target');
      var target = document.getElementById(targetId);
      if (target) {
        var text = target.innerText || target.textContent;
        navigator.clipboard.writeText(text).then(function () {
          var orig = btn.textContent;
          btn.textContent = 'Copied!';
          setTimeout(function () { btn.textContent = orig; }, 2000);
        });
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(function (anchor) {
    anchor.addEventListener('click', function (e) {
      var target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        var offset = 80;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // Download tracking (optional analytics hook)
  document.querySelectorAll('a[download], .btn-download').forEach(function (el) {
    el.addEventListener('click', function () {
      if (typeof gtag !== 'undefined') {
        gtag('event', 'download', {
          event_category: 'Template',
          event_label: el.href || el.getAttribute('href') || 'unknown'
        });
      }
    });
  });
});
