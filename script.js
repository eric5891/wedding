// ============================================
// Wedding Website — JavaScript
// ============================================

(function () {
  'use strict';

  // ---- Countdown Timer ----
  const WEDDING_DATE = new Date('2026-06-21T16:00:00');

  function updateCountdown() {
    const now = new Date();
    const diff = WEDDING_DATE - now;

    if (diff <= 0) {
      document.getElementById('countdown').innerHTML =
        '<p style="font-family: var(--font-serif); font-size: 1.3rem;">Today is the day!</p>';
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    const countdown = document.getElementById('countdown');
    countdown.innerHTML = `
      <div class="countdown-item">
        <span class="countdown-number">${days}</span>
        <span class="countdown-label">Days</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number">${hours}</span>
        <span class="countdown-label">Hours</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number">${minutes}</span>
        <span class="countdown-label">Minutes</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number">${seconds}</span>
        <span class="countdown-label">Seconds</span>
      </div>
    `;
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- Sticky Navigation ----
  const nav = document.getElementById('main-nav');
  const hero = document.querySelector('.hero');

  function handleNavVisibility() {
    const heroBottom = hero.offsetTop + hero.offsetHeight;
    if (window.scrollY > heroBottom - 100) {
      nav.classList.add('visible');
    } else {
      nav.classList.remove('visible');
    }
  }

  window.addEventListener('scroll', handleNavVisibility);

  // ---- Smooth Scroll for Nav Links ----
  document.querySelectorAll('#main-nav a').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        var offset = targetId === '#home' ? 0 : 60;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- Fade-in on Scroll ----
  var fadeElements = document.querySelectorAll(
    '.story-item, .detail-card, .gallery-item, .registry-card, .rsvp-form, .section-title, .section-subtitle'
  );

  fadeElements.forEach(function (el) {
    el.classList.add('fade-in');
  });

  var observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );

  fadeElements.forEach(function (el) {
    observer.observe(el);
  });

  // ---- RSVP Form ----
  var form = document.getElementById('rsvp-form');
  var attendance = document.getElementById('attendance');
  var guestCountGroup = document.getElementById('guest-count-group');
  var dietaryGroup = document.getElementById('dietary-group');

  // Show/hide conditional fields based on attendance
  attendance.addEventListener('change', function () {
    if (this.value === 'no') {
      guestCountGroup.classList.add('hidden');
      dietaryGroup.classList.add('hidden');
    } else {
      guestCountGroup.classList.remove('hidden');
      dietaryGroup.classList.remove('hidden');
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    // Collect form data
    var formData = new FormData(form);
    var data = {};
    formData.forEach(function (value, key) {
      data[key] = value;
    });

    // In a real implementation, you would send this data to a backend service.
    // For now, we store in localStorage and show the success message.
    var rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
    rsvps.push(data);
    localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));

    // Show success message
    form.classList.add('hidden');
    document.getElementById('rsvp-success').classList.remove('hidden');
  });
})();
