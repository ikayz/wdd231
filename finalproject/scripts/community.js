export async function initCommunityAdvice(container) {
  try {
    const response = await fetch('data/community-advice.json');
    if (!response.ok) {
      throw new Error(`API call failed with status: ${response.status}`);
    }
    const allAdvice = await response.json();

    const shuffledAdvice = allAdvice.sort(() => 0.5 - Math.random());
    const selectedAdvice = shuffledAdvice.slice(0, 8);

    container.innerHTML = '';
    selectedAdvice.forEach(tip => {
      const card = document.createElement('div');
      card.className = 'advice-card card';
      card.innerHTML = `
        <blockquote>"${tip.text}"</blockquote>
        <p class="author">— ${tip.author}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching community advice:', error);
    container.innerHTML =
      '<p>Could not load community advice at this time. Please try again later.</p>';
  }
}
