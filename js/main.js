document.addEventListener("DOMContentLoaded", () => {
  const hamburgerBtn = document.getElementById('hamburger-btn');
  const overlay = document.getElementById('nav-overlay');

  hamburgerBtn.addEventListener('click', () => {
    overlay.classList.toggle('active');
    
    const icon = hamburgerBtn.querySelector('i');
    icon.classList.toggle('fa-bars');
    icon.classList.toggle('fa-xmark');

    document.body.classList.toggle('no-scroll');
  });

  overlay.addEventListener('click', (e) => {
    if (e.target.id === 'nav-overlay' || e.target.tagName === 'A') {
      overlay.classList.remove('active');
      const icon = hamburgerBtn.querySelector('i');
      icon.classList.add('fa-bars');
      icon.classList.remove('fa-xmark');
      document.body.classList.remove('no-scroll');
    }
  });

  // --- Masonry Script ---
const grid = document.getElementById('masonry');

function setSpan(item, img) {
  const rowHeight = parseInt(getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const gap = parseInt(getComputedStyle(grid).getPropertyValue('gap'));

  // Use naturalHeight if bounding box fails
  const imgHeight = img.naturalHeight * (img.width / img.naturalWidth) || img.getBoundingClientRect().height;
  const span = Math.ceil((imgHeight + gap) / (rowHeight + gap));
  item.style.gridRowEnd = 'span ' + span;
}

function resizeAll() {
  grid.querySelectorAll('.book__item img').forEach(img => {
    setSpan(img.parentElement, img);
  });
}

window.addEventListener('load', resizeAll);
window.addEventListener('resize', resizeAll);

  grid.querySelectorAll('img').forEach(img => {
    if (img.complete) setSpan(img.closest('.masonry-item'));
    else img.addEventListener('load', () => setSpan(img.closest('.masonry-item')));
  });
});

// Lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightbox-img');
const close = () => lb.classList.remove('is-open');

document.querySelectorAll('.book__item img').forEach(img => {
  img.addEventListener('click', () => {
    lbImg.src = img.src;
    lb.classList.add('is-open');
  });
});

lb.addEventListener('click', e => {
  if (e.target === lb || e.target.matches('.lightbox__close')) close();
});

window.addEventListener('keydown', e => {
  if (e.key === 'Escape') close();
});