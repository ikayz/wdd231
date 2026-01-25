const spotlightContainer = document.getElementById('spotlight-container');

async function getSpotlights() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displaySpotlights(data);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displaySpotlights(members) {
  const qualifiedMembers = members.filter(
    member => member.membershipLevel >= 2
  );

  const shuffled = qualifiedMembers.sort(() => 0.5 - Math.random());

  // Select the first 3
  const selectedMembers = shuffled.slice(0, 3);

  selectedMembers.forEach(member => {
    const card = document.createElement('div');
    card.classList.add('member-card');

    card.innerHTML = `
      <h3>${member.name}</h3>
      <p class="tagline">${member.description}</p>
      <hr>
      <div class="member-details">
        <img src="images/logos/${member.image}" alt="${member.name} Logo" loading="lazy" width="100" height="auto">
        <div class="details-info">
          <p>${member.address}</p>
          <p>${member.phone}</p>
          <a href="${member.website}" target="_blank">Website</a>
        </div>
      </div>
    `;

    spotlightContainer.appendChild(card);
  });
}

getSpotlights();
