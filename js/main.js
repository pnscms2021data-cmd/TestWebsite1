/**
 * Knot & Nest by JP - Main Global JavaScript & Responsive Helpers
 */

document.addEventListener('DOMContentLoaded', () => {
  initHeader();
  initMobileNav();
  initActiveNavLink();
  initQuickViewModal();
  initGlobalKeyboardHandlers();
});

/* --------------------------------------------------------------------------
   1. Sticky Header & Scroll Effects
   -------------------------------------------------------------------------- */
function initHeader() {
  const header = document.querySelector('.site-header');
  if (!header) return;

  const handleScroll = () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  };

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();
}

/* --------------------------------------------------------------------------
   2. Mobile Drawer Navigation (Touch & Responsive)
   -------------------------------------------------------------------------- */
function initMobileNav() {
  const toggleBtn = document.querySelector('.mobile-menu-toggle');
  const overlay = document.querySelector('.mobile-nav-overlay');
  const drawer = document.querySelector('.mobile-nav-drawer');
  const closeBtn = document.querySelector('.mobile-nav-close');

  if (!toggleBtn || !drawer) return;

  const openDrawer = (e) => {
    if (e) e.preventDefault();
    drawer.classList.add('active');
    if (overlay) overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  };

  const closeDrawer = (e) => {
    if (e) e.preventDefault();
    drawer.classList.remove('active');
    if (overlay) overlay.classList.remove('active');
    document.body.style.overflow = '';
  };

  toggleBtn.addEventListener('click', openDrawer);
  if (closeBtn) closeBtn.addEventListener('click', closeDrawer);
  if (overlay) overlay.addEventListener('click', closeDrawer);

  // Close when clicking a link inside mobile drawer
  const links = drawer.querySelectorAll('a');
  links.forEach(link => {
    link.addEventListener('click', closeDrawer);
  });
}

/* --------------------------------------------------------------------------
   3. Highlight Active Nav Link
   -------------------------------------------------------------------------- */
function initActiveNavLink() {
  const path = window.location.pathname.split('/').pop() || 'index.html';
  const links = document.querySelectorAll('.nav-link');

  links.forEach(link => {
    const href = link.getAttribute('href');
    if (href === path || (path === '' && href === 'index.html')) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

/* --------------------------------------------------------------------------
   4. Global Keyboard Accessibility
   -------------------------------------------------------------------------- */
function initGlobalKeyboardHandlers() {
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      // Close mobile drawer if open
      const drawer = document.querySelector('.mobile-nav-drawer.active');
      const overlay = document.querySelector('.mobile-nav-overlay.active');
      if (drawer) {
        drawer.classList.remove('active');
        if (overlay) overlay.classList.remove('active');
        document.body.style.overflow = '';
      }

      // Close Quick View modal if open
      closeQuickView();

      // Close Order success modal if open
      const orderModal = document.querySelector('#orderSuccessModal.active');
      if (orderModal) {
        orderModal.classList.remove('active');
        document.body.style.overflow = '';
      }
    }
  });
}

/* --------------------------------------------------------------------------
   5. Toast Notification Utility
   -------------------------------------------------------------------------- */
function showToast(message, type = 'info') {
  let container = document.querySelector('.toast-container');
  if (!container) {
    container = document.createElement('div');
    container.className = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast';
  
  let iconSvg = `
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="8" x2="12"></line>
      <line x1="12" y1="16" x2="12.01" y2="16"></line>
    </svg>`;
  
  if (type === 'success') {
    iconSvg = `
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#25D366" stroke-width="2">
        <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
        <polyline points="22 4 12 14.01 9 11.01"></polyline>
      </svg>`;
  }

  toast.innerHTML = `${iconSvg} <span>${message}</span>`;
  container.appendChild(toast);

  // Trigger animation
  setTimeout(() => toast.classList.add('show'), 10);

  // Remove after 3.5 seconds
  setTimeout(() => {
    toast.classList.remove('show');
    setTimeout(() => toast.remove(), 400);
  }, 3500);
}

/* --------------------------------------------------------------------------
   6. Quick View Modal System
   -------------------------------------------------------------------------- */
function initQuickViewModal() {
  let modalBackdrop = document.querySelector('#quickViewModal');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'quickViewModal';
    modalBackdrop.className = 'modal-backdrop';
    modalBackdrop.innerHTML = `
      <div class="modal-card">
        <button class="modal-close-btn" aria-label="Close modal">&times;</button>
        <div id="quickViewContent"></div>
      </div>
    `;
    document.body.appendChild(modalBackdrop);

    const closeBtn = modalBackdrop.querySelector('.modal-close-btn');
    closeBtn.addEventListener('click', () => closeQuickView());
    modalBackdrop.addEventListener('click', (e) => {
      if (e.target === modalBackdrop) closeQuickView();
    });
  }
}

function openQuickView(productId) {
  if (typeof PRODUCTS_DATA === 'undefined') return;
  const product = PRODUCTS_DATA.find(p => p.id === productId);
  if (!product) return;

  const modal = document.querySelector('#quickViewModal');
  const content = document.querySelector('#quickViewContent');
  if (!modal || !content) return;

  const formattedPrice = `₹${Number(product.price).toLocaleString('en-IN')}`;
  const formattedOldPrice = product.originalPrice ? `₹${Number(product.originalPrice).toLocaleString('en-IN')}` : '';

  content.innerHTML = `
    <div style="display: grid; grid-template-columns: 1fr 1.2fr; gap: 24px; align-items: center;" class="quickview-grid">
      <div style="aspect-ratio: 1/1; border-radius: 12px; overflow: hidden; background: #EEF4EE;">
        <img src="${product.image}" alt="${product.name}" style="width: 100%; height: 100%; object-fit: cover;">
      </div>
      <div>
        <span class="eyebrow no-line" style="margin-bottom: 4px;">${product.category.replace('-', ' ').toUpperCase()}</span>
        <h3 style="margin-bottom: 8px;">${product.name}</h3>
        <div style="display: flex; align-items: baseline; gap: 10px; margin-bottom: 12px;">
          <span style="font-size: 1.4rem; font-weight: 700; color: var(--color-text-primary);">${formattedPrice}</span>
          ${formattedOldPrice ? `<span style="font-size: 0.95rem; color: var(--color-text-muted); text-decoration: line-through;">${formattedOldPrice}</span>` : ''}
        </div>
        <p style="font-size: 0.9rem; margin-bottom: 16px; line-height: 1.5;">${product.shortDescription}</p>
        
        <div style="margin-bottom: 20px; font-size: 0.82rem; color: var(--color-text-secondary);">
          <strong>Materials:</strong> ${product.materials}<br>
          <strong>Status:</strong> ${product.availability}
        </div>

        <div style="display: flex; gap: 10px; flex-wrap: wrap;">
          <a href="order.html?product=${product.id}" class="btn btn-primary btn-sm">Order This Piece</a>
          <a href="product-detail.html?id=${product.id}" class="btn btn-outline btn-sm">Full Details</a>
        </div>
      </div>
    </div>
  `;

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function closeQuickView() {
  const modal = document.querySelector('#quickViewModal');
  if (modal) {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }
}
