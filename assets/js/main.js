// Clean Tek Pressure Washing — one-page build
// Call-first CTAs + review links + before/after sliders + map section

const SITE = {
  businessName: "Clean Tek Pressure Washing",

  // From your GBP screenshot:
  phoneDisplay: "(573) 837-8474",
  phoneDial: "+15738378474",

  // If you want to change email, edit here:
  email: "mississippirivermarketing@gmail.com",

  // Links you provided:
  facebookUrl: "https://www.facebook.com/profile.php?id=61560833633529",
  googleReviewUrl: "https://g.page/r/CajpuIdY8dT8EAE/review",

  // Facebook review tab (works for many pages):
  facebookReviewUrl: "https://www.facebook.com/profile.php?id=61560833633529&sk=reviews",

  // Before/After pairs (NO repeats) — best mix for conversions
  pairs: [
    {
      title: "Driveway Cleaning",
      note: "Garage approach • heavy buildup removed",
      before: "assets/img/driveway-garage-before-after.png",
      after:  "assets/img/driveway-garage-before-after.png",
      // NOTE: this file is already a combined before/after.
      // We will treat it as a single image and use a “tap to zoom” style fallback.
      combined: true
    },
    {
      title: "Brick Steps Restoration",
      note: "Brightened brick • deep grime removed",
      before: "assets/img/brick-steps-before-after.png",
      after:  "assets/img/brick-steps-before-after.png",
      combined: true
    },
    {
      title: "Curved Driveway",
      note: "Full surface cleanup • crisp finish",
      before: "assets/img/curved-driveway-before-after.png",
      after:  "assets/img/curved-driveway-before-after.png",
      combined: true
    },
    {
      title: "Vinyl Siding Soft Wash",
      note: "Safer method for siding • algae removed",
      before: "assets/img/vinyl-siding-softwash-before-after.png",
      after:  "assets/img/vinyl-siding-softwash-before-after.png",
      combined: true
    },
    {
      title: "Walkway Cleanup",
      note: "Safer footing • looks brand new",
      before: "assets/img/walkway-before-after.png",
      after:  "assets/img/walkway-before-after.png",
      combined: true
    },
    {
      title: "Aggregate / Exposed Concrete",
      note: "Texture restored • grime removed",
      before: "assets/img/aggregate-concrete-before-after.png",
      after:  "assets/img/aggregate-concrete-before-after.png",
      combined: true
    },
    {
      title: "Deck Wash",
      note: "Organic buildup removed",
      before: "assets/img/deck-before-after.png",
      after:  "assets/img/deck-before-after.png",
      combined: true
    },
    {
      title: "Sidewalk Results",
      note: "Clean lines • big difference",
      before: "assets/img/sidewalk-before-after.png",
      after:  "assets/img/sidewalk-before-after.png",
      combined: true
    }
  ]
};

const $ = (sel, root=document) => root.querySelector(sel);

function setLinks(){
  const tel = `tel:${SITE.phoneDial}`;
  const sms = `sms:${SITE.phoneDial}`;
  const mail = `mailto:${SITE.email}`;

  // Top
  $("#ctaCallTop").href = tel;
  $("#ctaTextTop").href = sms;

  // Hero
  $("#ctaCallHero").href = tel;
  $("#ctaTextHero").href = sms;
  $("#ctaFacebookHero").href = SITE.facebookUrl;

  // Strip
  $("#ctaCallStrip").href = tel;
  $("#ctaTextStrip").href = sms;
  $("#ctaFacebookStrip").href = SITE.facebookUrl;

  // Reviews
  $("#ctaGoogleReview").href = SITE.googleReviewUrl;
  $("#ctaFacebookReview").href = SITE.facebookReviewUrl;

  // Map CTA
  $("#ctaCallMap").href = tel;
  $("#ctaTextMap").href = sms;

  // Final CTA
  $("#ctaCallFinal").href = tel;
  $("#ctaFacebookFinal").href = SITE.facebookUrl;

  // Inline contact
  $("#phoneInline").textContent = SITE.phoneDisplay;
  $("#phoneInline").href = tel;

  $("#emailInline").textContent = SITE.email;
  $("#emailInline").href = mail;

  // Map contact box
  $("#phoneBox").textContent = SITE.phoneDisplay;
  $("#phoneBox").href = tel;

  $("#emailBox").textContent = SITE.email;
  $("#emailBox").href = mail;

  $("#fbBox").href = SITE.facebookUrl;

  // Footer
  $("#footCall").href = tel;
  $("#footText").href = sms;
  $("#footEmail").href = mail;
  $("#footFacebook").href = SITE.facebookUrl;
}

// Because your before/after images are already combined side-by-side images,
// the best UX is a clean “zoom modal” instead of a fake slider.
// This stays fast, looks great on mobile, and avoids “repetitive” images.

function escapeHtml(str){
  return String(str ?? "")
    .replaceAll("&","&amp;")
    .replaceAll("<","&lt;")
    .replaceAll(">","&gt;")
    .replaceAll('"',"&quot;")
    .replaceAll("'","&#039;");
}

