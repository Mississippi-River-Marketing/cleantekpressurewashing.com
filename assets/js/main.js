// ===== Gallery: Filter + Lightbox (NO browse/upload) =====
(() => {
  const grid = document.getElementById('galleryGrid');
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const filterButtons = document.querySelectorAll('.filter-btn');

  if (!grid || !lightbox || !lightboxImg) return;

  // Filtering
  function setActiveFilterButton(activeBtn) {
    filterButtons.forEach(btn => btn.classList.remove('is-active'));
    activeBtn.classList.add('is-active');
  }

  function filterGallery(category) {
    const items = grid.querySelectorAll('.gallery-item');
    items.forEach(item => {
      const itemCat = item.getAttribute('data-category');
      const show = category === 'all' || itemCat === category;
      item.classList.toggle('is-hidden', !show);
    });
  }

  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const category = btn.getAttribute('data-filter') || 'all';
      setActiveFilterButton(btn);
      filterGallery(category);
    });
  });

  // Lightbox open
  grid.addEventListener('click', (e) => {
    const btn = e.target.closest('.gallery-card');
    if (!btn) return;

    const full = btn.getAttribute('data-full');
    const img = btn.querySelector('img');

    if (!full) return;

    lightboxImg.src = full;
    lightboxImg.alt = img?.alt || 'Gallery image';
    lightbox.classList.add('is-open');
    lightbox.setAttribute('aria-hidden', 'false');

    // prevent page scroll behind modal
    document.documentElement.style.overflow = 'hidden';
  });

  // Close lightbox
  function closeLightbox() {
    lightbox.classList.remove('is-open');
    lightbox.setAttribute('aria-hidden', 'true');
    lightboxImg.src = '';
    document.documentElement.style.overflow = '';
  }

  lightbox.addEventListener('click', (e) => {
    const close = e.target.closest('[data-close="true"]');
    if (close) closeLightbox();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && lightbox.classList.contains('is-open')) {
      closeLightbox();
    }
  });
})();
