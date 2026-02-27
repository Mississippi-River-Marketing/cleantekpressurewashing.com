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

  $$("#phoneLink").forEach(a => { a.textContent = SITE.phoneDisplay; a.href = tel; });
  $$("#ctaCall").forEach(a => a.href = tel);
  $$("#ctaText").forEach(a => a.href = sms);
  $$("#ctaFacebook").forEach(a => a.href = SITE.facebookUrl);
  $$("#ctaGoogleReview").forEach(a => a.href = SITE.googleReviewUrl);
  $$("#ctaFacebookReview").forEach(a => a.href = SITE.facebookReviewUrl);
}

function setActiveNav(){
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  $$(".nav a").forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.classList.add("active");
  });
}

/* ===== Modal for results images ===== */
function ensureModal(){
  let m = $("#imgModal");
  if (m) return m;
  m = document.createElement("div");
  m.id = "imgModal";
  m.className = "modal";
  m.innerHTML = `
    <div class="modal-bg" data-close="1"></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="modal-close" type="button" aria-label="Close" data-close="1">✕</button>
      <img class="modal-img" alt="Preview" />
      <div class="modal-cap"></div>
    </div>
  `;
  document.body.appendChild(m);

  m.addEventListener("click", (e) => { if (e.target?.dataset?.close) closeModal(); });
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") closeModal(); });

  return m;
}

function openModal(src, cap){
  const m = ensureModal();
  $(".modal-img", m).src = src;
  $(".modal-cap", m).textContent = cap || "";
  m.classList.add("open");
  document.documentElement.style.overflow = "hidden";
}
function closeModal(){
  const m = $("#imgModal");
  if (!m) return;
  m.classList.remove("open");
  const img = $(".modal-img", m);
  if (img) img.src = "";
  document.documentElement.style.overflow = "";
}

function wireZoomCards(){
  $$(".zoom[data-src]").forEach(btn => {
    btn.addEventListener("click", () => {
      openModal(btn.dataset.src, btn.dataset.cap || "");
    });
  });
}

(function init(){
  wireLinks();
  setActiveNav();
  wireZoomCards();
})();
