(function () {
  const current = (document.body.getAttribute("data-page") || "").trim();
  document.querySelectorAll("[data-nav]").forEach(a => {
    if (a.getAttribute("data-nav") === current) a.classList.add("active");
  });

  // Simple lightbox for gallery
  const modal = document.getElementById("lightbox");
  if (!modal) return;

  const modalImg = modal.querySelector("img");
  const modalCap = modal.querySelector("[data-cap]");
  const closeBtn = modal.querySelector("[data-close]");

  function openLightbox(src, cap) {
    modalImg.src = src;
    modalCap.textContent = cap || "";
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeLightbox() {
    modal.setAttribute("aria-hidden", "true");
    modalImg.src = "";
    document.body.style.overflow = "";
  }

  document.querySelectorAll("[data-lightbox]").forEach(btn => {
    btn.addEventListener("click", () => {
      const src = btn.getAttribute("data-src");
      const cap = btn.getAttribute("data-cap");
      openLightbox(src, cap);
    });
  });

  closeBtn && closeBtn.addEventListener("click", closeLightbox);
  modal.addEventListener("click", (e) => {
    if (e.target === modal) closeLightbox();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeLightbox();
  });
})();