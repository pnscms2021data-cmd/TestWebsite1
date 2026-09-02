/**
 * Knot & Nest by JP - Product Detail Page Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initProductDetailPage();
});

function initProductDetailPage() {
  if (typeof PRODUCTS_DATA === 'undefined') return;

  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id') || PRODUCTS_DATA[0].id;
  const product = PRODUCTS_DATA.find(p => p.id === productId) || PRODUCTS_DATA[0];

  // Update page title & Meta
  document.title = `${product.name} | Knot & Nest by JP`;

  // Breadcrumb
  const breadcrumbName = document.getElementById('breadcrumbProductName');
  if (breadcrumbName) breadcrumbName.textContent = product.name;

  // Selected State
  let selectedColour = product.colours && product.colours.length > 0 ? product.colours[0].name : 'Standard';
  let quantity = 1;

  // Render Product Images
  const mainImage = document.getElementById('detailMainImage');
  const thumbnailStrip = document.getElementById('thumbnailStrip');

  if (mainImage) {
    mainImage.src = product.image;
    mainImage.alt = product.name;
  }

  if (thumbnailStrip && product.gallery && product.gallery.length > 0) {
    thumbnailStrip.innerHTML = product.gallery.map((imgUrl, idx) => `
      <div class="thumbnail-item ${idx === 0 ? 'active' : ''}" data-src="${imgUrl}">
        <img src="${imgUrl}" alt="${product.name} view ${idx + 1}">
      </div>
    `).join('');

    const thumbs = thumbnailStrip.querySelectorAll('.thumbnail-item');
    thumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        thumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');
        if (mainImage) {
          mainImage.src = thumb.dataset.src;
        }
      });
    });
  }

  // Render Texts & Tags
  const categoryLabel = document.getElementById('detailCategory');
  if (categoryLabel) categoryLabel.textContent = product.category.replace('-', ' ').toUpperCase();

  const titleEl = document.getElementById('detailTitle');
  if (titleEl) titleEl.textContent = product.name;

  const priceEl = document.getElementById('detailPrice');
  if (priceEl) priceEl.textContent = `₹${Number(product.price).toLocaleString('en-IN')}`;

  const oldPriceEl = document.getElementById('detailOldPrice');
  if (oldPriceEl) {
    if (product.originalPrice) {
      oldPriceEl.textContent = `₹${Number(product.originalPrice).toLocaleString('en-IN')}`;
      oldPriceEl.style.display = 'inline';
    } else {
      oldPriceEl.style.display = 'none';
    }
  }

  const availabilityTag = document.getElementById('detailAvailability');
  if (availabilityTag) {
    availabilityTag.textContent = product.availability;
    if (product.availability.toLowerCase().includes('in stock')) {
      availabilityTag.className = 'product-tag-badge tag-instock';
    } else {
      availabilityTag.className = 'product-tag-badge tag-madetoorder';
    }
  }

  const descEl = document.getElementById('detailDescription');
  if (descEl) descEl.textContent = product.description;

  // Render Color Swatches
  const swatchContainer = document.getElementById('swatchOptions');
  const selectedColourLabel = document.getElementById('selectedColourLabel');

  if (swatchContainer && product.colours && product.colours.length > 0) {
    if (selectedColourLabel) selectedColourLabel.textContent = selectedColour;

    swatchContainer.innerHTML = product.colours.map((c, idx) => `
      <button type="button" class="color-swatch-btn ${idx === 0 ? 'active' : ''}" data-name="${c.name}">
        <span class="swatch-circle" style="background-color: ${c.hex};"></span>
        <span>${c.name}</span>
      </button>
    `).join('');

    const swatchBtns = swatchContainer.querySelectorAll('.color-swatch-btn');
    swatchBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        swatchBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        selectedColour = btn.dataset.name;
        if (selectedColourLabel) selectedColourLabel.textContent = selectedColour;
      });
    });
  }

  // Quantity Stepper
  const qtyInput = document.getElementById('quantityInput');
  const qtyMinus = document.getElementById('qtyMinus');
  const qtyPlus = document.getElementById('qtyPlus');

  if (qtyMinus && qtyPlus && qtyInput) {
    qtyMinus.addEventListener('click', () => {
      if (quantity > 1) {
        quantity--;
        qtyInput.value = quantity;
      }
    });

    qtyPlus.addEventListener('click', () => {
      if (quantity < 10) {
        quantity++;
        qtyInput.value = quantity;
      }
    });

    qtyInput.addEventListener('change', () => {
      let val = parseInt(qtyInput.value, 10);
      if (isNaN(val) || val < 1) val = 1;
      if (val > 10) val = 10;
      quantity = val;
      qtyInput.value = quantity;
    });
  }

  // Order CTAs
  const orderBtn = document.getElementById('btnOrderPiece');
  if (orderBtn) {
    orderBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const orderUrl = `order.html?product=${product.id}&colour=${encodeURIComponent(selectedColour)}&qty=${quantity}`;
      window.location.href = orderUrl;
    });
  }

  const whatsappInquireBtn = document.getElementById('btnWhatsappInquire');
  if (whatsappInquireBtn) {
    whatsappInquireBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const msg = `Hi JP! I'm interested in ordering the "${product.name}" in "${selectedColour}" color (Quantity: ${quantity}). Could you please share the order details and timeline?`;
      const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(msg)}`;
      window.open(whatsappUrl, '_blank');
    });
  }

  // Specifications & Crafting Details
  const specMaterials = document.getElementById('specMaterials');
  if (specMaterials) specMaterials.textContent = product.materials;

  const specDimensions = document.getElementById('specDimensions');
  if (specDimensions) specDimensions.textContent = product.dimensions;

  const specCraftTime = document.getElementById('specCraftTime');
  if (specCraftTime) specCraftTime.textContent = product.craftTime;

  const careText = document.getElementById('careInstructionsText');
  if (careText) careText.textContent = product.careInstructions;

  // Render Related Products
  renderRelatedProducts(product);
}

function renderRelatedProducts(currentProduct) {
  const container = document.getElementById('relatedProductsGrid');
  if (!container || typeof PRODUCTS_DATA === 'undefined') return;

  const related = PRODUCTS_DATA
    .filter(p => p.id !== currentProduct.id)
    .slice(0, 3);

  container.innerHTML = related.map(p => `
    <article class="product-card">
      <div class="product-card-media">
        <img src="${p.image}" alt="${p.name}" loading="lazy">
      </div>
      <div class="product-card-body">
        <span class="product-category-label">${p.category.replace('-', ' ')}</span>
        <h4 class="product-card-title">
          <a href="product-detail.html?id=${p.id}">${p.name}</a>
        </h4>
        <div class="product-card-footer">
          <span class="product-price-current">₹${Number(p.price).toLocaleString('en-IN')}</span>
          <a href="product-detail.html?id=${p.id}" class="btn btn-outline btn-sm">View Details</a>
        </div>
      </div>
    </article>
  `).join('');
}
