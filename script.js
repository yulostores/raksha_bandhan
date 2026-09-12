const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

function initialiseIntro() {
  const intro = document.querySelector(".intro");
  let alreadySeen = false;
  try { alreadySeen = Boolean(sessionStorage.getItem("yulo_intro_seen")); } catch { /* Optional enhancement. */ }
  if (!intro || reduceMotion.matches || alreadySeen) return;

  intro.classList.add("is-playing");
  window.setTimeout(() => {
    intro.classList.add("is-done");
    try { sessionStorage.setItem("yulo_intro_seen", "true"); } catch { /* Optional enhancement. */ }
  }, 1050);
}

function initialiseReveals() {
  const elements = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window) || reduceMotion.matches) {
    elements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    });
  }, { rootMargin: "0px 0px -8%", threshold: 0.08 });

  elements.forEach((element) => {
    const isInitiallyVisible = element.getBoundingClientRect().top < window.innerHeight * 0.92;
    if (isInitiallyVisible) {
      element.classList.add("is-visible");
      return;
    }
    element.classList.add("will-reveal");
    observer.observe(element);
  });
}

function initialiseHeroMotion() {
  const hero = document.querySelector(".hero");
  const food = document.querySelector(".hero-food");
  if (!hero || !food || reduceMotion.matches) return;

  hero.addEventListener("pointermove", (event) => {
    if (event.pointerType === "touch") return;
    const x = (event.clientX / window.innerWidth - 0.5) * 10;
    const y = (event.clientY / window.innerHeight - 0.5) * 6;
    food.style.transform = `translate3d(${x}px, ${y}px, 0) scale(1.015)`;
  });

  hero.addEventListener("pointerleave", () => {
    food.style.transform = "translate3d(0, 0, 0) scale(1)";
  });
}

function initialiseScrollChoreography() {
  const progress = document.querySelector(".scroll-progress span");
  const hero = document.querySelector(".hero");
  const heroContent = document.querySelector(".hero-copy");
  const heroFood = document.querySelector(".hero-food");
  const heroProduct = document.querySelector(".hero-product");
  const nav = document.querySelector(".nav");
  const demoPulse = document.querySelector(".demo-pulse");
  let ticking = false;

  function update() {
    const scrollY = window.scrollY;
    const scrollable = document.documentElement.scrollHeight - window.innerHeight;
    if (progress) progress.style.transform = `scaleX(${scrollable > 0 ? scrollY / scrollable : 0})`;
    nav?.classList.toggle("page-nav", hero ? scrollY > hero.offsetHeight - 90 : scrollY > 18);

    if (!reduceMotion.matches && hero && scrollY < hero.offsetHeight) {
      const ratio = Math.min(scrollY / 620, 1);
      if (heroContent) {
        heroContent.style.transform = `translate3d(0, ${scrollY * 0.18}px, 0)`;
        heroContent.style.opacity = String(1 - ratio * 0.72);
      }
      if (heroProduct) {
        heroProduct.style.transform = `translate3d(0, ${scrollY * 0.09}px, 0)`;
        heroProduct.style.opacity = String(1 - ratio * 0.35);
      }
      if (heroFood) heroFood.style.translate = `0 ${scrollY * 0.055}px`;
    }

    if (!reduceMotion.matches && demoPulse) {
      const rect = demoPulse.getBoundingClientRect();
      const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) / window.innerHeight;
      demoPulse.style.translate = `0 ${Math.max(-14, Math.min(14, offset * -18))}px`;
    }

    ticking = false;
  }

  function requestUpdate() {
    if (ticking) return;
    ticking = true;
    window.requestAnimationFrame(update);
  }

  window.addEventListener("scroll", requestUpdate, { passive: true });
  window.addEventListener("resize", requestUpdate);
  window.addEventListener("load", requestUpdate);
  window.addEventListener("hashchange", requestUpdate);
  update();
}

function initialiseCounters() {
  const counters = document.querySelectorAll("[data-target]");
  if (!counters.length || reduceMotion.matches || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      const target = Number(element.dataset.target);
      const suffix = element.dataset.suffix || "";
      const start = performance.now();
      const duration = 1300;

      function step(now) {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.round(target * eased);
        element.textContent = `${value.toLocaleString("en-IN")}${suffix}`;
        if (progress < 1) window.requestAnimationFrame(step);
      }

      window.requestAnimationFrame(step);
      observer.unobserve(element);
    });
  }, { threshold: 0.55 });

  counters.forEach((counter) => observer.observe(counter));
}