function makePairCard(pair, idx){
  const card = document.createElement("article");
  card.className = "pair";

  const imgSrc = pair.before; // same for combined
  card.innerHTML = `
    <div class="pair-head">
      <div>
        <div class="pair-title">${escapeHtml(pair.title || `Before & After ${idx+1}`)}</div>
        <div class="pair-sub">${escapeHtml(pair.note || "Tap to view")}</div>
      </div>
    </div>

    <button class="combo" type="button" aria-label="Open before and after image: ${escapeHtml(pair.title || "")}">
      <img src="${imgSrc}" alt="${escapeHtml(pair.title || "Before and after")}" loading="lazy" />
      <span class="combo-hint">Tap to zoom</span>
    </button>
  `;

  return card;
}

function ensureModal(){
  let modal = document.getElementById("imgModal");
  if (modal) return modal;

  modal = document.createElement("div");
  modal.id = "imgModal";
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-backdrop" data-close="1"></div>
    <div class="modal-panel" role="dialog" aria-modal="true" aria-label="Image preview">
      <button class="modal-close" type="button" aria-label="Close" data-close="1">✕</button>
      <img class="modal-img" src="" alt="Preview" />
      <div class="modal-caption"></div>
    </div>
  `;
  document.body.appendChild(modal);

  modal.addEventListener("click", (e) => {
    if (e.target?.dataset?.close) closeModal();
  });

  window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeModal();
  });

  return modal;
}

function openModal(src, caption){
  const modal = ensureModal();
  const img = modal.querySelector(".modal-img");
  const cap = modal.querySelector(".modal-caption");
  img.src = src;
  cap.textContent = caption || "";
  modal.classList.add("open");
  document.documentElement.style.overflow = "hidden";
}

function closeModal(){
  const modal = document.getElementById("imgModal");
  if (!modal) return;
  modal.classList.remove("open");
  document.documentElement.style.overflow = "";
  const img = modal.querySelector(".modal-img");
  if (img) img.src = "";
}

function renderPairs(){
  const grid = $("#pairsGrid");
  grid.innerHTML = "";

  (SITE.pairs || []).forEach((pair, idx) => {
    const card = makePairCard(pair, idx);
    grid.appendChild(card);

    const btn = card.querySelector(".combo");
    const src = pair.before;
    const caption = `${pair.title || "Before & After"} — ${pair.note || ""}`.trim();

    btn.addEventListener("click", () => openModal(src, caption));
  });
}

// Add modal CSS via JS to avoid another file (keeps repo simple)
function injectModalStyles(){
  const style = document.createElement("style");
  style.textContent = `
    .combo{
      position: relative;
      display:block;
      width: calc(100% - 24px);
      margin: 12px;
      padding: 0;
      border: 1px solid rgba(245,248,255,.12);
      border-radius: 16px;
      background: rgba(255,255,255,.03);
      overflow:hidden;
      cursor: zoom-in;
    }
    .combo img{
      width:100%;
      height: 300px;
      object-fit: cover;
      display:block;
    }
    .combo-hint{
      position:absolute;
      left: 12px;
      bottom: 12px;
      padding: 7px 10px;
      border-radius: 999px;
      background: rgba(7,20,35,.70);
      border: 1px solid rgba(255,255,255,.16);
      color: rgba(245,248,255,.92);
      font-weight: 850;
      font-size: 12.5px;
      backdrop-filter: blur(8px);
    }

    .modal{ position: fixed; inset:0; display:none; z-index: 999; }
    .modal.open{ display:block; }
    .modal-backdrop{ position:absolute; inset:0; background: rgba(0,0,0,.72); }
    .modal-panel{
      position:absolute;
      left:50%; top:50%;
      transform: translate(-50%,-50%);
      width: min(980px, 92vw);
      max-height: 90vh;
      background: rgba(11,27,43,.96);
      border: 1px solid rgba(245,248,255,.14);
      border-radius: 18px;
      box-shadow: 0 30px 90px rgba(0,0,0,.55);
      overflow:hidden;
    }
    .modal-close{
      position:absolute;
      top: 10px; right: 10px;
      width: 42px; height: 42px;
      border-radius: 999px;
      border: 1px solid rgba(245,248,255,.16);
      background: rgba(255,255,255,.06);
      color: rgba(245,248,255,.9);
      font-size: 18px;
      cursor:pointer;
    }
    .modal-img{
      width: 100%;
      height: min(74vh, 720px);
      object-fit: contain;
      background: rgba(0,0,0,.25);
      display:block;
    }
    .modal-caption{
      padding: 12px 14px;
      color: rgba(245,248,255,.82);
      border-top: 1px solid rgba(245,248,255,.12);
      font-weight: 700;
      font-size: 14px;
    }

    @media (max-width: 960px){
      .combo img{ height: 260px; }
      .modal-img{ height: 70vh; }
    }
  `;
  document.head.appendChild(style);
}

(function init(){
  injectModalStyles();
  setLinks();
  renderPairs();
})();
