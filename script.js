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

const carousel = document.querySelector(".carousel");
const images = carousel.querySelectorAll("img");
const prevBtn = carousel.querySelector(".prev");
const nextBtn = carousel.querySelector(".next");

let index = 0;
let intervalId = null;

function showImage(i) {
  images.forEach((img, idx) => {
    img.classList.toggle("active", idx === i);
  });
}

function nextSlide() {
  index = (index + 1) % images.length;
  showImage(index);
}

function prevSlide() {
  index = (index - 1 + images.length) % images.length;
  showImage(index);
}

function startAutoSlide() {
  stopAutoSlide(); // ✅ prevent duplicates
  intervalId = setInterval(nextSlide, 4000);
}

function stopAutoSlide() {
  if (intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
}

nextBtn.addEventListener("click", () => {
  nextSlide();
  startAutoSlide();
});

prevBtn.addEventListener("click", () => {
  prevSlide();
  startAutoSlide();
});

carousel.addEventListener("mouseenter", stopAutoSlide);
carousel.addEventListener("mouseleave", startAutoSlide);

showImage(index);
startAutoSlide();

