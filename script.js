// ============================================
// Wedding Website — JavaScript
// ============================================

(function () {
  'use strict';

  // ---- Countdown Timer ----
  var WEDDING_DATE = new Date('2026-08-08T19:00:00');

  function updateCountdown() {
    var now = new Date();
    var diff = WEDDING_DATE - now;
    var el = document.getElementById('countdown');
    if (!el) return;

    if (diff <= 0) {
      el.innerHTML = '<p style="font-family: var(--font-script); font-size: 2rem; color: var(--color-terracotta);">Today is the day!</p>';
      return;
    }

    var days = Math.floor(diff / (1000 * 60 * 60 * 24));
    var hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    var minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    var seconds = Math.floor((diff % (1000 * 60)) / 1000);

    el.innerHTML =
      '<div class="countdown-item"><span class="countdown-number">' + days + '</span><span class="countdown-label">Days</span></div>' +
      '<div class="countdown-item"><span class="countdown-number">' + hours + '</span><span class="countdown-label">Hours</span></div>' +
      '<div class="countdown-item"><span class="countdown-number">' + minutes + '</span><span class="countdown-label">Minutes</span></div>' +
      '<div class="countdown-item"><span class="countdown-number">' + seconds + '</span><span class="countdown-label">Seconds</span></div>';
  }

  updateCountdown();
  setInterval(updateCountdown, 1000);

  // ---- Active Nav Highlighting on Scroll ----
  var navLinks = document.querySelectorAll('.nav-link');
  var sections = document.querySelectorAll('.page-section');

  function updateActiveNav() {
    var scrollPos = window.scrollY + 100;

    sections.forEach(function (section) {
      var top = section.offsetTop;
      var bottom = top + section.offsetHeight;
      var id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(function (link) {
          link.classList.remove('active');
          if (link.getAttribute('data-section') === id) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNav);

  // ---- Smooth Scroll for Nav Links ----
  navLinks.forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      var targetId = this.getAttribute('href');
      var target = document.querySelector(targetId);
      if (target) {
        var offset = 50;
        var top = target.getBoundingClientRect().top + window.pageYOffset - offset;
        window.scrollTo({ top: top, behavior: 'smooth' });
      }
    });
  });

  // ---- Fade-in on Scroll ----
  var fadeElements = document.querySelectorAll(
    '.ornate-frame, .illustration-band, .script-heading, .event-block, .travel-block, .registry-item, .faq-item, .rsvp-form'
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
    { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
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
        guestCountGroup.classList.add('hidden');
        dietaryGroup.classList.add('hidden');
      } else {
        guestCountGroup.classList.remove('hidden');
        dietaryGroup.classList.remove('hidden');
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

      var rsvps = JSON.parse(localStorage.getItem('wedding_rsvps') || '[]');
      rsvps.push(data);
      localStorage.setItem('wedding_rsvps', JSON.stringify(rsvps));

      form.classList.add('hidden');
      document.getElementById('rsvp-success').classList.remove('hidden');
    });
  }
})();
