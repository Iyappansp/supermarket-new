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
  const ROOT = "";
  const CART_LINK = "dashboard/orders.html";
  const DASHBOARD_LINK = "dashboard/index.html";

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
  <div class="top-bar">
    <div class="container top-bar-left-right">
      <div class="top-bar-left">
        <a href="${ROOT}delivery-information.html"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>Free delivery on orders over $50</a>
        <a href="${ROOT}track-order.html">Track Your Order</a>
      </div>
      <div class="top-bar-right">
        <a href="${ROOT}about.html">About Us</a>
        <a href="${ROOT}contact.html">Help Center</a>
      </div>
    </div>
  </div>

  <div class="header-main-wrap">
    <div class="container header-main">
      <a href="${ROOT}index.html" class="brand">
        <img src="${ROOT}assets/images/logo.png" alt="FreshlyMarket Logo" style="height: 64px; object-fit: contain;">
      </a>

      <ul class="header-nav">
        <li><a href="${ROOT}index.html">Home</a></li>
        <li><a href="${ROOT}home-2.html">Home 2</a></li>
                <li><a href="${ROOT}about.html">About</a></li>

        <li><a href="${ROOT}delivery-information.html">Delivery Info</a></li>
        <li><a href="${ROOT}departments.html">Departments</a></li>
        <li><a href="${ROOT}fresh-produce.html">Fresh Produce</a></li>
        <li><a href="${ROOT}brands.html">Brands</a></li>
        <li><a href="${ROOT}contact.html">Contact</a></li>
      </ul>

      <div class="header-actions">
        <div class="header-utility">
          <button type="button" class="rtl-toggle" id="rtlToggle" aria-label="Toggle right to left layout">RTL</button>
          <button type="button" class="theme-toggle" id="themeToggle" aria-label="Toggle dark mode">
            <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
            <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>
          </button>
        </div>
        <a href="${DASHBOARD_LINK}" class="btn btn-outline btn-sm dashboard-btn">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15" style="margin-inline-end: 4px;"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
          <span>Dashboard</span>
        </a>
        <a href="${ROOT}login.html" class="btn btn-primary btn-sm login-btn">
          <span>Login</span>
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="15" height="15"><path d="M5 12h14M13 6l6 6-6 6"/></svg>
        </a>
        <button class="mobile-nav-toggle" id="mobileNavToggle" aria-label="Open menu">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 6h18M3 12h18M3 18h18"/></svg>
        </button>
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
        <img src="${ROOT}assets/images/logo.png" alt="FreshlyMarket Logo" style="height: 48px; object-fit: contain;">
      </a>
      <button class="mobile-drawer-close" id="mobileDrawerClose" aria-label="Close menu">
        <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 6L6 18M6 6l12 12"/></svg>
      </button>
    </div>
    <div class="mobile-drawer-body">
      <a class="mob-link" href="${ROOT}index.html">Home</a>
      <a class="mob-link" href="${ROOT}home-2.html">Home 2</a>
            <a class="mob-link" href="${ROOT}about.html">About</a>

      <a class="mob-link" href="${ROOT}delivery-information.html">Delivery Info</a>
      <a class="mob-link" href="${ROOT}departments.html">Departments</a>
      <a class="mob-link" href="${ROOT}fresh-produce.html">Fresh Produce</a>
      <a class="mob-link" href="${ROOT}brands.html">Brands</a>
      <a class="mob-link" href="${ROOT}contact.html">Contact</a>
      <div style="margin-top:1.5rem;display:flex;flex-direction:column;gap:.75rem;">
        <a href="${DASHBOARD_LINK}" class="btn btn-outline btn-block dashboard-drawer-btn" style="display:flex; align-items:center; justify-content:center; gap:0.5rem;">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="16" height="16"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
          Dashboard
        </a>
        <a href="${ROOT}login.html" class="btn btn-primary btn-block">Login</a>
      </div>
      <div class="drawer-utility" style="margin-top:2rem; padding-top:1.5rem; border-top:1px solid var(--color-border); display:flex; justify-content:space-between; align-items:center; gap:1rem;">
        <span style="font-size:0.88rem; font-weight:600; color:var(--text-secondary);">Options:</span>
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
  const footerHTML = `
  <div class="container">
    <div class="footer-top">
      <div class="footer-brand">
        <a href="${ROOT}index.html" class="brand">
          <img src="${ROOT}assets/images/logo.png" alt="FreshlyMarket Logo" style="height: 60px; object-fit: contain;">
        </a>
        <p>Your neighborhood supermarket online — fresh produce, everyday essentials, and weekly deals delivered to your door, with the warmth and trust of a local store.</p>
        <div class="footer-social">
          <a href="#" aria-label="Facebook"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M13.5 9H16V6h-2.5C11.6 6 10 7.6 10 9.5V11H8v3h2v7h3v-7h2.2l.8-3H13v-1.2c0-.5.3-.8.7-.8z"/></svg></a>
          <a href="#" aria-label="Instagram"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="18" height="18" rx="5"/><circle cx="12" cy="12" r="4"/><circle cx="17.5" cy="6.5" r="1"/></svg></a>
          <a href="#" aria-label="Twitter"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M22 5.9c-.7.3-1.5.6-2.3.7.8-.5 1.4-1.3 1.7-2.3-.8.5-1.7.8-2.6 1-.8-.8-1.8-1.3-3-1.3-2.3 0-4.1 1.9-4.1 4.1 0 .3 0 .6.1.9-3.4-.2-6.5-1.8-8.5-4.4-.3.6-.5 1.3-.5 2 0 1.4.7 2.7 1.9 3.4-.7 0-1.3-.2-1.9-.5 0 2 1.4 3.6 3.3 4-.4.1-.7.1-1.1.1-.3 0-.5 0-.8-.1.5 1.6 2 2.8 3.8 2.8-1.4 1.1-3.2 1.7-5.1 1.7-.3 0-.7 0-1-.1 1.8 1.2 4 1.8 6.3 1.8 7.5 0 11.7-6.3 11.7-11.7v-.5c.8-.6 1.5-1.3 2-2.1z"/></svg></a>
        </div>
      </div>
      <div class="footer-col">
        <h6>Departments</h6>
        <ul>
          <li><a href="${ROOT}index.html">Fresh Produce</a></li>
          <li><a href="${ROOT}index.html">Grocery</a></li>
          <li><a href="${ROOT}index.html">Bakery</a></li>
          <li><a href="${ROOT}index.html">Beverages</a></li>
          <li><a href="${ROOT}index.html">Household</a></li>
          <li><a href="${ROOT}index.html">All Departments</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h6>Customer Service</h6>
        <ul>
          <li><a href="${ROOT}index.html">Contact Us</a></li>
          <li><a href="${ROOT}index.html">FAQs</a></li>
          <li><a href="${ROOT}index.html">Track Order</a></li>
          <li><a href="${ROOT}index.html">Shopping Lists</a></li>
          <li><a href="${ROOT}index.html">My Account</a></li>
        </ul>
      </div>
      <div class="footer-col">
        <h6>Delivery</h6>
        <ul>
          <li><a href="${ROOT}index.html">Delivery Zones</a></li>
          <li><a href="${ROOT}index.html">Delivery Charges</a></li>
          <li><a href="${ROOT}index.html">Time Slots</a></li>
          <li><a href="${ROOT}index.html">Click & Collect</a></li>
        </ul>
      </div>
      <div class="footer-col footer-newsletter">
        <h6>Stay Fresh — Newsletter</h6>
        <p>Weekly deals & recipe ideas, straight to your inbox.</p>
        <form onsubmit="event.preventDefault(); this.reset(); alert('Thanks for subscribing!');">
          <input type="email" required placeholder="Your email address" aria-label="Email address">
          <button type="submit">Join</button>
        </form>
        <div class="footer-apps">
          <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M17 2H7a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2zm-5 18a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3z"/></svg> App Store</a>
          <a href="#"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 3l11 9-11 9V3zM15 12l4-3v6l-4-3z"/></svg> Google Play</a>
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      <p>&copy; <span id="footerYear"></span> FreshlyMarket. All rights reserved.</p>
      <div class="pay-icons">
        <span>VISA</span><span>Mastercard</span><span>UPI</span><span>PayPal</span>
      </div>
      <div class="footer-bottom-links">
        <a href="#">Privacy Policy</a>
        <a href="#">Terms of Service</a>
        <a href="${ROOT}index.html">FAQ</a>
      </div>
    </div>
  </div>
  `;

  /* ---------------------------------------------------
     6. INJECT HEADER / FOOTER / DRAWER
  --------------------------------------------------- */
  function injectLayout() {
    const headerEl = document.getElementById("main-header");
    const footerEl = document.getElementById("main-footer");
    const authShell = document.querySelector(".auth-shell");

    if (headerEl) {
      headerEl.className = "site-header";
      headerEl.innerHTML = headerHTML;
      document.body.insertAdjacentHTML("afterbegin", drawerHTML);
      applyDir(getStoredDir());
    }

    if (authShell && !authShell.querySelector(".auth-utility")) {
      const authUtilityHTML = `
      <div class="auth-utility">
        <button type="button" class="rtl-toggle" aria-label="Toggle right to left layout">RTL</button>
        <button type="button" class="theme-toggle" aria-label="Toggle dark mode">
          <svg class="icon-sun" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:19px; height:19px;"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.2 4.2l1.4 1.4M18.4 18.4l1.4 1.4M2 12h2M20 12h2M4.2 19.8l1.4-1.4M18.4 5.6l1.4-1.4"/></svg>
          <svg class="icon-moon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" style="width:19px; height:19px;"><path d="M21 12.8A9 9 0 1 1 11.2 3 7 7 0 0 0 21 12.8z"/></svg>
        </button>
      </div>
      `;
      if (window.getComputedStyle(authShell).position === "static") {
        authShell.style.position = "relative";
      }
      authShell.insertAdjacentHTML("beforeend", authUtilityHTML);
      applyDir(getStoredDir());
    }

    if (footerEl) {
      footerEl.className = "site-footer";
      footerEl.innerHTML = footerHTML;
      const y = document.getElementById("footerYear");
      if (y) y.textContent = new Date().getFullYear();
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
    document.querySelectorAll(".theme-toggle, .pref-theme-toggle").forEach(themeBtn => {
      themeBtn.addEventListener("click", () => {
        const next = document.documentElement.getAttribute("data-theme") === "dark" ? "light" : "dark";
        applyTheme(next);
      });
    });
    // RTL toggle
    document.querySelectorAll(".rtl-toggle, .pref-rtl-toggle").forEach(rtlBtn => {
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
