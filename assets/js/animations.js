/* =========================================================
   FRESHLY MARKET — animations.js
   Handles: Scroll reveal, stagger, counters, accordion,
   tab transitions, simple carousel/slider controls.
   ========================================================= */

(function(){
  "use strict";

  /* ---------------- Scroll Reveal (IntersectionObserver) ---------------- */
  function initScrollReveal(){
    const targets = document.querySelectorAll(".reveal, .reveal-fade, .stagger");
    if (!("IntersectionObserver" in window)){
      targets.forEach(t => t.classList.add("in-view"));
      return;
    }
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          const el = entry.target;
          if (el.classList.contains("stagger")){
            Array.from(el.children).forEach((child, i) => {
              child.style.setProperty("--stagger-i", i);
              child.classList.add("reveal");
              requestAnimationFrame(() => child.classList.add("in-view"));
            });
          }
          el.classList.add("in-view");
          io.unobserve(el);
        }
      });
    }, { threshold: 0.12, rootMargin: "0px 0px -40px 0px" });
    targets.forEach(t => io.observe(t));
  }

  /* ---------------- Counter Animation ---------------- */
  function initCounters(){
    const counters = document.querySelectorAll("[data-counter]");
    if (!counters.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting){
          animateCounter(entry.target);
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });
    counters.forEach(c => io.observe(c));
  }
  function animateCounter(el){
    const target = parseFloat(el.getAttribute("data-counter"));
    const suffix = el.getAttribute("data-suffix") || "";
    const duration = 1400;
    const start = performance.now();
    function tick(now){
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const value = Math.floor(eased * target);
      el.textContent = value.toLocaleString() + suffix;
      if (progress < 1) requestAnimationFrame(tick);
      else el.textContent = target.toLocaleString() + suffix;
    }
    requestAnimationFrame(tick);
  }

  /* ---------------- FAQ Accordion ---------------- */
  function initAccordions(){
    document.querySelectorAll(".accordion-item").forEach(item => {
      const trigger = item.querySelector(".accordion-trigger");
      const panel = item.querySelector(".accordion-panel");
      if (!trigger || !panel) return;
      trigger.addEventListener("click", () => {
        const isOpen = item.classList.contains("open");
        item.closest(".accordion-group")?.querySelectorAll(".accordion-item.open").forEach(openItem => {
          if (openItem !== item){
            openItem.classList.remove("open");
            openItem.querySelector(".accordion-panel").style.maxHeight = null;
          }
        });
        if (isOpen){
          item.classList.remove("open");
          panel.style.maxHeight = null;
        } else {
          item.classList.add("open");
          panel.style.maxHeight = panel.scrollHeight + "px";
        }
      });
    });
  }

  /* ---------------- Tabs ---------------- */
  function initTabs(){
    document.querySelectorAll(".tabs").forEach(tabGroup => {
      const buttons = tabGroup.querySelectorAll(".tab-btn");
      const panels = tabGroup.querySelectorAll(".tab-panel");
      buttons.forEach(btn => {
        btn.addEventListener("click", () => {
          buttons.forEach(b => b.classList.remove("active"));
          panels.forEach(p => p.classList.remove("active"));
          btn.classList.add("active");
          const target = tabGroup.querySelector(`.tab-panel[data-tab="${btn.dataset.tab}"]`);
          if (target) target.classList.add("active");
        });
      });
    });
  }

  /* ---------------- Simple Carousel / Slider ---------------- */
  function initCarousels(){
    document.querySelectorAll(".carousel").forEach(carousel => {
      const track = carousel.querySelector(".carousel-track");
      const prev = carousel.querySelector(".arrow-prev");
      const next = carousel.querySelector(".arrow-next");
      if (!track) return;
      const scrollAmount = () => track.clientWidth * 0.85;
      const dir = document.documentElement.getAttribute("dir") === "rtl" ? -1 : 1;
      if (next) next.addEventListener("click", () => track.scrollBy({ left: scrollAmount() * dir, behavior: "smooth" }));
      if (prev) prev.addEventListener("click", () => track.scrollBy({ left: -scrollAmount() * dir, behavior: "smooth" }));
    });
  }

  /* ---------------- Countdown Timer ---------------- */
  function initCountdowns(){
    document.querySelectorAll("[data-countdown]").forEach(el => {
      const hoursFromNow = parseFloat(el.getAttribute("data-countdown")) || 48;
      const end = Date.now() + hoursFromNow * 3600 * 1000;
      function update(){
        const diff = Math.max(0, end - Date.now());
        const d = Math.floor(diff / 86400000);
        const h = Math.floor((diff % 86400000) / 3600000);
        const m = Math.floor((diff % 3600000) / 60000);
        const s = Math.floor((diff % 60000) / 1000);
        const dEl = el.querySelector(".cd-d"), hEl = el.querySelector(".cd-h"), mEl = el.querySelector(".cd-m"), sEl = el.querySelector(".cd-s");
        if (dEl) dEl.textContent = String(d).padStart(2,"0");
        if (hEl) hEl.textContent = String(h).padStart(2,"0");
        if (mEl) mEl.textContent = String(m).padStart(2,"0");
        if (sEl) sEl.textContent = String(s).padStart(2,"0");
        if (diff > 0) requestAnimationFrame(() => setTimeout(update, 1000));
      }
      update();
    });
  }

  /* ---------------- Skeleton Loading Demo ---------------- */
  function initSkeletons(){
    document.querySelectorAll("[data-skeleton-target]").forEach(wrapper => {
      const skeleton = wrapper.querySelector(".skeleton-placeholder");
      const content = wrapper.querySelector(".skeleton-real-content");
      if (!skeleton || !content) return;
      content.style.display = "none";
      setTimeout(() => {
        skeleton.style.display = "none";
        content.style.display = "";
      }, 600 + Math.random() * 500);
    });
  }

  /* ---------------- Quantity Steppers (used on product/cart cards) ---------------- */
  function initQtySteppers(){
    document.querySelectorAll(".qty-stepper").forEach(stepper => {
      const input = stepper.querySelector("input");
      const minus = stepper.querySelector(".qty-minus");
      const plus = stepper.querySelector(".qty-plus");
      if (!input) return;
      const min = parseInt(input.getAttribute("min") || "1", 10);
      const max = parseInt(input.getAttribute("max") || "99", 10);
      if (minus) minus.addEventListener("click", () => {
        input.value = Math.max(min, (parseInt(input.value || "1",10) - 1));
      });
      if (plus) plus.addEventListener("click", () => {
        input.value = Math.min(max, (parseInt(input.value || "1",10) + 1));
      });
    });
  }

  /* ---------------- Init all on DOM ready (after header/footer injection) ---------------- */
  function initAll(){
    initScrollReveal();
    initCounters();
    initAccordions();
    initTabs();
    initCarousels();
    initCountdowns();
    initSkeletons();
    initQtySteppers();
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", () => setTimeout(initAll, 0));
  } else {
    setTimeout(initAll, 0);
  }
})();
