// DOM Ready
document.addEventListener('DOMContentLoaded', function () {

  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // Theme Toggle Logic
  const themeToggle = document.querySelector('.theme-toggle');
  const body = document.body;
  const icon = themeToggle ? themeToggle.querySelector('i') : null;

  // Check saved preference
  if (localStorage.getItem('theme') === 'light') {
    body.classList.add('light-mode');
    if (icon) icon.classList.replace('fa-moon', 'fa-sun');
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('light-mode');
      const isLight = body.classList.contains('light-mode');

      // Update icon
      if (icon) {
        if (isLight) {
          icon.classList.replace('fa-moon', 'fa-sun');
        } else {
          icon.classList.replace('fa-sun', 'fa-moon');
        }
      }

      // Save preference
      localStorage.setItem('theme', isLight ? 'light' : 'dark');
    });
  }

  // Mobile menu toggle
  const menuToggle = document.querySelector('.menu-toggle');
  const navMenu = document.querySelector('.nav-menu');

  if (menuToggle) {
    menuToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      menuToggle.innerHTML = navMenu.classList.contains('active')
        ? '<i class="fas fa-times"></i>'
        : '<i class="fas fa-bars"></i>';
    });
  }

  // Close mobile menu when clicking a link
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('active');
      if (menuToggle) menuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    });
  });

  // Smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: 'smooth'
        });
      }
    });
  });



  // Optional: Add hover 3D effect to glass cards (Tilt)
  const cards = document.querySelectorAll('.glass-card');
  cards.forEach(card => {
    card.addEventListener('mousemove', (e) => {
      const rect = card.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      card.style.setProperty('--x', `${x}px`);
      card.style.setProperty('--y', `${y}px`);
    });
  });

  // Form Submission Logic (EmailJS)
  const contactForm = document.querySelector('#contact-form');
  if (contactForm) {
    // Initialize EmailJS
    emailjs.init("4iHZXwc5CwaA4rhy7");

    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = contactForm.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;
      btn.innerHTML = 'Sending...';

      // 1. Send Admin Notification (To You) - template_7ax787b
      emailjs.sendForm('service_c8o0zus', 'template_7ax787b', contactForm)
        .then(() => {
          // 2. Send Auto-Reply (To Visitor) - template_1t69z8h
          // We use .send() here to reuse the form data explicitly if needed, or just sendForm again
          emailjs.sendForm('service_c8o0zus', 'template_1t69z8h', contactForm);
        })
        .then(() => {
          // Success after both (or mostly after first)
          btn.innerHTML = 'Sent! <i class="fas fa-check"></i>';
          window.location.href = "success.html";
        })
        .catch((error) => {
          btn.innerHTML = originalText;
          console.error('EmailJS Error:', error);
          alert('Failed to send message. Did you add the Public Key to script.js? Error: ' + JSON.stringify(error));
        });
    });
  }

  console.log("%c✨ System Online: Gajaananth Portfolio v2.0", "color: #00f2ff; font-weight: bold; font-size: 14px;");
});