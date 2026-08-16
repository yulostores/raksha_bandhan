const products = [
  {
    id: "kundan",
    category: "Traditional",
    name: "Noor Kundan Rakhi",
    note: "A graceful festive design with Kundan work and pearl-inspired details.",
    image: "assets/rakhi-kundan.webp",
    alt: "Traditional red and gold Kundan rakhi with pearl details"
  },
  {
    id: "kids-lion",
    category: "Kids' favourite",
    name: "Sheru Kids Rakhi",
    note: "A playful, colourful choice made to bring a big smile to little brothers.",
    image: "assets/rakhi-kids.webp",
    alt: "Colourful kids rakhi with a cheerful lion motif"
  },
  {
    id: "rudraksha",
    category: "Sacred",
    name: "Panch Rudraksha Rakhi",
    note: "A simple, sacred style with Rudraksha beads and a deep maroon thread.",
    image: "assets/rakhi-rudraksha.webp",
    alt: "Maroon rakhi with five Rudraksha beads"
  },
  {
    id: "premium-combo",
    category: "Gift combo",
    name: "Sampoorna Rakhi Box",
    note: "A thoughtful festive combo for when you want to gift something extra special.",
    image: "assets/rakhi-combo.webp",
    alt: "Premium rakhi gift combo with two rakhis, roli chawal and sweets"
  }
];

const categories = [
  { name: "Traditional Rakhis", note: "Timeless artistry", image: "assets/rakhi-kundan.webp", productId: "kundan" },
  { name: "Kids’ Rakhis", note: "Big little smiles", image: "assets/rakhi-kids.webp", productId: "kids-lion" },
  { name: "Rudraksha Rakhis", note: "Blessings, always", image: "assets/rakhi-rudraksha.webp", productId: "rudraksha" },
  { name: "Premium Combos", note: "A complete shagun", image: "assets/rakhi-combo.webp", productId: "premium-combo" }
];

const trustPoints = [
  { icon: "✦", title: "Festive variety", text: "Styles for every bond" },
  { icon: "%", title: "Festive offers", text: "Save up to 30%" },
  { icon: "⌖", title: "Easy to find", text: "Near Ujjivan Bank" },
  { icon: "☎", title: "Call before visiting", text: "87890 87326" }
];

const reviews = [
  {
    icon: "◉",
    title: "See every detail",
    text: "Compare colours, threads and finishes up close before choosing the rakhi that feels right."
  },
  {
    icon: "✦",
    title: "Something for everyone",
    text: "Explore traditional, kids’, Rudraksha and premium combo options together in one place."
  },
  {
    icon: "☎",
    title: "Help is one call away",
    text: "Call us before you leave to ask about the collection, location or current availability."
  }
];

const faqs = [
  ["Where is Keshri Gift?", "We are at Mahesh Soni Chowk, near Ujjivan Bank, Hazaribag, Jharkhand. Tap “Get directions” anywhere on this page to open Google Maps."],
  ["What Raksha Bandhan offers are available?", "Choose either Buy 2 and Get 1 Free or save up to 30% on selected rakhis. Only one offer applies per eligible purchase; the offers cannot be combined or clubbed. Available in store while stocks last."],
  ["Can I call before visiting?", "Yes. Call us directly at 87890 87326 to ask about the current Rakhi collection or get help finding the store."],
  ["What kinds of rakhis are available?", "Our festive collection includes traditional, kids’, Rudraksha and premium combo styles. Designs and availability may vary in store."],
  ["Do you have rakhis for kids?", "Yes, kids’ rakhis are part of our Raksha Bandhan collection. Call us to check the latest available designs."],
  ["Can I find premium gift combos?", "Yes, premium Rakhi combo options are available as part of the festive collection, subject to current stock."],
  ["How can I get directions?", "Use the Google Maps button on this page. It will guide you to Keshri Gift at Mahesh Soni Chowk near Ujjivan Bank." ]
];

const icons = {
  arrow: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M3 10h13M11 5l5 5-5 5" /></svg>',
  plus: '<svg viewBox="0 0 20 20" aria-hidden="true"><path d="M10 4v12M4 10h12" /></svg>'
};

function renderCategories() {
  const grid = document.querySelector("#category-grid");
  grid.innerHTML = categories.map((category, index) => `
    <button class="category-card reveal" type="button" data-product="${category.productId}" aria-label="View ${category.name}">
      <img src="${category.image}" alt="" width="900" height="900" loading="lazy" decoding="async" />
      <span class="category-index">0${index + 1}</span>
      <span class="category-copy"><small>${category.note}</small><strong>${category.name}</strong></span>
      <span class="category-arrow">${icons.arrow}</span>
    </button>
  `).join("");
}

