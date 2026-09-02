/**
 * Knot & Nest by JP - Order & Custom Request Handling
 */

document.addEventListener('DOMContentLoaded', () => {
  initOrderPage();
});

function initOrderPage() {
  if (typeof PRODUCTS_DATA === 'undefined') return;

  const productSelect = document.getElementById('orderProductSelect');
  const qtyInput = document.getElementById('orderQuantity');
  const colourInput = document.getElementById('orderColour');
  const customisationInput = document.getElementById('orderCustomisation');
  const orderForm = document.getElementById('crochetOrderForm');
  const orderSummaryContainer = document.getElementById('orderSummaryPreview');

  // Read URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const paramProductId = urlParams.get('product');
  const paramColour = urlParams.get('colour');
  const paramQty = urlParams.get('qty');
  const isCustom = urlParams.get('custom');

  // Populate Product Dropdown
  if (productSelect) {
    productSelect.innerHTML = `
      <option value="">-- Choose a handcrafted piece --</option>
      ${PRODUCTS_DATA.map(p => `
        <option value="${p.id}" ${p.id === paramProductId ? 'selected' : ''}>
          ${p.name} (₹${Number(p.price).toLocaleString('en-IN')})
        </option>
      `).join('')}
      <option value="bespoke-new-idea" ${isCustom ? 'selected' : ''}>
        ✨ Entirely Bespoke / Custom Design Request
      </option>
    `;

    productSelect.addEventListener('change', updateOrderSummary);
  }

  // Pre-fill parameters if present
  if (paramQty && qtyInput) qtyInput.value = paramQty;
  if (paramColour && colourInput) colourInput.value = paramColour;
  if (isCustom && customisationInput) {
    customisationInput.value = "I would like to request a bespoke custom crochet piece. Please contact me to discuss colors, yarn, and dimensions.";
  }

  if (qtyInput) qtyInput.addEventListener('input', updateOrderSummary);

  // Initial Summary Update
  updateOrderSummary();

  // Handle WhatsApp Order Button
  const btnWhatsappOrder = document.getElementById('btnOrderViaWhatsapp');
  if (btnWhatsappOrder) {
    btnWhatsappOrder.addEventListener('click', (e) => {
      e.preventDefault();
      handleWhatsAppOrderSubmit();
    });
  }

  // Handle Standard Form Submission
  if (orderForm) {
    orderForm.addEventListener('submit', (e) => {
      e.preventDefault();
      handleDirectOrderSubmit();
    });
  }
}

function getSelectedProductData() {
  const productSelect = document.getElementById('orderProductSelect');
  const selectedId = productSelect ? productSelect.value : '';

  if (selectedId === 'bespoke-new-idea') {
    return {
      id: 'bespoke-new-idea',
      name: 'Bespoke Custom Crochet Commission',
      price: 1999,
      image: 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=800&q=80',
      availability: 'Custom Crafting (7-10 Days)',
      isBespoke: true
    };
  }

  return PRODUCTS_DATA.find(p => p.id === selectedId) || null;
}

function updateOrderSummary() {
  const product = getSelectedProductData();
  const qtyInput = document.getElementById('orderQuantity');
  const quantity = Math.max(1, parseInt(qtyInput ? qtyInput.value : 1, 10) || 1);

  const thumbEl = document.getElementById('summaryThumb');
  const nameEl = document.getElementById('summaryItemName');
  const unitPriceEl = document.getElementById('summaryUnitPrice');
  const subtotalEl = document.getElementById('summarySubtotal');
  const shippingEl = document.getElementById('summaryShipping');
  const totalEl = document.getElementById('summaryTotal');
  const timelineEl = document.getElementById('summaryTimeline');

  if (!product) {
    if (nameEl) nameEl.textContent = 'Please select a product above';
    if (unitPriceEl) unitPriceEl.textContent = '₹0';
    if (subtotalEl) subtotalEl.textContent = '₹0';
    if (shippingEl) shippingEl.textContent = 'Calculated at checkout';
    if (totalEl) totalEl.textContent = '₹0';
    if (thumbEl) thumbEl.src = 'https://images.unsplash.com/photo-1584992236310-6edddc08acff?auto=format&fit=crop&w=200&q=80';
    if (timelineEl) timelineEl.textContent = 'Standard crafting & dispatch';
    return;
  }

  const subtotal = product.price * quantity;
  const shippingCost = subtotal >= 1500 ? 0 : 99; // Free shipping above 1500
  const grandTotal = subtotal + shippingCost;

  if (thumbEl) thumbEl.src = product.image;
  if (nameEl) nameEl.textContent = product.name;
  if (unitPriceEl) unitPriceEl.textContent = `₹${Number(product.price).toLocaleString('en-IN')} × ${quantity}`;
  if (subtotalEl) subtotalEl.textContent = `₹${Number(subtotal).toLocaleString('en-IN')}`;
  if (shippingEl) shippingEl.textContent = shippingCost === 0 ? 'FREE (Orders over ₹1,500)' : `₹${shippingCost}`;
  if (totalEl) totalEl.textContent = `₹${Number(grandTotal).toLocaleString('en-IN')}`;
  if (timelineEl) timelineEl.textContent = product.isBespoke ? '7-10 working days crafting time' : 'Hand-checked & dispatched within 2-4 days';
}

