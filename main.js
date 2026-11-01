(function () {
  'use strict';

  // Footer year
  var year = document.getElementById('year');
  if (year) year.textContent = new Date().getFullYear();

  // Neutral placeholder if a project screenshot is missing
  document.querySelectorAll('.shot img').forEach(function (img) {
    function missing() {
      img.hidden = true;
      img.parentElement.setAttribute('data-missing', '');
    }
    img.addEventListener('error', missing);
    // The error may already have fired before this deferred script ran.
    if (img.complete && img.naturalWidth === 0 && img.getAttribute('src')) missing();
  });

  // One gentle reveal on scroll (CSS only hides these when motion is allowed)
  var items = document.querySelectorAll('.reveal');
  if (!('IntersectionObserver' in window)) {
    items.forEach(function (el) { el.classList.add('in'); });
    return;
  }
  var io = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        io.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -5% 0px' });
  items.forEach(function (el) { io.observe(el); });
})();