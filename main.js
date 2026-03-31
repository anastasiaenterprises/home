// ============================================================
// ANASTASIA ENTERPRISES — main.js
// Scroll reveal + Formspree AJAX submission
// ============================================================

// --- Scroll Reveal -------------------------------------------
const revealEls = document.querySelectorAll(
  '.about-text, .about-visual, .service-block, .contact-info, ' +
  '.contact-form-wrap, .preview-card, .cta-content, .stats-bar, ' +
  '.service-block'
);

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = (i * 0.04) + 's';
      entry.target.classList.add('visible');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

revealEls.forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// --- Nav scroll state ----------------------------------------
const nav = document.querySelector('.nav');
window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    nav.style.background = 'rgba(8, 9, 10, 0.97)';
  } else {
    nav.style.background = 'rgba(8, 9, 10, 0.88)';
  }
}, { passive: true });

// --- Formspree AJAX ------------------------------------------
const form = document.getElementById('contact-form');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const submitBtn = form.querySelector('.btn-submit');
    const successEl = document.getElementById('form-success');
    const errorEl   = document.getElementById('form-error');

    submitBtn.disabled = true;
    submitBtn.querySelector('.btn-text').textContent = 'Sending…';

    try {
      const data = new FormData(form);
      const res  = await fetch(form.action, {
        method: 'POST',
        body: data,
        headers: { 'Accept': 'application/json' }
      });

      if (res.ok) {
        form.reset();
        successEl.style.display = 'block';
        errorEl.style.display   = 'none';
        submitBtn.style.display = 'none';
      } else {
        throw new Error('Server responded with ' + res.status);
      }
    } catch (err) {
      errorEl.style.display   = 'block';
      successEl.style.display = 'none';
      submitBtn.disabled = false;
      submitBtn.querySelector('.btn-text').textContent = 'Send Inquiry';
    }
  });
}
