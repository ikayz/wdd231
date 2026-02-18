export async function initTipOfTheDay() {
  const container = document.getElementById('tip-content');

  try {
    const response = await fetch('data/daily-tips.json');
    if (!response.ok) throw new Error('Failed to load tips');
    const tips = await response.json();

    const randomTip = tips[Math.floor(Math.random() * tips.length)];

    container.innerHTML = `
        <img src="${randomTip.image}" alt="${randomTip.title}" width="300" height="200">
        <div class="tip-details">
            <h3>${randomTip.title}</h3>
            <p>${randomTip.summary}</p>
            <a href="#" id="read-more-tip">Read More</a>
        </div>
    `;

    const modal = document.getElementById('tip-modal');
    const modalTitle = document.getElementById('modal-title');
    const modalBody = document.getElementById('modal-body');
    const closeBtn = document.querySelector('.close-modal');
    const readMoreBtn = document.getElementById('read-more-tip');

    readMoreBtn.addEventListener('click', e => {
      e.preventDefault();
      modalTitle.textContent = randomTip.title;
      modalBody.innerHTML = `<p>${randomTip.details}</p>`;
      modal.showModal();
    });

    closeBtn.addEventListener('click', () => {
      modal.close();
    });

    modal.addEventListener('click', e => {
      if (e.target === modal) modal.close();
    });
  } catch (error) {
    console.error('Error loading tip of the day:', error);
    container.innerHTML = "<p>Check back later for today's tip!</p>";
  }
}