function initialiseModuleTour() {
  const tabs = [...document.querySelectorAll("[data-module]")];
  const stage = document.querySelector("[data-module-stage]");
  if (!tabs.length || !stage) return;

  const content = {
    orders: { icon: "▤", kicker: "ORDERS & POS", title: "Every order. One clear queue.", copy: "Accept dine-in, takeaway and online orders without switching screens or losing context.", summary: [["NEW", "08"], ["PREPARING", "12"], ["READY", "05"]], cards: [["#1843", "Table 4", "Paneer tikka × 2", "NEW"], ["#1842", "Delivery", "Dal bowl · Naan", "COOKING"], ["#1841", "Takeaway", "Biryani family pack", "READY"]], points: ["Works online and offline", "Integrated payments", "Aggregator sync"] },
    kitchen: { icon: "◫", kicker: "KITCHEN DISPLAY", title: "A calmer kitchen at full speed.", copy: "Route items to the right prep station and keep every cook aligned with live ticket timing.", summary: [["ON TIME", "91%"], ["COOKING", "12"], ["AVG PREP", "18m"]], cards: [["KOT 842", "Hot kitchen", "2 dishes · 08:14", "COOKING"], ["KOT 843", "Tandoor", "3 dishes · 05:22", "ON TIME"], ["KOT 844", "Beverage", "2 drinks · 02:08", "NEW"]], points: ["Station-based routing", "Live preparation timers", "Course management"] },
    inventory: { icon: "◈", kicker: "INVENTORY & PURCHASE", title: "Know what you have—and what it costs.", copy: "Track ingredients by recipe, automate stock deduction and create smarter purchase plans.", summary: [["FOOD COST", "31.2%"], ["LOW STOCK", "03"], ["WASTE", "↓ 8%"]], cards: [["SKU 028", "Paneer", "14 portions left", "LOW"], ["SKU 112", "Basmati rice", "42.8 kg available", "HEALTHY"], ["PO 018", "Fresh produce", "Arriving tomorrow", "ORDERED"]], points: ["Recipe-level consumption", "Vendor purchase orders", "Waste tracking"] },
    customers: { icon: "♡", kicker: "CRM & LOYALTY", title: "Make every guest feel remembered.", copy: "Bring visits, preferences, feedback and rewards together for genuinely personal hospitality.", summary: [["RETURNING", "42%"], ["MEMBERS", "8.4K"], ["RATING", "4.8"]], cards: [["GUEST", "Aarav Mehta", "12 visits · Loves spicy", "REGULAR"], ["CAMPAIGN", "Weekend regulars", "612 guests reached", "LIVE"], ["REWARD", "Free dessert", "184 redemptions", "POPULAR"]], points: ["Unified guest profiles", "Flexible loyalty rules", "Targeted campaigns"] },
    team: { icon: "☺", kicker: "TEAM & SHIFTS", title: "Everyone knows their next move.", copy: "Plan shifts, control permissions and help managers run consistent service across outlets.", summary: [["ON SHIFT", "18"], ["CLOCKED IN", "17"], ["LABOUR", "12.6%"]], cards: [["SERVICE", "Dinner floor", "6 team members", "READY"], ["KITCHEN", "Hot + cold line", "8 team members", "ACTIVE"], ["SHIFT", "Tomorrow", "2 open positions", "REVIEW"]], points: ["Attendance and shifts", "Role-based access", "Performance visibility"] },
    analytics: { icon: "⌁", kicker: "REPORTS & ANALYTICS", title: "Answers before you need to ask.", copy: "See sales, margins, menu performance and outlet trends in clear, decision-ready reports.", summary: [["NET SALES", "₹4.82L"], ["MARGIN", "18.4%"], ["AOV", "₹684"]], cards: [["INSIGHT", "Dinner growing", "+12.4% week on week", "POSITIVE"], ["MENU", "Paneer platter", "Top contribution item", "STAR"], ["OUTLET", "Indiranagar", "Leading by 8.2%", "TOP"]], points: ["Live profit snapshots", "Menu engineering", "Multi-outlet comparison"] }
  };
  let activeIndex = 0;
  let timer;

  function select(index, userInitiated = false) {
    activeIndex = (index + tabs.length) % tabs.length;
    const tab = tabs[activeIndex];
    const values = content[tab.dataset.module];
    const visual = stage.querySelector("[data-stage-visual]");
    tabs.forEach((item, itemIndex) => {
      const isActive = itemIndex === activeIndex;
      item.classList.toggle("is-active", isActive);
      item.setAttribute("aria-selected", String(isActive));
    });
    stage.querySelector("[data-stage-icon]").textContent = values.icon;
    stage.querySelector("[data-stage-kicker]").textContent = values.kicker;
    stage.querySelector("[data-stage-title]").textContent = values.title;
    stage.querySelector("[data-stage-copy]").textContent = values.copy;
    ["one", "two", "three"].forEach((key, pointIndex) => { stage.querySelector(`[data-point-${key}]`).textContent = values.points[pointIndex]; });
    visual.classList.add("is-changing");
    window.setTimeout(() => {
      visual.dataset.stageVisual = tab.dataset.module;
      visual.innerHTML = `<div class="visual-summary">${values.summary.map(([label, value]) => `<article><small>${label}</small><strong>${value}</strong></article>`).join("")}</div><div class="visual-board">${values.cards.map(([number, title, detail, state]) => `<article><span>${number}</span><b>${title}</b><small>${detail}</small><i>${state}</i></article>`).join("")}</div>`;
      visual.classList.remove("is-changing");
    }, reduceMotion.matches ? 0 : 180);
    if (userInitiated) trackEvent("view_platform_module", { module: tab.dataset.module });
  }

  function start() {
    window.clearInterval(timer);
    if (reduceMotion.matches || document.hidden) return;
    timer = window.setInterval(() => select(activeIndex + 1), 5200);
  }

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => { select(index, true); start(); });
  });
  document.querySelector(".platform-layout")?.addEventListener("mouseenter", () => window.clearInterval(timer));
  document.querySelector(".platform-layout")?.addEventListener("mouseleave", start);
  document.addEventListener("visibilitychange", start);
  select(0);
  start();
}