function renderProducts() {
  const grid = document.querySelector("#product-grid");

  grid.innerHTML = products.map((product, index) => `
    <article class="product-card reveal" id="product-${product.id}">
      <div class="product-image">
        <img src="${product.image}" alt="${product.alt}" width="900" height="900" decoding="async" ${index === 0 ? "" : 'loading="lazy"'} />
        <span class="discount-badge">Festive offers</span>
      </div>
      <div class="product-details">
        <div class="product-meta"><span>${product.category}</span><span>At Keshri Gift</span></div>
        <h3>${product.name}</h3>
        <p class="product-note">${product.note}</p>
        <a class="button product-buy call-link" href="tel:+918789087326" data-enquire="${product.id}">Call to enquire <span aria-hidden="true">☎</span></a>
      </div>
    </article>
  `).join("");
}

function renderTrustPoints() {
  document.querySelector("#trust-grid").innerHTML = trustPoints.map((point) => `
    <div class="trust-point">
      <span class="trust-icon" aria-hidden="true">${point.icon}</span>
      <p><strong>${point.title}</strong><small>${point.text}</small></p>
    </div>
  `).join("");
}

function renderReviews() {
  document.querySelector("#review-grid").innerHTML = reviews.map((review) => `
    <article class="review-card benefit-card reveal">
      <span class="benefit-icon" aria-hidden="true">${review.icon}</span>
      <h3>${review.title}</h3>
      <p>${review.text}</p>
    </article>
  `).join("");
}

function renderFaqs() {
  document.querySelector("#faq-list").innerHTML = faqs.map(([question, answer], index) => `
    <details class="faq-item reveal" ${index === 0 ? "open" : ""}>
      <summary><span>${question}</span><b aria-hidden="true">${icons.plus}</b></summary>
      <p>${answer}</p>
    </details>
  `).join("");
}

function initialiseAdvertisementActions() {
  document.addEventListener("click", (event) => {
    const category = event.target.closest(".category-card[data-product]");
    if (category) {
      document.querySelector(`#product-${category.dataset.product}`)?.scrollIntoView({ behavior: "smooth", block: "center" });
      trackEvent("view_rakhi_category", { product_id: category.dataset.product });
    }
  });

  document.querySelectorAll(".call-link").forEach((link) => {
    link.addEventListener("click", () => {
      trackEvent("call_store", { phone: "+918789087326", product_id: link.dataset.enquire || undefined });
    });
  });

  document.querySelectorAll(".directions-link").forEach((link) => {
    link.addEventListener("click", () => trackEvent("open_directions", { destination: "Keshri Gift, Hazaribag" }));
  });

  document.querySelectorAll(".offer-link").forEach((link) => {
    link.addEventListener("click", () => trackEvent("view_festive_offers", { campaign: "raksha_bandhan_2026" }));
  });
}

