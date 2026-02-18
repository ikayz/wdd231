export function initChecklist(container) {
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
