document.addEventListener('DOMContentLoaded', () => {
  const timestampField = document.getElementById('timestamp');
  if (timestampField) {
    timestampField.value = new Date().toISOString();
  }

  // Modal Logic
  const openButtons = document.querySelectorAll('.open-modal');
  const closeButtons = document.querySelectorAll('.close-modal');

  openButtons.forEach(button => {
    button.addEventListener('click', event => {
      event.preventDefault();
      const modalId = button.getAttribute('data-modal');
      const modal = document.getElementById(modalId);
      modal.showModal();
    });
  });

  closeButtons.forEach(button => {
    button.addEventListener('click', () => {
      button.closest('dialog').close();
    });
  });
});