function initialiseDemoForm() {
  const form = document.querySelector("[data-demo-form]");
  const success = document.querySelector("[data-form-success]");
  if (!form || !success) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;
    const data = new FormData(form);
    const subject = encodeURIComponent(`YuloStores demo request — ${data.get("restaurant")}`);
    const body = encodeURIComponent(`Name: ${data.get("name")}\nRestaurant: ${data.get("restaurant")}\nPhone: ${data.get("phone")}\nOutlets: ${data.get("outlets")}`);
    success.hidden = false;
    form.hidden = true;
    trackEvent("request_demo", { outlets: data.get("outlets") });
    window.location.href = `mailto:yulostoresdeveloper@gmail.com?subject=${subject}&body=${body}`;
  });
}

function initialiseTracking() {
  document.addEventListener("click", (event) => {
    const link = event.target.closest("a");
    if (!link) return;

    const href = link.getAttribute("href") || "";
    if (href === "#") event.preventDefault();

    if (href.includes("demo")) {
      trackEvent("demo_cta_click", { label: link.textContent.trim() });
    } else if (href.startsWith("mailto:")) {
      trackEvent("partner_contact", { destination: href });
    }
  });
}

function initialiseNavigationState() {
  const links = [...document.querySelectorAll('.nav-links a[href^="#"]')];
  const sections = links.map((link) => document.querySelector(link.getAttribute("href"))).filter(Boolean);
  if (!links.length || !sections.length || !("IntersectionObserver" in window)) return;

  const observer = new IntersectionObserver((entries) => {
    const visible = entries.filter((entry) => entry.isIntersecting).sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (!visible) return;
    links.forEach((link) => link.classList.toggle("is-active", link.getAttribute("href") === `#${visible.target.id}`));
  }, { rootMargin: "-25% 0px -60%", threshold: [0, 0.1, 0.4] });

  sections.forEach((section) => observer.observe(section));
}

function captureAttribution() {
  try {
    const params = new URLSearchParams(window.location.search);
    const attribution = ["utm_source", "utm_medium", "utm_campaign", "utm_content", "utm_term"]
      .reduce((result, key) => {
        if (params.has(key)) result[key] = params.get(key);
        return result;
      }, {});
    if (Object.keys(attribution).length) {
      sessionStorage.setItem("yulo_stores_attribution", JSON.stringify(attribution));
    }
  } catch {
    // The landing experience remains usable when browser storage is unavailable.
  }
}

function trackEvent(eventName, properties = {}) {
  let attribution = {};
  try {
    attribution = JSON.parse(sessionStorage.getItem("yulo_stores_attribution") || "{}");
  } catch {
    // Analytics is optional and must never block navigation.
  }
  console.info("[analytics]", eventName, { ...properties, ...attribution });
  // window.fbq?.("trackCustom", eventName, { ...properties, ...attribution });
  // window.gtag?.("event", eventName, { ...properties, ...attribution });
}

captureAttribution();
initialiseIntro();
initialiseReveals();
initialiseHeroMotion();
initialiseScrollChoreography();
initialiseCounters();
initialiseModuleTour();
initialiseDemoForm();
initialiseTracking();
initialiseNavigationState();
