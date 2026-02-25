// Mobile nav toggle (if present)
const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');

if (navToggle && navMenu) {
  navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}

/* =========================
   Gallery Lightbox (FIXED)
   ========================= */

document.querySelectorAll('[data-lightbox]').forEach(item => {
  item.addEventListener('click', () => {
    const src = item.getAttribute('data-src');
    const caption = item.getAttribute('data-cap') || '';

    const overlay = document.createElement('div');
    overlay.style.position = 'fixed';
    overlay.style.top = '0';
    overlay.style.left = '0';
    overlay.style.width = '100%';
    overlay.style.height = '100%';
    overlay.style.background = 'rgba(0,0,0,0.85)';
    overlay.style.display = 'flex';
    overlay.style.alignItems = 'center';
    overlay.style.justifyContent = 'center';
    overlay.style.zIndex = '9999';

    overlay.innerHTML = `
      <div style="max-width:90%; max-height:90%; text-align:center;">
        <img src="${src}" style="max-width:100%; max-height:80vh; border-radius:14px;">
        <p style="color:#fff; margin-top:14px; font-size:16px;">${caption}</p>
        <button style="margin-top:12px; padding:10px 16px; border-radius:10px; border:none; cursor:pointer; font-size:14px;">
          Close
        </button>
      </div>
    `;

    overlay.querySelector('button').onclick = () => overlay.remove();
    overlay.onclick = e => { if (e.target === overlay) overlay.remove(); };

    document.body.appendChild(overlay);
  });
});
