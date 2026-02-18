export function initContactForm(form) {
  form.addEventListener('submit', e => {
    e.preventDefault();
    let isValid = true;

    const nameInput = document.getElementById('name');
    const emailInput = document.getElementById('email');
    const messageInput = document.getElementById('message');

    clearErrors(form);

    if (nameInput.value.trim() === '') {
      showError(nameInput, 'Name is required.');
      isValid = false;
    }

    if (!isValidEmail(emailInput.value)) {
      showError(emailInput, 'Please enter a valid email address.');
      isValid = false;
    }

    if (messageInput.value.trim() === '') {
      showError(messageInput, 'Please enter your message.');
      isValid = false;
    }

    if (isValid) {
      alert('Thank you for contacting us! We will get back to you shortly.');
      form.reset();
    }
  });

  function showError(input, message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.style.color = '#d9534f';
    errorDiv.style.fontSize = '0.875rem';
    errorDiv.style.marginTop = '0.25rem';
    errorDiv.textContent = message;

    input.style.borderColor = '#d9534f';
    input.parentElement.appendChild(errorDiv);
  }

  function clearErrors(form) {
    const errors = form.querySelectorAll('.error-message');
    errors.forEach(error => error.remove());

    const inputs = form.querySelectorAll('input, textarea');
    inputs.forEach(input => (input.style.borderColor = ''));
  }

  function isValidEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }
}
