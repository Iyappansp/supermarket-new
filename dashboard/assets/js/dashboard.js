/* =========================================================
   FRESHLY MARKET — dashboard/assets/js/dashboard.js
   Handles: Mock orders data, dashboard widgets, counters,
   shared interactions across dashboard pages.
   ========================================================= */

(function(){
  "use strict";

  const IMG = "../assets/images/";

  window.FM_ORDERS = [
    { id:"FM-2026-0048213", date:"Jun 26, 2026", items:4, total:42.85, status:"transit", statusLabel:"Out for Delivery",
      products:[IMG+"p-apple.png", IMG+"p-bread.png", IMG+"p-milk.png", IMG+"p-juice.png"] },
    { id:"FM-2026-0047990", date:"Jun 22, 2026", items:7, total:68.40, status:"delivered", statusLabel:"Delivered",
      products:[IMG+"p-carrot.png", IMG+"p-cheese.png", IMG+"p-snack.png"] },
    { id:"FM-2026-0047650", date:"Jun 15, 2026", items:3, total:24.10, status:"delivered", statusLabel:"Delivered",
      products:[IMG+"p-cleaning.png", IMG+"p-baby.png"] },
    { id:"FM-2026-0047302", date:"Jun 8, 2026", items:5, total:51.99, status:"cancelled", statusLabel:"Cancelled",
      products:[IMG+"p-frozen.png", IMG+"p-organic.png"] },
    { id:"FM-2026-0046980", date:"May 30, 2026", items:6, total:59.20, status:"delivered", statusLabel:"Delivered",
      products:[IMG+"p-pet.png", IMG+"p-kitchen.png", IMG+"p-bread.png"] }
  ];

  function statusClass(status){
    return { delivered:"status-delivered", transit:"status-transit", processing:"status-processing", cancelled:"status-cancelled" }[status] || "status-processing";
  }
  window.FM_statusClass = statusClass;

  function renderOrderCard(order, compact){
    return `
    <div class="order-card card-hover reveal">
      <div class="order-head">
        <div>
          <span class="fs-sm" style="color:var(--text-secondary);">Order #${order.id}</span>
          <h3 style="font-size:1.02rem;margin:.2rem 0 0;">${order.date} · ${order.items} items</h3>
        </div>
        <span class="status-pill ${statusClass(order.status)}">${order.statusLabel}</span>
      </div>
      <div class="order-items-preview">
        ${order.products.map(p => `<img src="${p}" alt="Order item">`).join("")}
      </div>
      <div class="order-foot">
        <strong class="price-ltr" style="color:var(--color-primary);font-family:var(--font-heading);">$${order.total.toFixed(2)}</strong>
        <div class="row-center" style="gap:.5rem;">
          ${order.status === "transit" ? `<a href="delivery-tracking.html" class="btn btn-secondary btn-sm">Track Order</a>` : ""}
          <a href="#" class="btn btn-outline btn-sm" onclick="event.preventDefault(); alert('Invoice for ${order.id} would download here.');">View Invoice</a>
          ${order.status === "delivered" ? `<button class="btn btn-primary btn-sm" onclick="alert('Items reordered!')">Reorder</button>` : ""}
        </div>
      </div>
    </div>`;
  }
  window.FM_renderOrderCard = renderOrderCard;

  // Sidebar overlay element (mobile)
  function ensureOverlay(){
    if (!document.getElementById("dashSidebarOverlay")){
      const overlay = document.createElement("div");
      overlay.id = "dashSidebarOverlay";
      overlay.className = "drawer-overlay";
      document.body.appendChild(overlay);
    }
  }

  document.addEventListener("DOMContentLoaded", ensureOverlay);
})();
