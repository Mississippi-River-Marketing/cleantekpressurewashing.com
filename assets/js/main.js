// =========================================================
// CLEAN TEK — FINAL main.js
// Path: /assets/js/main.js
// =========================================================

// Reveal-on-scroll (safe, no dependencies)
(() => {
  const els = document.querySelectorAll('[data-animate]');
  if (!els.length || !('IntersectionObserver' in window)) return;

  const io = new IntersectionObserver((entries) => {
    for (const e of entries) {
      if (e.isIntersecting) {
        e.target.classList.add('is-in');
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
})();
