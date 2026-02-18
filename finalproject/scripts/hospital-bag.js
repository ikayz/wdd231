export async function initHospitalBag(container) {
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
