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

  // ---- RSVP Form ----
  var form = document.getElementById('rsvp-form');
  var attendance = document.getElementById('attendance');
  var guestCountGroup = document.getElementById('guest-count-group');
  var dietaryGroup = document.getElementById('dietary-group');

  if (attendance) {
    attendance.addEventListener('change', function () {
      if (this.value === 'no') {
        if (guestCountGroup) guestCountGroup.classList.add('hidden');
        if (dietaryGroup) dietaryGroup.classList.add('hidden');
      } else {
        if (guestCountGroup) guestCountGroup.classList.remove('hidden');
        if (dietaryGroup) dietaryGroup.classList.remove('hidden');
      }
    });
  }

  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();

      var formData = new FormData(form);
      var data = {};
      formData.forEach(function (value, key) {
        data[key] = value;
      });

      // Store in localStorage (connect to a backend service for production)
      var rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      rsvps.push(data);
      localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));

      form.classList.add('hidden');
      document.getElementById('rsvp-success').classList.remove('hidden');
    });
  }
})();
