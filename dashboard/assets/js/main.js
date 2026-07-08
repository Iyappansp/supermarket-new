/* =========================================================
   FRESHLY MARKET — main.js
   Handles: Header injection, Footer injection, Theme toggle,
   RTL toggle, Mobile navigation, Cart/Wishlist count badges.
   This file is shared by EVERY page in the storefront.
   ========================================================= */

(function () {
  "use strict";

  /* ---------------------------------------------------
     0. PATH HELPERS
     Pages live at root (e.g. index.html) so asset paths
     are relative to root ("assets/..."). The dashboard
     folder has its own main.js copy with "../assets/..."
     adjusted — see dashboard/assets/js/sidebar.js
  --------------------------------------------------- */
  const ROOT = "../";
  const CART_LINK = "orders.html";
  const DASHBOARD_LINK = "index.html";

  /* ---------------------------------------------------
     1. THEME (Dark / Light) — applied ASAP to avoid flash
  --------------------------------------------------- */
  function getStoredTheme() {
    return localStorage.getItem("fm-theme") || "light";
  }
  function applyTheme(theme) {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("fm-theme", theme);
  }
  // Apply immediately (before DOM paint of header)
  applyTheme(getStoredTheme());

  /* ---------------------------------------------------
     2. RTL / LTR — applied ASAP as well
  --------------------------------------------------- */
  function getStoredDir() {
    return localStorage.getItem("fm-dir") || "ltr";
  }
  function applyDir(dir) {
    document.documentElement.setAttribute("dir", dir);
    document.documentElement.setAttribute("lang", dir === "rtl" ? "ar" : "en");
    localStorage.setItem("fm-dir", dir);
    document.querySelectorAll(".rtl-toggle").forEach(btn => {
      btn.textContent = dir === "rtl" ? "LTR" : "RTL";
    });
  }
  applyDir(getStoredDir());

  /* ---------------------------------------------------
     3. HEADER TEMPLATE
  --------------------------------------------------- */
  const headerHTML = `
  <div class="header-main-wrap dashboard-header-wrap">
    <div class="container header-main">
      <button class="dash-mobile-toggle" id="dashMobileToggle" aria-label="Open dashboard menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
      </button>

      <a href="${ROOT}index.html" class="brand" title="Return to Storefront">
        <img src="${ROOT}assets/images/logo.png" alt="FreshlyMarket Logo" style="height: 80px; object-fit: contain;">
      </a>

      <div class="header-actions">
        <div class="header-utility">
          <button type="button" class="rtl-toggle" aria-label="Toggle right to left layout">RTL</button>
          <button type="button" class="theme-toggle" aria-label="Toggle dark mode">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>
          </button>
          <button type="button" class="notification-toggle" aria-label="Notifications" title="Notifications" onclick="alert('You have no new notifications.');">
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
            <span class="notification-badge"></span>
          </button>
        </div>
      
        
      </div>
    </div>
  </div>
  `;

  /* ---------------------------------------------------
     4. MOBILE DRAWER TEMPLATE
  --------------------------------------------------- */
  const drawerHTML = `
  <div class="drawer-overlay" id="drawerOverlay"></div>
  <aside class="mobile-drawer" id="mobileDrawer">
    <div class="mobile-drawer-head">
      <a href="${ROOT}index.html" class="brand" style="font-size:1.1rem;">
        <img src="${ROOT}assets/images/logo.png" alt="FreshlyMarket Logo" style="height: 60px; object-fit: contain;">
      </a>
      <button class="mobile-drawer-close" id="mobileDrawerClose" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="mobile-drawer-body">
      <a class="mob-link" href="${ROOT}login.html" data-page="logout">Logout</a>
      <div class="drawer-utility" style="margin-top:2rem; padding-top:1.5rem; border-top:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; gap:1rem;">
        <span style="font-size:0.88rem; font-weight:600; color:var(--text-secondary);">Options</span>
        <div style="display:flex; gap:0.5rem;">
          <button type="button" class="rtl-toggle" aria-label="Toggle right to left layout" style="width:44px; height:44px; border-radius:50%; background:var(--surface-2); border:0; color:var(--text-primary); display:flex; align-items:center; justify-content:center; cursor:pointer; font-family:var(--font-heading); font-weight:700; font-size:0.8rem;">RTL</button>
          <button type="button" class="theme-toggle" aria-label="Toggle dark mode" style="width:44px; height:44px; border-radius:50%; background:var(--surface-2); border:0; color:var(--text-primary); display:flex; align-items:center; justify-content:center; cursor:pointer;">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:19px; height:19px;"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:19px; height:19px;"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>
          </button>
        </div>
      </div>
    </div>
  </aside>
  `;

  /* ---------------------------------------------------
     5. FOOTER TEMPLATE
  --------------------------------------------------- */
  const footerHTML = ``;

  function updateHeaderHeight() {
    const header = document.getElementById("main-header");
    if (header) {
      document.documentElement.style.setProperty('--site-header-height', `${header.offsetHeight}px`);
    }
  }

  /* ---------------------------------------------------
     6. INJECT HEADER / FOOTER / DRAWER
  --------------------------------------------------- */
  function injectLayout() {
    const headerEl = document.getElementById("main-header");
    const footerEl = document.getElementById("main-footer");
    if (headerEl) {
      headerEl.className = "site-header";
      headerEl.innerHTML = headerHTML;
      document.body.insertAdjacentHTML("afterbegin", drawerHTML);
      applyDir(getStoredDir());
      
      // Dynamic header height measurement
      updateHeaderHeight();
      window.addEventListener('resize', updateHeaderHeight);
      window.addEventListener('load', updateHeaderHeight);
    }
    if (footerEl) {
      footerEl.style.display = "none";
    }
    // Back to top button
    const btt = document.createElement("button");
    btt.className = "back-to-top";
    btt.id = "backToTop";
    btt.setAttribute("aria-label", "Back to top");
    btt.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 19V5M5 12l7-7 7 7"/></svg>`;
    document.body.appendChild(btt);

    bindLayoutEvents();
    markActiveNav();
    initPasswordToggles();
  }

  /* ---------------------------------------------------
     7. EVENT BINDINGS (theme, rtl, mobile nav, scroll)
  --------------------------------------------------- */
  function bindLayoutEvents() {
    // Theme toggle
    document.querySelectorAll(".theme-toggle").forEach(themeBtn => {
      themeBtn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    });
    // RTL toggle
    document.querySelectorAll(".rtl-toggle").forEach(rtlBtn => {
      rtlBtn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("dir") === "rtl" ? "ltr" : "rtl";
        applyDir(next);
      });
    });

    // Mobile drawer
    const drawer = document.getElementById("mobileDrawer");
    const overlay = document.getElementById("drawerOverlay");
    const openBtn = document.getElementById("mobileNavToggle");
    const closeBtn = document.getElementById("mobileDrawerClose");
    function openDrawer() { drawer.classList.add("open"); overlay.classList.add("open"); document.body.style.overflow = "hidden"; }
    function closeDrawer() { drawer.classList.remove("open"); overlay.classList.remove("open"); document.body.style.overflow = ""; }
    if (openBtn) openBtn.addEventListener("click", openDrawer);
    if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
    if (overlay) overlay.addEventListener("click", closeDrawer);

    const deptToggle = document.getElementById("mobDeptToggle");
    const deptSub = document.getElementById("mobDeptSub");
    if (deptToggle) {
      deptToggle.addEventListener("click", (e) => {
        e.preventDefault();
        deptSub.classList.toggle("open");
        deptToggle.querySelector("svg").style.transform = deptSub.classList.contains("open") ? "rotate(180deg)" : "rotate(0)";
      });
    }

    // Sticky header shadow on scroll
    const header = document.querySelector(".site-header");
    const backToTop = document.getElementById("backToTop");
    window.addEventListener("scroll", () => {
      const scrolled = window.scrollY > 12;
      if (header) header.classList.toggle("is-scrolled", scrolled);
      if (backToTop) backToTop.classList.toggle("show", window.scrollY > 480);
    });
    if (backToTop) {
      backToTop.addEventListener("click", () => window.scrollTo({ top: 0, behavior: "smooth" }));
    }
  }

  /* ---------------------------------------------------
     7.5 PASSWORD TOGGLE VISIBILITY
  --------------------------------------------------- */
  function initPasswordToggles() {
    document.querySelectorAll(".password-input-wrap").forEach(wrap => {
      const input = wrap.querySelector("input");
      const btn = wrap.querySelector(".password-toggle-btn");
      if (!input || !btn || btn.dataset.bound) return;
      btn.dataset.bound = "true";

      const eye = btn.querySelector(".eye-icon");
      const eyeOff = btn.querySelector(".eye-off-icon");

      btn.addEventListener("click", () => {
        const isPass = input.type === "password";
        input.type = isPass ? "text" : "password";
        if (eye && eyeOff) {
          eye.style.display = isPass ? "none" : "block";
          eyeOff.style.display = isPass ? "block" : "none";
        }
      });
    });
  }

  /* ---------------------------------------------------
     8. ACTIVE NAV HIGHLIGHTING
  --------------------------------------------------- */
  function markActiveNav() {
    const current = window.location.pathname.split("/").pop() || "index.html";
    document.querySelectorAll(".header-nav > li > a, .mobile-drawer .mob-link").forEach(a => {
      const href = a.getAttribute("href");
      if (href && href.endsWith(current) && current !== "") a.classList.add("active");
    });
  }

  /* ---------------------------------------------------
     9. INIT
  --------------------------------------------------- */
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", injectLayout);
  } else {
    injectLayout();
  }

  // Expose theme/dir appliers for the dashboard's toggle buttons
  window.FM = window.FM || {};
  window.FM.applyTheme = applyTheme;
  window.FM.applyDir = applyDir;
  window.FM.getStoredTheme = getStoredTheme;
  window.FM.getStoredDir = getStoredDir;

})();
