// ============ FitLife Modern JS ============

// Mobile nav toggle
const toggle = document.getElementById('toggle');
const nav = document.getElementById('nav');
toggle.addEventListener('click', () => {
  toggle.classList.toggle('active');
  nav.classList.toggle('open');
});
document.querySelectorAll('.nav-link').forEach(a =>
  a.addEventListener('click', () => {
    toggle.classList.remove('active');
    nav.classList.remove('open');
  })
);

// Header scroll + scroll progress + back-to-top
const header = document.getElementById('header');
const progress = document.getElementById('scrollProgress');
const toTop = document.getElementById('toTop');
window.addEventListener('scroll', () => {
  const h = document.documentElement;
  const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  progress.style.width = scrolled + '%';
  header.classList.toggle('scrolled', h.scrollTop > 30);
  toTop.classList.toggle('show', h.scrollTop > 400);
});

// Active nav highlighting
const sections = document.querySelectorAll('section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const spy = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        const id = e.target.id;
        navLinks.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + id));
      }
    });
  },
  { rootMargin: '-45% 0px -50% 0px' }
);
sections.forEach(s => spy.observe(s));

// Reveal on scroll
const revealObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('visible');
        revealObs.unobserve(e.target);
      }
    });
  },
  { threshold: 0.12 }
);
document.querySelectorAll('.reveal').forEach(el => revealObs.observe(el));

// Typing effect
const typingEl = document.getElementById('typing');
const phrases = ['Train Hard.', 'Stay Strong.', 'Live Fit.', 'Push Limits.'];
let pi = 0, ci = 0, deleting = false;
function type() {
  const current = phrases[pi];
  typingEl.textContent = current.slice(0, ci);
  if (!deleting && ci < current.length) {
    ci++; setTimeout(type, 90);
  } else if (deleting && ci > 0) {
    ci--; setTimeout(type, 45);
  } else {
    deleting = !deleting;
    if (!deleting) pi = (pi + 1) % phrases.length;
    setTimeout(type, deleting ? 1400 : 300);
  }
}
type();

// Animated counters
const counters = document.querySelectorAll('[data-count]');
const counterObs = new IntersectionObserver(
  entries => {
    entries.forEach(e => {
      if (!e.isIntersecting) return;
      const el = e.target;
      const target = +el.dataset.count;
      const dur = 1600;
      const start = performance.now();
      function tick(now) {
        const p = Math.min((now - start) / dur, 1);
        el.textContent = Math.floor(p * target).toLocaleString() + (p === 1 ? '+' : '');
        if (p < 1) requestAnimationFrame(tick);
      }
      requestAnimationFrame(tick);
      counterObs.unobserve(el);
    });
  },
  { threshold: 0.5 }
);
counters.forEach(c => counterObs.observe(c));

// Contact form
const form = document.getElementById('contactForm');
const msg = document.getElementById('formMsg');
form.addEventListener('submit', e => {
  e.preventDefault();
  const data = new FormData(form);
  if (!data.get('name') || !data.get('email')) {
    msg.style.color = '#ff6a6a';
    msg.textContent = 'Please fill in your name and email.';
    return;
  }
  msg.style.color = '#7CFC00';
  msg.textContent = `Thanks ${data.get('name')}! We'll be in touch shortly. 💪`;
  form.reset();
  setTimeout(() => (msg.textContent = ''), 5000);
});

// Year
document.getElementById('year').textContent = new Date().getFullYear();
