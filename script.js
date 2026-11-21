const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.navbar nav');

toggle.addEventListener('click', () => {
  const isOpen = nav.classList.toggle('open');
  toggle.textContent = isOpen ? '✕' : '☰';
  toggle.setAttribute('aria-expanded', isOpen);
});

nav.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    toggle.textContent = '☰';
    toggle.setAttribute('aria-expanded', 'false');
  });
});

const filterButtons = document.querySelectorAll('.filter');
const items = document.querySelectorAll('.gallery-item');

filterButtons.forEach(button => {
  button.addEventListener('click', () => {
    filterButtons.forEach(b => b.classList.remove('active'));
    button.classList.add('active');

    const selected = button.dataset.filter;

    items.forEach(item => {
      const matches = selected === 'all' || item.dataset.category === selected;
      item.classList.toggle('hide', !matches);
    });
  });
});

// Collection cards open the matching filter
document.querySelectorAll('.collection-card').forEach(card => {
  card.addEventListener('click', () => {
    const button = document.querySelector(`.filter[data-filter="${card.dataset.filter}"]`);
    if (button) button.click();
  });
});

const lightbox = document.getElementById('lightbox');
const lightboxImg = lightbox.querySelector('img');
const lightboxCaption = lightbox.querySelector('.lightbox-caption');

function openLightbox(item) {
  const img = item.querySelector('img');
  lightboxImg.src = img.src;
  lightboxImg.alt = img.alt;
  lightboxCaption.textContent = item.querySelector('figcaption').textContent;
  lightbox.classList.add('open');
  lightbox.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('open');
  lightbox.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

items.forEach(item => {
  item.addEventListener('click', () => openLightbox(item));
});

lightbox.addEventListener('click', event => {
  if (event.target !== lightboxImg) closeLightbox();
});

document.addEventListener('keydown', event => {
  if (event.key === 'Escape') closeLightbox();
});