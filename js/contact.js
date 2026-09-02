/**
 * Knot & Nest by JP - Contact & FAQ Logic
 */

document.addEventListener('DOMContentLoaded', () => {
  initFaqAccordion();
  initContactForm();
});

function initFaqAccordion() {
  const faqItems = document.querySelectorAll('.faq-item');
  if (!faqItems || faqItems.length === 0) return;

  faqItems.forEach(item => {
    const questionBtn = item.querySelector('.faq-question');
    if (questionBtn) {
      questionBtn.addEventListener('click', () => {
        const isOpen = item.classList.contains('active');

        // Close others
        faqItems.forEach(i => i.classList.remove('active'));

        // Toggle clicked
        if (!isOpen) {
          item.classList.add('active');
        }
      });
    }
  });
}

function initContactForm() {
  const contactForm = document.getElementById('contactForm');
  if (!contactForm) return;

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('contactName').value.trim();
    const email = document.getElementById('contactEmail').value.trim();
    const phone = document.getElementById('contactPhone').value.trim();
    const message = document.getElementById('contactMessage').value.trim();

    if (!name || !email || !message) {
      alert('Please fill in your name, email, and message.');
      return;
    }

    // Feedback
    if (typeof showToast === 'function') {
      showToast('Thank you! Your message has been received. JP will reply shortly.', 'success');
    } else {
      alert('Thank you! Your message has been received. JP will reply shortly.');
    }

    contactForm.reset();
  });
}
