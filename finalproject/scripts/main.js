/**
 * Main JavaScript file for "Welcoming Your First Baby"
 * Handles dynamic features: Checklist, Hospital Bag, Community Advice, Contact Form
 */

document.addEventListener('DOMContentLoaded', () => {
  const checklistContainer = document.getElementById('checklist-app');
  if (checklistContainer) {
    initChecklist(checklistContainer);
  }

  const bagContainer = document.getElementById('bag-planner-container');
  if (bagContainer) {
    initHospitalBag(bagContainer);
  }

  const communityContainer = document.getElementById('community-feed');
  if (communityContainer) {
    initCommunityAdvice(communityContainer);
  }

  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    initContactForm(contactForm);
  }

  initNavigation();

  const tipContainer = document.getElementById('tip-content');
  if (tipContainer) {
    initTipOfTheDay();
  }
});

/* --- 1. Preparation Checklist (Local Storage) --- */
function initChecklist(container) {
  const input = document.getElementById('checklist-input');
  const addBtn = document.getElementById('add-item-btn');
  const list = document.getElementById('checklist-list');
  const progressBarFill = document.getElementById('progress-bar-fill');
  const progressText = document.getElementById('progress-text');

  let items = JSON.parse(localStorage.getItem('babyChecklist')) || [];

  function updateProgress() {
    // Guard against running on pages without these elements
    if (!progressBarFill || !progressText) return;

    const completedCount = items.filter(item => item.completed).length;
    const totalItems = items.length;
    const percentage = totalItems > 0 ? (completedCount / totalItems) * 100 : 0;

    progressBarFill.style.width = `${percentage}%`;
    progressText.textContent = `${Math.round(percentage)}% Complete`;
  }

  function render() {
    list.innerHTML = '';
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'checklist-item';

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = item.completed;
      checkbox.id = `item-${index}`;
      checkbox.addEventListener('change', () => toggleComplete(index));

      const label = document.createElement('label');
      label.textContent = item.text;
      label.setAttribute('for', `item-${index}`);
      if (item.completed) {
        label.style.textDecoration = 'line-through';
        label.style.color = '#888';
      }

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '×';
      removeBtn.className = 'remove-btn';
      removeBtn.setAttribute('aria-label', 'Remove item');
      removeBtn.style.marginLeft = 'auto'; // Push to right
      removeBtn.style.background = 'none';
      removeBtn.style.border = 'none';
      removeBtn.style.color = '#d9534f';
      removeBtn.style.fontSize = '1.2rem';
      removeBtn.style.cursor = 'pointer';
      removeBtn.addEventListener('click', () => removeItem(index));

      li.append(checkbox, label, removeBtn);
      list.appendChild(li);
    });

    updateProgress();
  }

  function addItem() {
    const text = input.value.trim();
    if (text) {
      items.push({ text, completed: false });
      save();
      render();
      input.value = '';
      input.focus();
    }
  }

  function removeItem(index) {
    items.splice(index, 1);
    save();
    render();
  }

  function toggleComplete(index) {
    items[index].completed = !items[index].completed;
    save();
    render();
  }

  function save() {
    localStorage.setItem('babyChecklist', JSON.stringify(items));
  }

  addBtn.addEventListener('click', addItem);
  input.addEventListener('keypress', e => {
    if (e.key === 'Enter') addItem();
  });

  render();
}

/* --- 2. Hospital Bag Planner (JSON Data) --- */
async function initHospitalBag(container) {
  try {
    const response = await fetch('data/hospital-bag.json');
    if (!response.ok) throw new Error('Failed to load data');

    const data = await response.json();
    renderHospitalBag(data, container);
  } catch (error) {
    console.error('Error:', error);
    container.innerHTML =
      '<p>Sorry, we could not load the planner at this time.</p>';
  }
}

function renderHospitalBag(data, container) {
  container.innerHTML = '';

  for (const [category, items] of Object.entries(data)) {
    const section = document.createElement('section');
    section.className = 'bag-category card';

    const heading = document.createElement('h3');
    heading.textContent = category.charAt(0).toUpperCase() + category.slice(1);
    section.appendChild(heading);

    const list = document.createElement('ul');
    items.forEach((item, index) => {
      const li = document.createElement('li');
      li.className = 'bag-item';

      const itemDiv = document.createElement('div');
      itemDiv.className = 'checklist-item';

      const checkboxId = `bag-${category}-${index}`;
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.id = checkboxId;
      checkbox.checked = localStorage.getItem(checkboxId) === 'true';
      checkbox.addEventListener('change', e => {
        localStorage.setItem(checkboxId, e.target.checked);
      });

      const label = document.createElement('label');
      label.textContent = item;
      label.setAttribute('for', checkboxId);

      itemDiv.append(checkbox, label);

      const noteId = `bag-note-${category}-${index}`;
      const noteInput = document.createElement('input');
      noteInput.type = 'text';
      noteInput.className = 'note-input';
      noteInput.placeholder = 'Add a note (e.g., brand, size)';
      noteInput.value = localStorage.getItem(noteId) || '';
      noteInput.style.display = 'none';
      noteInput.addEventListener('input', e => {
        localStorage.setItem(noteId, e.target.value);
      });

      const addNoteBtn = document.createElement('button');
      addNoteBtn.textContent = 'Note';
      addNoteBtn.className = 'note-btn';
      addNoteBtn.addEventListener('click', () => {
        const isHidden = noteInput.style.display === 'none';
        noteInput.style.display = isHidden ? 'block' : 'none';
        addNoteBtn.textContent = isHidden ? 'Hide' : 'Note';
        if (isHidden) noteInput.focus();
      });

      li.append(itemDiv, addNoteBtn, noteInput);
      list.appendChild(li);
    });

    section.appendChild(list);
    container.appendChild(section);
  }
}

/* --- 3. Community Advice (Mock Data) --- */
async function initCommunityAdvice(container) {
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
        <p class="author" style="margin-top: 0.5rem; font-style: italic;">— ${tip.author}</p>
      `;
      container.appendChild(card);
    });
  } catch (error) {
    console.error('Error fetching community advice:', error);
    container.innerHTML =
      '<p>Could not load community advice at this time. Please try again later.</p>';
  }
}

/* --- 4. Contact Form Validation --- */
function initContactForm(form) {
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

/* --- 5. Navigation Wayfinding --- */
function initNavigation() {
  const currentPath = window.location.pathname;
  const page = currentPath.split('/').pop() || 'index.html';

  const navLinks = document.querySelectorAll('nav ul li a:not(.cta-nav)');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === page) {
      link.classList.add('active');
      link.setAttribute('aria-current', 'page');
    }
  });
}

/* --- 6. Tip of the Day (Modal & Random JSON) --- */
async function initTipOfTheDay() {
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
