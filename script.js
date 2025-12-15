document.querySelectorAll('nav a').forEach(a=>{
  a.addEventListener('click', e=>{
    e.preventDefault();
    const id = a.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth', block:'start'});
  });
});

const form = document.querySelector('form[name="contact"]');
const status = document.getElementById('form-status');
if (form) {
  form.addEventListener('submit', async (e) => {
    e.preventDefault();
    status.textContent = 'Sending…';
    const data = new FormData(form);
    try {
      await fetch('/', { method: 'POST', body: data });
      status.textContent = "Thanks — I'll get back to you soon.";
      form.reset();
    } catch (err) {
      status.textContent = 'Error sending message. Try again later.';
    }
  });
}

const carousels = document.querySelectorAll('[data-carousel]');

carousels.forEach(carousel => {
  const images = carousel.querySelectorAll('img');
  const prevBtn = carousel.querySelector('.prev');
  const nextBtn = carousel.querySelector('.next');

  let index = 0;

  function showImage(i) {
    images.forEach(img => img.classList.remove('active'));
    images[i].classList.add('active');
  }

  prevBtn.addEventListener('click', () => {
    index = (index - 1 + images.length) % images.length;
    showImage(index);
  });

  nextBtn.addEventListener('click', () => {
    index = (index + 1) % images.length;
    showImage(index);
  });

  setInterval(() => {
  index = (index + 1) % images.length;
  showImage(index);
}, 4000);

let interval = setInterval(nextSlide, 4000);

carousel.addEventListener('mouseenter', () => clearInterval(interval));
carousel.addEventListener('mouseleave', () => {
  interval = setInterval(nextSlide, 4000);
});

function nextSlide() {
  index = (index + 1) % images.length;
  showImage(index);
}
});

