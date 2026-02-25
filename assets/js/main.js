// Mobile menu
const toggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector("[data-nav]");

if (toggle && navLinks) {
  toggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });
}

// Gallery filtering
const filterButtons = document.querySelectorAll("[data-filter]");
const gallery = document.querySelector("[data-gallery]");

if (filterButtons.length && gallery) {
  filterButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const f = btn.getAttribute("data-filter");

      filterButtons.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      gallery.querySelectorAll(".thumb").forEach((item) => {
        const cat = item.getAttribute("data-cat");
        const show = f === "all" || cat === f;
        item.style.display = show ? "" : "none";
      });
    });
  });
}

// Accessible Lightbox
(function () {
  const items = document.querySelectorAll("[data-lightbox]");
  if (!items.length) return;

  function openLightbox(src, cap) {
    const overlay = document.createElement("div");
    overlay.className = "lb-overlay";
    overlay.setAttribute("role", "dialog");
    overlay.setAttribute("aria-modal", "true");
    overlay.setAttribute("aria-label", "Expanded image");

    overlay.innerHTML = `
      <div class="lb-panel">
        <button class="lb-close" type="button" aria-label="Close">Close</button>
        <img class="lb-img" src="${src}" alt="${cap ? cap : "Expanded gallery image"}" />
        ${cap ? `<p class="lb-cap">${cap}</p>` : ""}
      </div>
    `;

    const closeBtn = overlay.querySelector(".lb-close");
    const panel = overlay.querySelector(".lb-panel");

    function close() {
      overlay.remove();
      document.removeEventListener("keydown", onKey);
    }

    function onKey(e) {
      if (e.key === "Escape") close();
    }

    overlay.addEventListener("click", (e) => {
      if (e.target === overlay) close();
    });

    closeBtn.addEventListener("click", close);
    document.addEventListener("keydown", onKey);

    document.body.appendChild(overlay);
    // focus close button for accessibility
    closeBtn.focus();

    // prevent scroll behind modal
    document.body.style.overflow = "hidden";
    overlay.addEventListener("remove", () => {
      document.body.style.overflow = "";
    });

    // ensure panel click doesn't close
    panel.addEventListener("click", (e) => e.stopPropagation());
  }

  items.forEach((item) => {
    item.addEventListener("click", () => {
      const src = item.getAttribute("data-src");
      const cap = item.getAttribute("data-cap") || "";
      if (!src) return;
      openLightbox(src, cap);
    });
  });
})();

// Lightbox styling injected (keeps CSS file cleaner)
(function () {
  const css = `
  .lb-overlay{
    position:fixed;inset:0;background:rgba(2,8,23,.82);
    display:flex;align-items:center;justify-content:center;
    z-index:9999;padding:18px;
  }
  .lb-panel{
    width:min(980px, 100%);
    background:#fff;border-radius:18px;
    padding:14px;border:1px solid rgba(226,232,240,1);
    box-shadow:0 18px 60px rgba(0,0,0,.35);
  }
  .lb-close{
    display:inline-flex;align-items:center;justify-content:center;
    padding:10px 14px;border-radius:999px;
    border:1px solid rgba(226,232,240,1);
    background:#fff;font-weight:900;cursor:pointer;
    float:right;
  }
  .lb-img{width:100%;height:auto;border-radius:14px;margin-top:10px}
  .lb-cap{margin:10px 2px 0;color:#334155;font-weight:800}
  `;
  const style = document.createElement("style");
  style.textContent = css;
  document.head.appendChild(style);
})();