function initialiseOfferCarousel() {
  const carousel = document.querySelector("[data-offer-carousel]");
  if (!carousel) return;

  const track = carousel.querySelector("[data-offer-track]");
  const viewport = carousel.querySelector(".hero-offer-viewport");
  const slides = [...carousel.querySelectorAll("[data-offer-slide]")];
  const dots = [...carousel.querySelectorAll("[data-offer-dot]")];
  const toggle = carousel.querySelector("[data-offer-toggle]");
  const status = carousel.querySelector("[data-offer-status]");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const offerNames = ["Buy 2 Get 1 Free", "Up to 30% Off"];
  let currentIndex = 0;
  let timer;
  let userPaused = false;
  let touchStartX = null;
  let suppressSlideClick = false;

  function stopAutoplay() {
    window.clearInterval(timer);
    timer = undefined;
  }

  function startAutoplay() {
    stopAutoplay();
    if (userPaused || reducedMotion.matches || document.hidden) return;
    timer = window.setInterval(() => showOffer(currentIndex + 1), 5500);
  }

  function showOffer(index, announce = false) {
    currentIndex = (index + slides.length) % slides.length;
    track.style.transform = `translateX(-${currentIndex * 100}%)`;

    slides.forEach((slide, slideIndex) => {
      const isActive = slideIndex === currentIndex;
      slide.tabIndex = isActive ? 0 : -1;
      if (isActive) slide.removeAttribute("aria-hidden");
      else slide.setAttribute("aria-hidden", "true");
    });

    dots.forEach((dot, dotIndex) => {
      const isActive = dotIndex === currentIndex;
      dot.classList.toggle("is-active", isActive);
      if (isActive) dot.setAttribute("aria-current", "true");
      else dot.removeAttribute("aria-current");
    });

    if (announce) {
      status.textContent = `Showing offer ${currentIndex + 1} of ${slides.length}: ${offerNames[currentIndex]}`;
      trackEvent("change_offer_slide", { offer: offerNames[currentIndex] });
    }
  }

  function selectOffer(index) {
    showOffer(index, true);
    startAutoplay();
  }

  carousel.querySelector("[data-offer-prev]")?.addEventListener("click", () => selectOffer(currentIndex - 1));
  carousel.querySelector("[data-offer-next]")?.addEventListener("click", () => selectOffer(currentIndex + 1));
  dots.forEach((dot) => dot.addEventListener("click", () => selectOffer(Number(dot.dataset.offerDot))));

  toggle?.addEventListener("click", () => {
    userPaused = !userPaused;
    toggle.querySelector("span").textContent = userPaused ? "▶" : "❚❚";
    toggle.setAttribute("aria-label", userPaused ? "Start offer carousel" : "Pause offer carousel");
    if (userPaused) stopAutoplay();
    else startAutoplay();
    trackEvent("toggle_offer_carousel", { state: userPaused ? "paused" : "playing" });
  });

  carousel.addEventListener("mouseenter", stopAutoplay);
  carousel.addEventListener("mouseleave", startAutoplay);
  carousel.addEventListener("focusin", stopAutoplay);
  carousel.addEventListener("focusout", () => {
    window.requestAnimationFrame(() => {
      if (!carousel.contains(document.activeElement)) startAutoplay();
    });
  });

  viewport.addEventListener("touchstart", (event) => {
    touchStartX = event.changedTouches[0].clientX;
    stopAutoplay();
  }, { passive: true });

  viewport.addEventListener("touchend", (event) => {
    if (touchStartX === null) return;
    const distance = event.changedTouches[0].clientX - touchStartX;
    touchStartX = null;
    if (Math.abs(distance) > 40) {
      suppressSlideClick = true;
      selectOffer(currentIndex + (distance < 0 ? 1 : -1));
      window.setTimeout(() => { suppressSlideClick = false; }, 400);
    } else {
      startAutoplay();
    }
  }, { passive: true });

  viewport.addEventListener("click", (event) => {
    if (!suppressSlideClick) return;
    event.preventDefault();
    event.stopPropagation();
  }, true);

  document.addEventListener("visibilitychange", () => {
    if (document.hidden) stopAutoplay();
    else startAutoplay();
  });

  reducedMotion.addEventListener?.("change", () => {
    carousel.classList.toggle("is-reduced-motion", reducedMotion.matches);
    if (reducedMotion.matches) stopAutoplay();
    else startAutoplay();
  });

  carousel.classList.toggle("is-reduced-motion", reducedMotion.matches);
  showOffer(0);
  startAutoplay();
}

function initialiseRevealAnimations() {
  // Content must never depend on an animation callback to become readable.
  // Some embedded browser previews do not reliably deliver IntersectionObserver
  // events, which previously left most of the desktop page at opacity: 0.
  document.querySelectorAll(".reveal").forEach((element) => element.classList.add("is-visible"));
}

function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .reduce((result, key) => {
        if (params.has(key)) result[key] = params.get(key);
        return result;
      }, {});
    if (Object.keys(attribution).length) sessionStorage.setItem("keshri_gift_attribution", JSON.stringify(attribution));
  } catch {
    // Some browsers restrict storage when the HTML file is opened directly.
  }
}

// Analytics integration point. Replace the console call with Meta Pixel and GA4 events before launch.
function trackEvent(eventName, properties = {}) {
  let attribution = {};
  try {
    attribution = JSON.parse(sessionStorage.getItem("keshri_gift_attribution") || "{}");
  } catch {
    // Analytics attribution is optional; calls and directions must still work.
  }
  console.info("[analytics]", eventName, { ...properties, ...attribution });
  // window.fbq?.("trackCustom", eventName, { ...properties, ...attribution });
  // window.gtag?.("event", eventName, { ...properties, ...attribution });
}

renderCategories();
renderProducts();
renderTrustPoints();
renderReviews();
renderFaqs();
initialiseAdvertisementActions();
initialiseOfferCarousel();
initialiseRevealAnimations();
captureAttribution();
