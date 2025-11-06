(() => {
  // Loader time/date
  const loader = document.getElementById('global-loader');
  const loaderDatetime = document.getElementById('loader-datetime');
  const content = document.getElementById('main-content') || document.getElementById('main') || document.querySelector('.content');

  function updateLoaderTime() {
    const now = new Date();
    if (loaderDatetime) loaderDatetime.textContent = now.toLocaleDateString() + ' - ' + now.toLocaleTimeString();
  }
  updateLoaderTime();
  const dtInterval = setInterval(updateLoaderTime, 1000);

  const start = Date.now();
  const MIN = 600;
  window.addEventListener('load', () => {
    const elapsed = Date.now() - start;
    const wait = Math.max(MIN - elapsed, 0);
    setTimeout(() => {
      if (loader) loader.style.opacity = '0';
      setTimeout(() => { if (loader) loader.style.display = 'none'; }, 700);
      if (content) { content.style.opacity = '1'; content.style.transform = 'translateY(0)'; }
      clearInterval(dtInterval);
      animateSkills();
      startSnow();
    }, wait);
  });

  function animateSkills() {
    const skillFills = document.querySelectorAll('.skill-fill');
    skillFills.forEach(el => {
      const w = el.getAttribute('data-width') || '0%';
      el.style.width = w;
    });
  }

  // Snow effect: corrected
  function startSnow() {
    const total = 45;
    for (let i = 0; i < total; i++) createSnowflake();
    setInterval(() => createSnowflake(), 700);
  }

  function createSnowflake() {
    const s = document.createElement('div');
    s.className = 'snowflake';
    s.textContent = '❄';
    const size = Math.random() * 12 + 10;
    s.style.fontSize = size + 'px';
    s.style.position = 'fixed';
    s.style.top = '-30px'; // start above the viewport
    s.style.left = Math.random() * window.innerWidth + 'px';
    s.style.opacity = (Math.random() * 0.6 + 0.2).toString();
    s.style.pointerEvents = 'none';
    const duration = Math.random() * 8 + 6;
    s.style.transition = `transform ${duration}s linear, top ${duration}s linear`;
    document.body.appendChild(s);

    // Trigger fall
    requestAnimationFrame(() => {
      s.style.top = window.innerHeight + 30 + 'px';
      s.style.transform = `rotate(${Math.random()*360}deg)`;
    });

    // Remove snowflake after animation
    setTimeout(() => s.remove(), duration * 1000);
  }

  // contact form (fake submit)
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', function (e) {
      e.preventDefault();
      const btn = form.querySelector('button[type="submit"]');
      if (btn) { btn.disabled = true; btn.textContent = 'Sending...'; }
      setTimeout(() => {
        alert('Thanks — message sent (demo). I will get back to you soon.');
        form.reset();
        if (btn) { btn.disabled = false; btn.textContent = 'Send Message'; }
      }, 900);
    });
  }

  // set current year
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

})();
