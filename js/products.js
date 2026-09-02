/**
 * Knot & Nest by JP - Products Catalogue Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initCatalogue();
});

function initCatalogue() {
  const container = document.getElementById('productsContainer');
  if (!container || typeof PRODUCTS_DATA === 'undefined') return;

  // Read possible URL category parameter (e.g., products.html?category=bags)
  const urlParams = new URLSearchParams(window.location.search);
  let activeCategory = urlParams.get('category') || 'all';
  let searchQuery = '';
  let activeSort = 'featured';

  // Set active tab if category was specified in URL
  const tabs = document.querySelectorAll('.tab-btn');
  tabs.forEach(tab => {
    if (tab.dataset.category === activeCategory) {
      tab.classList.add('active');
    } else {
      tab.classList.remove('active');
    }

    tab.addEventListener('click', (e) => {
      tabs.forEach(t => t.classList.remove('active'));
      e.currentTarget.classList.add('active');
      activeCategory = e.currentTarget.dataset.category;
      renderFilteredProducts();
    });
  });

  // Search input handler
  const searchInput = document.getElementById('productSearchInput');
  if (searchInput) {
    searchInput.addEventListener('input', (e) => {
      searchQuery = e.target.value.toLowerCase().trim();
      renderFilteredProducts();
    });
  }

  // Sort selector handler
  const sortSelect = document.getElementById('productSortSelect');
  if (sortSelect) {
    sortSelect.addEventListener('change', (e) => {
      activeSort = e.target.value;
      renderFilteredProducts();
    });
  }

  function renderFilteredProducts() {
    let filtered = [...PRODUCTS_DATA];

    // Filter by category
    if (activeCategory !== 'all') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Filter by search query
    if (searchQuery) {
      filtered = filtered.filter(p => 
        p.name.toLowerCase().includes(searchQuery) ||
        p.shortDescription.toLowerCase().includes(searchQuery) ||
        p.category.toLowerCase().includes(searchQuery) ||
        p.materials.toLowerCase().includes(searchQuery)
      );
    }

    // Sort
    if (activeSort === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (activeSort === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    } else if (activeSort === 'rating') {
      filtered.sort((a, b) => b.rating - a.rating);
    } else if (activeSort === 'featured') {
      filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0));
    }

    // Render results
    if (filtered.length === 0) {
      container.innerHTML = `
        <div style="grid-column: 1 / -1; text-align: center; padding: 60px 20px;">
          <div style="width: 60px; height: 60px; border-radius: 50%; background: var(--color-bg-secondary); color: var(--color-terracotta); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </div>
          <h3 style="margin-bottom: 8px;">No matching crochet pieces found</h3>
          <p style="max-width: 440px; margin: 0 auto 24px;">We couldn't find anything matching your search. Would you like us to custom crochet something bespoke for you?</p>
          <a href="order.html?custom=true" class="btn btn-primary btn-sm">Request Custom Crochet</a>
        </div>
      `;
      return;
    }

    container.innerHTML = filtered.map(product => createProductCardHTML(product)).join('');
  }

  // Initial render
  renderFilteredProducts();
}

function createProductCardHTML(product) {
  const formattedPrice = `₹${Number(product.price).toLocaleString('en-IN')}`;
  const formattedOldPrice = product.originalPrice ? `₹${Number(product.originalPrice).toLocaleString('en-IN')}` : '';

  // Determine tag
  let tagHTML = '';
  if (product.availability.toLowerCase().includes('in stock')) {
    tagHTML = `<span class="product-tag-badge tag-instock">In Stock</span>`;
  } else if (product.availability.toLowerCase().includes('order')) {
    tagHTML = `<span class="product-tag-badge tag-madetoorder">Made to Order</span>`;
  } else if (product.featured) {
    tagHTML = `<span class="product-tag-badge tag-featured">Artisan Pick</span>`;
  }

  return `
    <article class="product-card" data-id="${product.id}">
      <div class="product-card-media">
        <img src="${product.image}" alt="${product.name}" loading="lazy">
        ${tagHTML}
        <div class="product-card-overlay">
          <button type="button" class="btn btn-outline btn-sm" onclick="openQuickView('${product.id}')" style="background: rgba(255,255,255,0.95); font-size: 0.8rem; padding: 6px 14px;">
            Quick View
          </button>
        </div>
      </div>

      <div class="product-card-body">
        <span class="product-category-label">${product.category.replace('-', ' ')}</span>
        <h3 class="product-card-title">
          <a href="product-detail.html?id=${product.id}">${product.name}</a>
        </h3>
        <p class="product-card-desc">${product.shortDescription}</p>

        <div class="product-card-footer">
          <div class="product-price-box">
            <span class="product-price-current">${formattedPrice}</span>
            ${formattedOldPrice ? `<span class="product-price-old">${formattedOldPrice}</span>` : ''}
          </div>

          <div class="product-card-buttons">
            <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm" title="View Product Details">Details</a>
            <a href="order.html?product=${product.id}" class="btn btn-primary btn-sm" title="Order Now">Order Now</a>
          </div>
        </div>
      </div>
    </article>
  `;
}
