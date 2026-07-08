/* =========================================================
   FRESHLY MARKET — products-data.js
   Shared product dataset + card renderer used across pages
   (homepage carousels, category pages, offers, wishlist demo).
   Frontend-only mock data — no backend.
   ========================================================= */

(function(){
  "use strict";

  const IMG = "assets/images/";

  window.FM_PRODUCTS = [
    { id:1, name:"Royal Gala Apples (1kg)", cat:"Fresh Produce", img: IMG+"p-apple.png", price:3.49, old:4.20, rating:4.8, badge:"sale", off:"17% OFF" },
    { id:2, name:"Organic Carrots Bunch (500g)", cat:"Fresh Produce", img: IMG+"p-carrot.png", price:1.99, old:null, rating:4.6, badge:"organic", off:null },
    { id:3, name:"Fresh Broccoli Crown (each)", cat:"Fresh Produce", img: IMG+"p-broccoli.png", price:2.29, old:null, rating:4.5, badge:null, off:null },
    { id:4, name:"Artisan Sourdough Loaf", cat:"Bakery", img: IMG+"p-bread.png", price:4.99, old:5.99, rating:4.9, badge:"sale", off:"17% OFF" },
    { id:5, name:"Whole Milk (2L)", cat:"Dairy", img: IMG+"p-milk.png", price:2.79, old:null, rating:4.7, badge:"new", off:null },
    { id:6, name:"Aged Cheddar Cheese (250g)", cat:"Dairy", img: IMG+"p-cheese.png", price:5.49, old:6.49, rating:4.8, badge:"sale", off:"15% OFF" },
    { id:7, name:"100% Orange Juice (1L)", cat:"Beverages", img: IMG+"p-juice.png", price:3.29, old:null, rating:4.4, badge:null, off:null },
    { id:8, name:"Multi-Surface Cleaner Spray", cat:"Household", img: IMG+"p-cleaning.png", price:4.49, old:null, rating:4.3, badge:null, off:null },
    { id:9, name:"Sea Salt Tortilla Chips", cat:"Snacks", img: IMG+"p-snack.png", price:2.99, old:3.49, rating:4.6, badge:"sale", off:"14% OFF" },
    { id:10, name:"Baby Feeding Bottle 250ml", cat:"Baby Care", img: IMG+"p-baby.png", price:7.99, old:null, rating:4.9, badge:"new", off:null },
    { id:11, name:"Premium Pet Kibble (2kg)", cat:"Pet Supplies", img: IMG+"p-pet.png", price:11.99, old:13.99, rating:4.7, badge:"sale", off:"14% OFF" },
    { id:12, name:"Organic Quinoa (500g)", cat:"Organic", img: IMG+"p-organic.png", price:6.49, old:null, rating:4.5, badge:"organic", off:null },
    { id:13, name:"Non-Stick Frying Pan 28cm", cat:"Kitchen", img: IMG+"p-kitchen.png", price:18.99, old:22.99, rating:4.6, badge:"sale", off:"17% OFF" },
    { id:14, name:"Frozen Mixed Berries (400g)", cat:"Frozen Foods", img: IMG+"p-frozen.png", price:4.29, old:null, rating:4.4, badge:null, off:null },
    // { id:15, name:"Golden Delicious Apples (1kg)", cat:"Fresh Produce", img: IMG+"p-apple-yellow.png", price:3.19, old:null, rating:4.5, badge:null, off:null },
    { id:16, name:"Greek Style Yogurt (500g)", cat:"Dairy", img: IMG+"p-yogurt.png", price:3.49, old:null, rating:4.7, badge:"new", off:null }
  ];

  function stars(rating){
    return `<span class="rating"><svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2l3.1 6.3 6.9 1-5 4.9 1.2 6.8L12 17.8 5.8 21l1.2-6.8-5-4.9 6.9-1z"/></svg>${rating}</span>`;
  }

  function badgeHTML(badge, off){
    let html = "";
    if (badge === "sale") html += `<span class="badge badge-sale">Sale</span>`;
    if (badge === "new") html += `<span class="badge badge-new">New</span>`;
    if (badge === "organic") html += `<span class="badge badge-organic">Organic</span>`;
    if (off) html += `<span class="badge badge-off">${off}</span>`;
    return html;
  }

  function renderProductCard(p, forCarousel){
    const widthStyle = forCarousel ? `style="width:230px;"` : "";
    return `
    <div class="product-card card-hover reveal" ${widthStyle}>
      <div class="badges-row">${badgeHTML(p.badge, p.off)}</div>
      <div class="quick-actions">
        <button class="qa-btn" aria-label="Add to wishlist" onclick="event.stopPropagation();"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M12 20s-7-4.5-9.5-9A5.5 5.5 0 0 1 12 5.5 5.5 5.5 0 0 1 21.5 11c-2.5 4.5-9.5 9-9.5 9z"/></svg></button>
        <button class="qa-btn" aria-label="Quick view" onclick="event.stopPropagation();"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M1 12s4-7 11-7 11 7 11 7-4 7-11 7-11-7-11-7z"/><circle cx="12" cy="12" r="3"/></svg></button>
      </div>
      <div class="card-img-zoom"><img src="${p.img}" alt="${p.name}" loading="lazy"></div>
      <div class="card-body">
        <span class="cat-label">${p.cat}</span>
        <h3 class="p-name">${p.name}</h3>
        ${stars(p.rating)}
        <div class="price-row">
          <span class="price price-ltr">$${p.price.toFixed(2)}</span>
          ${p.old ? `<span class="price-old price-ltr">$${p.old.toFixed(2)}</span>` : ""}
        </div>
        <button class="add-cart-btn" onclick="window.FM_addToCart && window.FM_addToCart(${p.id})">
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="9" cy="21" r="1"/><circle cx="19" cy="21" r="1"/><path d="M2.5 3h2l2.7 12.4a2 2 0 0 0 2 1.6h8.6a2 2 0 0 0 2-1.6L21.5 8H6"/></svg>
          <span>Add to Cart</span>
        </button>
      </div>
    </div>`;
  }

  window.FM_renderProductCard = renderProductCard;

  window.FM_addToCart = function(id){
    const badge = document.getElementById("cartCount");
    if (badge){
      badge.textContent = (parseInt(badge.textContent || "0", 10) + 1);
      badge.style.transform = "scale(1.4)";
      setTimeout(() => { badge.style.transform = "scale(1)"; }, 200);
    }
  };
})();
