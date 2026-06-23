(function () {
  const form       = document.getElementById('contactForm');
  const successMsg = document.getElementById('contactSuccess');
  const submitBtn  = document.getElementById('contactSubmitBtn');

  if (!form) return; 

  form.addEventListener('submit', function (e) {
    e.preventDefault();
    clearErrors();

    const name    = document.getElementById('contactName');
    const email   = document.getElementById('contactEmail');
    const type    = document.getElementById('contactType');
    const message = document.getElementById('contactMessage');

    let hasErrors = false;

    // Name must not be empty
    if (!name.value.trim()) {
      showError(name, 'Please enter your full name.');
      hasErrors = true;
    }

    // Email must be present and look valid
    if (!email.value.trim()) {
      showError(email, 'Please enter your email address.');
      hasErrors = true;
    } else if (!isValidEmail(email.value.trim())) {
      showError(email, 'Please enter a valid email address (e.g. you@example.com).');
      hasErrors = true;
    }

    // Enquiry type must be selected
    if (!type.value) {
      showError(type, 'Please select an enquiry type.');
      hasErrors = true;
    }

    //Message must not be empty
    if (!message.value.trim()) {
      showError(message, 'Please enter your message.');
      hasErrors = true;
    } else if (message.value.trim().length < 10) {
      showError(message, 'Your message is too short — please provide a bit more detail.');
      hasErrors = true;
    }

    if (hasErrors) return;

    // If all fields pass disable the button and show a loading state
    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending...';

    // After a second, hide the form and show the success message
    setTimeout(function () {
      form.style.display = 'none';
      if (successMsg) {
        successMsg.style.display = 'flex';
        successMsg.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    }, 1000);
  });

 
 // Basic email format check using a regular expression
  function isValidEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  // Attaches a red error message below a field
  function showError(field, message) {
    field.classList.add('is-invalid');
    const errorEl = document.createElement('div');
    errorEl.className = 'invalid-feedback d-block';
    errorEl.textContent = message;
    // Insert right after the field so it appears directly below it
    field.parentNode.appendChild(errorEl);
  }

  // Removes all validation error styling and messages
  function clearErrors() {
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
  }
})();