document.addEventListener('DOMContentLoaded', () => {
  const urlParams = new URLSearchParams(window.location.search);
  const resultsContainer = document.getElementById('results');

  if (resultsContainer) {
    const showInfo = (label, key) => {
      const value = urlParams.get(key);
      if (value) {
        const p = document.createElement('p');
        p.innerHTML = `<strong>${label}:</strong> ${value}`;
        resultsContainer.appendChild(p);
      }
    };

    showInfo('First Name', 'firstName');
    showInfo('Last Name', 'lastName');
    showInfo('Email', 'email');
    showInfo('Mobile Phone', 'phone');
    showInfo('Business Name', 'organization');

    const timestamp = urlParams.get('timestamp');
    if (timestamp) {
      const date = new Date(timestamp);
      const p = document.createElement('p');
      p.innerHTML = `<strong>Date Submitted:</strong> ${date.toLocaleString()}`;
      resultsContainer.appendChild(p);
    }
  }
});
