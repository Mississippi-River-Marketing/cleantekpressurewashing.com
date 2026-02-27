const SITE = {
  phoneDisplay: "(573) 837-8474",
  phoneDial: "+15738378474",
  facebookUrl: "https://www.facebook.com/profile.php?id=61560833633529",
  googleReviewUrl: "https://g.page/r/CajpuIdY8dT8EAE/review",
  facebookReviewUrl: "https://www.facebook.com/profile.php?id=61560833633529&sk=reviews"
};

const $ = (s, r=document) => r.querySelector(s);
const $$ = (s, r=document) => Array.from(r.querySelectorAll(s));

function wireLinks(){
  const tel = `tel:${SITE.phoneDial}`;
  const sms = `sms:${SITE.phoneDial}`;

  const set = (id, href) => { const el = document.getElementById(id); if (el) el.href = href; };

  // phone inline
  const phoneInline = $("#phoneInline");
  if (phoneInline){ phoneInline.textContent = SITE.phoneDisplay; phoneInline.href = tel; }

  // Call/Text everywhere by id (many share same ids on purpose)
  $$("#ctaCallTop, #ctaCallHero, #ctaCallResults, #ctaCallProcess, #ctaCallArea, #ctaCallBottom, #ctaCallFooter, #ctaCallFloat, #ctaCallMobile").forEach(a => a && (a.href = tel));
  $$("#ctaTextTop, #ctaTextHero, #ctaTextResults, #ctaTextProcess, #ctaTextArea, #ctaTextBottom, #ctaTextFooter, #ctaTextFloat, #ctaTextMobile").forEach(a => a && (a.href = sms));

  // Facebook
  $$("#ctaFbHero, #ctaFbProcess, #ctaFbBottom, #ctaFbFooter, #ctaFbFloat, #ctaFbMobile").forEach(a => a && (a.href = SITE.facebookUrl));

  // Reviews
  set("ctaGoogleReviewHero", SITE.googleReviewUrl);
  set("ctaFacebookReviewHero", SITE.facebookReviewUrl);
  set("ctaGoogleReviewFooter", SITE.googleReviewUrl);
  set("ctaFacebookReviewFooter", SITE.facebookReviewUrl);
}

function revealOnScroll(){
  const els = $$(".reveal");
  const io = new IntersectionObserver((entries) => {
    for (const e of entries){
      if (e.isIntersecting){
        e.target.classList.add("in");
        io.unobserve(e.target);
      }
    }
  }, { threshold: 0.12 });

  els.forEach(el => io.observe(el));
}

function parallax(){
  const items = $$("[data-parallax]");
  if (!items.length) return;

  const onScroll = () => {
    const y = window.scrollY || 0;
    items.forEach(el => {
      const speed = parseFloat(el.dataset.parallax || "0.15");
      el.style.transform = `translate3d(0, ${y * speed}px, 0)`;
    });
  };

  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
}

/* ===== Modal zoom ===== */
function ensureModal(){
  let m = $(".modal");
  if (m) return m;

  m = document.createElement("div");
  m.className = "modal";
  m.innerHTML = `
    <div class="modal__bg" data-close="1"></div>
    <div class="modal__panel" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="modal__close" type="button" aria-label="Close" data-close="1">✕</button>
      <img class="modal__img" alt="Preview" />
      <div class="modal__cap"></div>
    </div>
  `;
  document.body.appendChild(m);

  m.addEventListener("click", (e) => {
    if (e.target?.dataset?.close) closeModal();
  });
  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  return m;
}

function openModal(src, cap){
  const m = ensureModal();
  $(".modal__img", m).src = src;
  $(".modal__cap", m).textContent = cap || "";
  m.classList.add("open");
  document.documentElement.style.overflow = "hidden";
}
function closeModal(){
  const m = $(".modal");
  if (!m) return;
  m.classList.remove("open");
  const img = $(".modal__img", m);
  if (img) img.src = "";
  document.documentElement.style.overflow = "";
}

function wireZoom(){
  $$(".zoomTile[data-src]").forEach(btn => {
    btn.addEventListener("click", () => openModal(btn.dataset.src, btn.dataset.cap || ""));
  });
}

(function init(){
  wireLinks();
  revealOnScroll();
  parallax();
  wireZoom();
})();
