const button = document.querySelector('.menu-button');
const nav = document.querySelector('.nav');
if (button && nav) {
  button.addEventListener('click', () => {
    const open = nav.classList.toggle('open');
    button.setAttribute('aria-expanded', String(open));
  });
  nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open');
    button.setAttribute('aria-expanded', 'false');
  }));
}


const lightbox = document.getElementById('lightbox');
const lightboxLinks = Array.from(document.querySelectorAll('.lightbox-link'));
if (lightbox && lightboxLinks.length) {
  const image = lightbox.querySelector('img');
  const caption = lightbox.querySelector('figcaption');
  const closeBtn = lightbox.querySelector('.lightbox-close');
  const prevBtn = lightbox.querySelector('.lightbox-prev');
  const nextBtn = lightbox.querySelector('.lightbox-next');
  let currentIndex = 0;
  let lastFocused = null;

  const show = (index) => {
    currentIndex = (index + lightboxLinks.length) % lightboxLinks.length;
    const link = lightboxLinks[currentIndex];
    image.src = link.href;
    image.alt = link.querySelector('img')?.alt || '확대 이미지';
    caption.textContent = link.dataset.caption || link.querySelector('span')?.textContent || image.alt;
  };
  const openLightbox = (index, trigger) => {
    lastFocused = trigger;
    show(index);
    lightbox.hidden = false;
    document.body.classList.add('lightbox-open');
    closeBtn.focus();
  };
  const closeLightbox = () => {
    lightbox.hidden = true;
    document.body.classList.remove('lightbox-open');
    image.src = '';
    lastFocused?.focus();
  };

  lightboxLinks.forEach((link, index) => link.addEventListener('click', (event) => {
    event.preventDefault();
    openLightbox(index, link);
  }));
  closeBtn.addEventListener('click', closeLightbox);
  prevBtn.addEventListener('click', () => show(currentIndex - 1));
  nextBtn.addEventListener('click', () => show(currentIndex + 1));
  lightbox.addEventListener('click', (event) => { if (event.target === lightbox) closeLightbox(); });
  document.addEventListener('keydown', (event) => {
    if (lightbox.hidden) return;
    if (event.key === 'Escape') closeLightbox();
    if (event.key === 'ArrowLeft') show(currentIndex - 1);
    if (event.key === 'ArrowRight') show(currentIndex + 1);
  });
}
