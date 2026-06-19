(function () {
  const form = document.getElementById('quickBookForm');
  if (!form) return; // Only run on pages that have this form

  
  const today = new Date().toISOString().split('T')[0];
  const checkInField  = document.getElementById('checkIn');
  const checkOutField = document.getElementById('checkOut');

  if (checkInField)  checkInField.setAttribute('min', today);
  if (checkOutField) checkOutField.setAttribute('min', today);

  // When the user picks a check-in date, update the check-out minimum
  checkInField.addEventListener('change', function () {
    const checkInDate = new Date(this.value);
    // The earliest check-out is the day after check-in
    checkInDate.setDate(checkInDate.getDate() + 1);
    const minCheckOut = checkInDate.toISOString().split('T')[0];
    checkOutField.setAttribute('min', minCheckOut);

    // If check-out is now before check-in, clear it
    if (checkOutField.value && checkOutField.value <= this.value) {
      checkOutField.value = '';
    }
  });

  form.addEventListener('submit', function (e) {
    e.preventDefault(); // Stop default page reload

    // Clear any previous error messages
    clearErrors();

    let hasErrors = false;

   
    if (!checkInField.value) {
      showError(checkInField, 'Please select a check-in date.');
      hasErrors = true;
    }

   
    if (!checkOutField.value) {
      showError(checkOutField, 'Please select a check-out date.');
      hasErrors = true;
    }

    
    if (checkInField.value && checkOutField.value) {
      if (checkOutField.value <= checkInField.value) {
        showError(checkOutField, 'Check-out must be after check-in.');
        hasErrors = true;
      }
    }

    if (!hasErrors) {
      const params = new URLSearchParams({
        checkIn:  checkInField.value,
        checkOut: checkOutField.value,
        guests:   document.getElementById('guests').value,
        type:     document.getElementById('roomType').value
      });
      window.location.href = 'pages/rooms.html?' + params.toString();
    }
  });

  
  function showError(field, message) {
    field.classList.add('is-invalid');
    const errorEl = document.createElement('div');
    errorEl.className = 'invalid-feedback d-block';
    errorEl.textContent = message;
    field.parentNode.appendChild(errorEl);
  }

  
  function clearErrors() {
    form.querySelectorAll('.is-invalid').forEach(el => el.classList.remove('is-invalid'));
    form.querySelectorAll('.invalid-feedback').forEach(el => el.remove());
  }
})();