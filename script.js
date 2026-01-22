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

let startX = 0;
let endX = 0;

carousel.addEventListener("touchstart", e => {
  startX = e.touches[0].clientX;
});

carousel.addEventListener("touchend", e => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const threshold = 50;

  if (startX - endX > threshold) {
    nextSlide();
    startAutoSlide();
  } else if (endX - startX > threshold) {
    prevSlide();
    startAutoSlide();
  }
}

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

// Dark Mode Toggle
const darkModeBtn = document.getElementById("darkModeToggle");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  // Toggle icon on button
  if (document.body.classList.contains("dark-mode")) {
    darkModeBtn.textContent = "☀️"; // switch to sun for light mode
  } else {
    darkModeBtn.textContent = "🌙"; // moon for dark mode
  }
});

// // Load saved preference
// if (localStorage.getItem("darkMode") === "enabled") {
//   document.body.classList.add("dark-mode");
//   darkModeBtn.textContent = "☀️";
// }

// // Save preference on toggle
// darkModeBtn.addEventListener("click", () => {
//   document.body.classList.toggle("dark-mode");
//   if (document.body.classList.contains("dark-mode")) {
//     darkModeBtn.textContent = "☀️";
//     localStorage.setItem("darkMode", "enabled");
//   } else {
//     darkModeBtn.textContent = "🌙";
//     localStorage.setItem("darkMode", "disabled");
//   }
// });
