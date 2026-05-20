import { createOptimizedPicture } from '../../scripts/aem.js';

function showSlide(slides, controls, index) {
  slides.forEach((slide, i) => {
    slide.style.display = i === index ? '' : 'none';
  });
  controls.querySelectorAll('button').forEach((btn, i) => {
    btn.disabled = i === index;
  });
}

function createSlideControls(slides, currentIndex) {
  const controls = document.createElement('div');
  controls.className = 'carousel-dots';
  controls.setAttribute('aria-label', 'Carousel Slide Controls');
  slides.forEach((_, i) => {
    const btn = document.createElement('button');
    btn.textContent = `Show Slide ${i + 1} of ${slides.length}`;
    if (i === currentIndex) btn.disabled = true;
    btn.addEventListener('click', () => showSlide(slides, controls, i));
    controls.append(btn);
  });
  return controls;
}

export default function decorate(block) {
  const slides = [...block.children];
  if (slides.length < 2) return;

  const wrapper = document.createElement('div');
  wrapper.className = 'carousel-slides';

  slides.forEach((slide) => {
    slide.classList.add('carousel-slide');
    wrapper.append(slide);
  });

  wrapper.querySelectorAll('picture > img').forEach((img) => {
    img.closest('picture').replaceWith(
      createOptimizedPicture(img.src, img.alt, false, [{ width: '1200' }]),
    );
  });

  const prevBtn = document.createElement('button');
  prevBtn.textContent = 'Previous Slide';
  prevBtn.className = 'carousel-prev';

  const nextBtn = document.createElement('button');
  nextBtn.textContent = 'Next Slide';
  nextBtn.className = 'carousel-next';

  const nav = document.createElement('div');
  nav.className = 'carousel-nav';
  nav.append(prevBtn, nextBtn);

  const controls = createSlideControls(slides, 0);
  showSlide(slides, controls, 0);

  prevBtn.addEventListener('click', () => {
    const current = slides.findIndex((s) => s.style.display !== 'none');
    const prev = (current - 1 + slides.length) % slides.length;
    showSlide(slides, controls, prev);
  });

  nextBtn.addEventListener('click', () => {
    const current = slides.findIndex((s) => s.style.display !== 'none');
    const next = (current + 1) % slides.length;
    showSlide(slides, controls, next);
  });

  block.replaceChildren(wrapper, nav, controls);
}
