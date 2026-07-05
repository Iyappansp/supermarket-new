/* =========================================================
   FRESHLY MARKET — dashboard/assets/js/sidebar.js
   Generates and injects the dashboard sidebar into
   <aside id="dashboard-sidebar"></aside> on every dashboard page.
   ========================================================= */

(function(){
  "use strict";

  const sidebarHTML = `
  <div class="dash-user">
    <div class="avatar" style="padding:0;overflow:hidden;"><img src="assets/images/user-avatar.png" alt="Jordan Davis" style="width:100%;height:100%;object-fit:cover;"></div>
    <div class="info">
      <div class="name">Jordan Davis</div>
      <div class="tier">Gold Member</div>
    </div>
  </div>
  <nav class="dash-nav">
    <a href="index.html" data-page="index.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><rect x="3" y="3" width="7" height="9"/><rect x="14" y="3" width="7" height="5"/><rect x="14" y="12" width="7" height="9"/><rect x="3" y="16" width="7" height="5"/></svg>
      <span class="nav-label">Dashboard</span>
    </a>
    <a href="orders.html" data-page="orders.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 8H6"/></svg>
      <span class="nav-label">Orders</span>
    </a>
    <a href="shopping-list.html" data-page="shopping-list.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 11l3 3L22 4"/><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"/></svg>
      <span class="nav-label">Shopping Lists</span>
    </a>
    <a href="wishlist.html" data-page="wishlist.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 21.5 11c-2.5 4.5-9.5 9-9.5 9z"/></svg>
      <span class="nav-label">Wishlist</span>
    </a>
    <a href="saved-products.html" data-page="saved-products.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 2l1.5 5M18 2l-1.5 5M3.5 7h17l-1.6 9.4a2 2 0 0 1-2 1.6H7.1a2 2 0 0 1-2-1.6L3.5 7z"/></svg>
      <span class="nav-label">Saved Products</span>
    </a>
    <a href="delivery-tracking.html" data-page="delivery-tracking.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 7h11v8H3z"/><path d="M14 10h4l3 3v2h-7z"/><circle cx="7" cy="18" r="1.5"/><circle cx="17" cy="18" r="1.5"/></svg>
      <span class="nav-label">Delivery Tracking</span>
    </a>
    <a href="addresses.html" data-page="addresses.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 21s-7-5.4-7-11a7 7 0 1 1 14 0c0 5.6-7 11-7 11z"/><circle cx="12" cy="10" r="3"/></svg>
      <span class="nav-label">Addresses</span>
    </a>
    <a href="profile.html" data-page="profile.html">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="12" cy="8" r="4"/><path d="M4 21c0-4 4-6 8-6s8 2 8 6"/></svg>
      <span class="nav-label">Profile</span>
    </a>
    <hr>
    <a href="../login.html" data-page="logout">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"/><path d="M16 17l5-5-5-5"/><path d="M21 12H9"/></svg>
      <span class="nav-label">Logout</span>
    </a>
  </nav>
  <button class="sidebar-collapse-btn" id="sidebarCollapseBtn">
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M11 17l-5-5 5-5M18 17l-5-5 5-5"/></svg>
    <span>Collapse</span>
  </button>
  `;

  function injectSidebar(){
    const el = document.getElementById("dashboard-sidebar");
    if (!el) return;
    el.className = "dash-sidebar";
    el.innerHTML = sidebarHTML;

    // Active nav highlighting
    const current = window.location.pathname.split("/").pop() || "index.html";
    el.querySelectorAll("a[data-page]").forEach(a => {
      if (a.getAttribute("data-page") === current) a.classList.add("active");
    });

    // Collapse toggle (desktop)
    const collapseBtn = document.getElementById("sidebarCollapseBtn");
    if (collapseBtn){
      const collapsed = localStorage.getItem("fm-sidebar-collapsed") === "true";
      if (collapsed) el.classList.add("collapsed");
      collapseBtn.addEventListener("click", () => {
        el.classList.toggle("collapsed");
        localStorage.setItem("fm-sidebar-collapsed", el.classList.contains("collapsed"));
      });
    }

    // Mobile drawer toggle
    const mobileToggle = document.getElementById("dashMobileToggle");
    const overlay = document.getElementById("dashSidebarOverlay");
    if (mobileToggle){
      mobileToggle.addEventListener("click", () => {
        el.classList.add("mobile-open");
        if (overlay) overlay.classList.add("open");
      });
    }
    if (overlay){
      overlay.addEventListener("click", () => {
        el.classList.remove("mobile-open");
        overlay.classList.remove("open");
      });
    }
  }

  if (document.readyState === "loading"){
    document.addEventListener("DOMContentLoaded", injectSidebar);
  } else {
    injectSidebar();
  }
})();
