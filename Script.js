// ============================================
//   BrightMinds Tuition Website — script.js
// ============================================

// ---- 1. HAMBURGER MENU (Mobile Navigation) ----
const hamburger = document.getElementById('hamburger');
const navLinks  = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  hamburger.classList.toggle('active');
});

// Close menu when a nav link is clicked
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.classList.remove('active');
  });
});


// ---- 2. NAVBAR SHADOW ON SCROLL ----
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
  if (window.scrollY > 20) {
    navbar.style.boxShadow = '0 4px 20px rgba(0,0,0,0.12)';
  } else {
    navbar.style.boxShadow = '0 2px 8px rgba(0,0,0,0.08)';
  }

  // Show/hide scroll-to-top button
  const scrollBtn = document.getElementById('scrollTop');
  if (window.scrollY > 400) {
    scrollBtn.classList.add('visible');
  } else {
    scrollBtn.classList.remove('visible');
  }
});


// ---- 3. SCROLL TO TOP ----
function scrollToTop() {
  window.scrollTo({ top: 0, behavior: 'smooth' });
}


// ---- 4. DEMO FORM → WHATSAPP ----
function handleFormSubmit(event) {
  event.preventDefault();

  // Get form values
  const parentName   = document.getElementById('parentName').value.trim();
  const phone        = document.getElementById('phone').value.trim();
  const studentClass = document.getElementById('studentClass').value;
  const subject      = document.getElementById('subject').value;

  // Simple validation
  if (!parentName) {
    showAlert('Please enter the Parent\'s Name.', 'error');
    return;
  }
  if (!phone || phone.length < 10) {
    showAlert('Please enter a valid 10-digit Phone Number.', 'error');
    return;
  }
  if (!studentClass) {
    showAlert('Please select the Student\'s Class.', 'error');
    return;
  }
  if (!subject) {
    showAlert('Please select a Subject.', 'error');
    return;
  }

  // Build WhatsApp message
  const message =
    `Hello! I want to book a FREE Demo Class.%0A%0A` +
    `👤 *Parent Name:* ${parentName}%0A` +
    `📞 *Phone:* ${phone}%0A` +
    `📚 *Student Class:* ${studentClass}%0A` +
    `📖 *Subject:* ${subject}%0A%0A` +
    `Please contact me at your earliest convenience. Thank you!`;

  // Replace with your actual WhatsApp number (country code + number, no + or spaces)
  const whatsappNumber = '919140571245';
  const whatsappURL    = `https://wa.me/${whatsappNumber}?text=${message}`;

  // Show success message
  showAlert('Redirecting to WhatsApp... 🎉', 'success');

  // Open WhatsApp after a short delay
  setTimeout(() => {
    window.open(whatsappURL, '_blank');
  }, 1000);
}


// ---- 5. SIMPLE ALERT / TOAST NOTIFICATION ----
function showAlert(message, type) {
  // Remove any existing alert
  const existing = document.getElementById('toast-alert');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'toast-alert';
  toast.textContent = message;

  // Inline styles for the toast
  Object.assign(toast.style, {
    position:     'fixed',
    bottom:       '90px',
    right:        '28px',
    padding:      '14px 22px',
    borderRadius: '12px',
    fontSize:     '0.95rem',
    fontFamily:   "'Nunito', sans-serif",
    fontWeight:   '700',
    color:        'white',
    background:   type === 'success' ? '#22c55e' : '#ef4444',
    boxShadow:    '0 4px 20px rgba(0,0,0,0.2)',
    zIndex:       '9999',
    opacity:      '0',
    transform:    'translateY(10px)',
    transition:   'all 0.3s ease',
  });

  document.body.appendChild(toast);

  // Animate in
  requestAnimationFrame(() => {
    toast.style.opacity   = '1';
    toast.style.transform = 'translateY(0)';
  });

  // Auto remove after 3 seconds
  setTimeout(() => {
    toast.style.opacity   = '0';
    toast.style.transform = 'translateY(10px)';
    setTimeout(() => toast.remove(), 300);
  }, 3000);
}


// ---- 6. SMOOTH CARD ENTRY ANIMATION (Intersection Observer) ----
const animatedElements = document.querySelectorAll(
  '.card, .subject-card, .teacher-card, .testimonial-card'
);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry, index) => {
      if (entry.isIntersecting) {
        // Stagger the animation slightly
        setTimeout(() => {
          entry.target.style.opacity   = '1';
          entry.target.style.transform = 'translateY(0)';
        }, index * 80);
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1 }
);

animatedElements.forEach(el => {
  el.style.opacity   = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});