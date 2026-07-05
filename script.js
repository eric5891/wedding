// ============================================
// Polina & Eric Wedding — Shared JavaScript
// ============================================

(function () {
  'use strict';

  // ---- Fade-in on Scroll ----
  var fadeElements = document.querySelectorAll(
    '.ornate-frame-wrap, .script-heading, .hero-content'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  // Trigger immediately for elements already in view
  setTimeout(function () {
    fadeElements.forEach(function (el) {
      var rect = el.getBoundingClientRect();
      if (rect.top < window.innerHeight) {
        el.classList.add('visible');
      }
    });
  }, 100);

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // ---- Menu Form (Formspree) ----
  var menuForm = document.getElementById('menu-form');

  if (menuForm) {
    menuForm.addEventListener('submit', function (e) {
      e.preventDefault();

      var errorNote = document.getElementById('menu-form-error');
      var submitBtn = menuForm.querySelector('button[type="submit"]');
      errorNote.classList.add('hidden');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending…';

      fetch(menuForm.action, {
        method: 'POST',
        body: new FormData(menuForm),
        headers: { 'Accept': 'application/json' }
      })
        .then(function (response) {
          if (response.ok) {
            menuForm.classList.add('hidden');
            document.getElementById('menu-success').classList.remove('hidden');
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(function () {
          errorNote.classList.remove('hidden');
          submitBtn.disabled = false;
          submitBtn.textContent = 'Submit Selections';
        });
    });
  }
})();
