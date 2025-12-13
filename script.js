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
