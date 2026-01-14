const currentYear = new Date();

const setDate = document.querySelector('#current-year');
setDate.textContent = currentYear.getFullYear();

document.addEventListener('DOMContentLoaded', function () {
  if (setDate) {
    setDate.textContent = new Date().getFullYear();
  }
  const lastModified = document.getElementById('last-modified');
  if (lastModified) {
    lastModified.textContent = `Last Modified: ${document.lastModified}`;
  }
});
