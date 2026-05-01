document.addEventListener('DOMContentLoaded', function () {
  const btn = document.getElementById('cta-register');
  if (btn) {
    btn.addEventListener('click', function (e) {
      // Placeholder action — replace with registration flow
      e.preventDefault();
      alert('Thanks for your interest — customize this action.');
    });
  }

  // Initialize Owl Carousel if available
  if (window.jQuery && typeof jQuery.fn.owlCarousel === 'function') {
    const $carousels = jQuery('#hero-carousel, #university-gallery');
    if ($carousels.length > 0) {
      //console.log('Found ' + $carousels.length + ' carousels, initializing...');
      $carousels.owlCarousel({
        items: 1,
        loop: true,
        margin: 10,
        nav: false, // Turned off nav arrows if they look messy
        dots: true,
        autoplay: true,
        autoplayTimeout: 3000, // Reduced for faster feedback
        autoplayHoverPause: true,
        animateOut: 'fadeOut', // Smoother transition
        smartSpeed: 450
      });
    } else {
      console.log('No carousels found to initialize.');
    }
  } else {
    console.log('jQuery or OwlCarousel library not loaded.');
  }

  // Navbar shadow on scroll
  const navbar = document.querySelector('.navbar');
  const onScroll = () => {
    if (window.scrollY > 10) navbar.classList.add('scrolled'); else navbar.classList.remove('scrolled');
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  // Smooth scroll for internal links
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', function (e) {
      if (this.classList.contains('dropdown-toggle')) {
        e.preventDefault();
        return;
      }

      const href = this.getAttribute('href');

      if (href === '#') {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
      } else if (href.length > 1) {
        const el = document.querySelector(href);
        if (el) { e.preventDefault(); el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
      }

      // Update active nav-link
      if (this.classList.contains('nav-link')) {
        document.querySelectorAll('.nav-link').forEach(link => link.classList.remove('active'));
        this.classList.add('active');

        // Close mobile navbar if open
        const navbarCollapse = document.querySelector('.navbar-collapse');
        if (navbarCollapse && navbarCollapse.classList.contains('show')) {
          if (typeof bootstrap !== 'undefined') {
            const bsCollapse = bootstrap.Collapse.getInstance(navbarCollapse);
            if (bsCollapse) bsCollapse.hide();
          }
        }
      }
    });
  });

  // Reveal on scroll using IntersectionObserver
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  // --- Conference Countdown Logic ---
  const targetDate = new Date('Nov 19, 2026 09:00:00').getTime();
 
  function updateCountdown() {
    const now = new Date().getTime();
    const distance = targetDate - now;

    if (distance < 0) {
      const floatEl = document.getElementById('countdown-float');
      if (floatEl) floatEl.innerHTML = '<div class="countdown-header-mini">CONFERENCE LIVE</div>';
      return;
    }

    const d = Math.floor(distance / (1000 * 60 * 60 * 24));
    const h = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const m = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const s = Math.floor((distance % (1000 * 60)) / 1000);

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    if (daysEl) daysEl.innerText = d.toString().padStart(2, '0');
    if (hoursEl) hoursEl.innerText = h.toString().padStart(2, '0');
    if (minutesEl) minutesEl.innerText = m.toString().padStart(2, '0');
    if (secondsEl) secondsEl.innerText = s.toString().padStart(2, '0');
  }

  setInterval(updateCountdown, 1000);
  updateCountdown(); // Initial call
});
