// Scroll reveal for sections/cards
document.addEventListener('DOMContentLoaded', () => {
  const targets = document.querySelectorAll(
    '.project-card, .skill-card, .about-grid, .goal-quote'
  );
  targets.forEach(el => el.classList.add('reveal'));

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach(el => observer.observe(el));

  // Active nav link highlight (optional subtle UX)
  const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
  const sections = Array.from(navLinks)
    .map(link => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  const navObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const id = entry.target.id;
      const link = document.querySelector(`.nav-links a[href="#${id}"]`);
      if (!link) return;
      if (entry.isIntersecting) {
        navLinks.forEach(l => l.style.color = '');
        link.style.color = 'var(--orange-deep)';
      }
    });
  }, { threshold: 0.4, rootMargin: '-80px 0px -50% 0px' });

  sections.forEach(sec => navObserver.observe(sec));
});
