import { items } from '../data/items.mjs';

const container = document.getElementById('discover-grid');

// Render Cards
if (container) {
  items.forEach(item => {
    const card = document.createElement('div');
    card.className = 'discover-card';

    const title = document.createElement('h2');
    title.textContent = item.name;

    const figure = document.createElement('figure');
    const img = document.createElement('img');
    img.src = item.image;
    img.alt = item.name;
    img.width = 300;
    img.height = 200;
    img.loading = 'lazy';
    figure.appendChild(img);

    const address = document.createElement('address');
    address.textContent = item.address;

    const desc = document.createElement('p');
    desc.textContent = item.description;

    const btn = document.createElement('button');
    btn.textContent = 'Learn More';
    btn.className = 'learn-more-btn';

    card.appendChild(title);
    card.appendChild(figure);
    card.appendChild(address);
    card.appendChild(desc);
    card.appendChild(btn);

    container.appendChild(card);
  });
}

// Visitor Message Logic
const messageArea = document.getElementById('visitor-message');
const lastVisit = localStorage.getItem('lastVisit');
const now = Date.now();

if (messageArea) {
  if (!lastVisit) {
    messageArea.textContent = 'Welcome! Let us know if you have any questions.';
  } else {
    const msPerDay = 24 * 60 * 60 * 1000;
    const timeDiff = now - parseInt(lastVisit);

    if (timeDiff < msPerDay) {
      messageArea.textContent = 'Back so soon! Awesome!';
    } else {
      const days = Math.floor(timeDiff / msPerDay);
      messageArea.textContent = `You last visited ${days} ${days === 1 ? 'day' : 'days'} ago.`;
    }
  }
}

// Store current visit
localStorage.setItem('lastVisit', now);
