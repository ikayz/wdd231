const membersContainer = document.getElementById('members-container');

async function getMembers() {
  try {
    const response = await fetch('data/members.json');
    const data = await response.json();
    displayMembers(data);
  } catch (error) {
    console.error('Error fetching members:', error);
  }
}

function displayMembers(members) {
  members.forEach(member => {
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

    membersContainer.appendChild(card);
  });
}

getMembers();

const gridButton = document.getElementById('grid-view');
const listButton = document.getElementById('list-view');

gridButton.addEventListener('click', () => {
  membersContainer.classList.remove('list-view');
  gridButton.classList.add('active');
  listButton.classList.remove('active');
});

listButton.addEventListener('click', () => {
  membersContainer.classList.add('list-view');
  listButton.classList.add('active');
  gridButton.classList.remove('active');
});