function handleDirectOrderSubmit() {
  const form = document.getElementById('crochetOrderForm');
  if (!form) return;

  const fullName = document.getElementById('orderFullName').value.trim();
  const mobile = document.getElementById('orderMobile').value.trim();
  const email = document.getElementById('orderEmail').value.trim();
  const product = getSelectedProductData();
  const quantity = document.getElementById('orderQuantity').value;
  const colour = document.getElementById('orderColour').value.trim();
  const customisation = document.getElementById('orderCustomisation').value.trim();
  const address = document.getElementById('orderAddress').value.trim();
  const notes = document.getElementById('orderNotes').value.trim();

  if (!product) {
    alert('Please select a crochet product to order.');
    return;
  }

  if (!fullName || !mobile || !email || !address) {
    alert('Please fill out all required contact and delivery fields.');
    return;
  }

  // Generate Reference ID
  const orderRef = 'KNJ-' + Math.floor(100000 + Math.random() * 900000);
  const totalAmount = (product.price * quantity) + (product.price * quantity >= 1500 ? 0 : 99);

  // Structured payload for future backend/email/DB integration
  const orderData = {
    orderRef,
    customer: { fullName, mobile, email, address },
    item: {
      productId: product.id,
      productName: product.name,
      price: product.price,
      quantity,
      colour: colour || 'Default',
      customisation,
      notes
    },
    totalAmount,
    createdAt: new Date().toISOString()
  };

  console.log('Order Submitted Successfully:', orderData);

  // Show Success Modal
  showOrderSuccessModal(orderData);
}

function handleWhatsAppOrderSubmit() {
  const product = getSelectedProductData();
  const fullName = document.getElementById('orderFullName').value.trim() || 'Customer';
  const mobile = document.getElementById('orderMobile').value.trim() || 'Not specified';
  const quantity = document.getElementById('orderQuantity').value || '1';
  const colour = document.getElementById('orderColour').value.trim() || 'Standard';
  const customisation = document.getElementById('orderCustomisation').value.trim() || 'None';
  const address = document.getElementById('orderAddress').value.trim() || 'Will share in chat';

  const productName = product ? product.name : 'Custom Crochet Piece';
  const totalAmount = product ? `₹${(product.price * quantity).toLocaleString('en-IN')}` : 'To be confirmed';

  const message = `✨ *NEW ORDER REQUEST - Knot & Nest by JP* ✨\n\n` +
    `*Customer:* ${fullName}\n` +
    `*Phone:* ${mobile}\n\n` +
    `📦 *Item:* ${productName}\n` +
    `🔢 *Quantity:* ${quantity}\n` +
    `🎨 *Colour/Variant:* ${colour}\n` +
    `✨ *Customisation:* ${customisation}\n` +
    `📍 *Delivery Address:* ${address}\n\n` +
    `💰 *Estimated Value:* ${totalAmount}\n\n` +
    `_Hello JP, I would like to place this handmade crochet order. Please confirm availability and payment details._`;

  const whatsappUrl = `https://wa.me/919876543210?text=${encodeURIComponent(message)}`;
  window.open(whatsappUrl, '_blank');
}

function showOrderSuccessModal(orderData) {
  let modalBackdrop = document.querySelector('#orderSuccessModal');
  if (!modalBackdrop) {
    modalBackdrop = document.createElement('div');
    modalBackdrop.id = 'orderSuccessModal';
    modalBackdrop.className = 'modal-backdrop';
    document.body.appendChild(modalBackdrop);
  }

  modalBackdrop.innerHTML = `
    <div class="modal-card" style="text-align: center;">
      <div style="width: 64px; height: 64px; border-radius: 50%; background: var(--color-sage-light); color: var(--color-sage-dark); display: inline-flex; align-items: center; justify-content: center; margin-bottom: 16px;">
        <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">
          <polyline points="20 6 9 17 4 12"></polyline>
        </svg>
      </div>

      <span class="eyebrow" style="margin-bottom: 4px;">Order Request Received</span>
      <h2 style="font-size: 1.85rem; margin-bottom: 12px;">Thank You, ${orderData.customer.fullName}!</h2>
      <p style="font-size: 0.95rem; margin-bottom: 20px;">
        Your handmade crochet order request <strong>#${orderData.orderRef}</strong> has been logged. Artisan JP will review your piece requirements and connect with you on WhatsApp/Email within 12 hours.
      </p>

      <div style="background: var(--color-bg-secondary); border-radius: 12px; padding: 18px; text-align: left; margin-bottom: 24px; font-size: 0.88rem; border: 1px solid var(--color-border);">
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: var(--color-text-muted);">Item:</span>
          <strong>${orderData.item.productName} (Qty: ${orderData.item.quantity})</strong>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: var(--color-text-muted);">Colour:</span>
          <span>${orderData.item.colour}</span>
        </div>
        <div style="display: flex; justify-content: space-between; margin-bottom: 8px;">
          <span style="color: var(--color-text-muted);">Total:</span>
          <strong style="color: var(--color-terracotta);">₹${orderData.totalAmount.toLocaleString('en-IN')}</strong>
        </div>
        <div style="display: flex; justify-content: space-between;">
          <span style="color: var(--color-text-muted);">Contact:</span>
          <span>${orderData.customer.mobile}</span>
        </div>
      </div>

      <div style="display: flex; gap: 12px; justify-content: center; flex-wrap: wrap;">
        <button type="button" class="btn btn-whatsapp" onclick="handleWhatsAppOrderSubmit()">
          Message JP on WhatsApp Now
        </button>
        <a href="products.html" class="btn btn-outline">
          Explore More Pieces
        </a>
      </div>
    </div>
  `;

  modalBackdrop.classList.add('active');
  document.body.style.overflow = 'hidden';
}
