// Course data array
const courses = [
  {
    code: 'WDD 130',
    title: 'Introduction to Web Development',
    category: 'WDD',
    credits: 3,
    completed: true,
  },
  {
    code: 'WDD 131',
    title: 'Web Authoring II',
    category: 'WDD',
    credits: 3,
    completed: true,
  },
  {
    code: 'WDD 231',
    title: 'Web Design & Development II',
    category: 'WDD',
    credits: 3,
    completed: false,
  },
  {
    code: 'CSE 110',
    title: 'Intro to Programming',
    category: 'CSE',
    credits: 3,
    completed: true,
  },
  {
    code: 'CSE 121',
    title: 'Data Structures',
    category: 'CSE',
    credits: 3,
    completed: false,
  },
];

// DOM refs
const coursesList = document.getElementById('coursesList');
const creditsValue = document.getElementById('creditsValue');
const allBtn = document.getElementById('allBtn');
const cseBtn = document.getElementById('cseBtn');
const wddBtn = document.getElementById('wddBtn');

function renderCourses(list) {
  if (!coursesList) return;
  coursesList.innerHTML = '';

  list.forEach(course => {
    const card = document.createElement('div');
    card.className = 'course-card';
    if (course.completed) card.classList.add('completed');

    const title = document.createElement('h3');
    title.textContent = `${course.code} — ${course.title}`;

    const meta = document.createElement('p');
    meta.className = 'meta';
    meta.textContent = `${course.category} • ${course.credits} credits`;

    card.appendChild(title);
    card.appendChild(meta);
    coursesList.appendChild(card);
  });

  // update credits total
  const total = list.reduce((sum, c) => sum + (c.credits || 0), 0);
  if (creditsValue) creditsValue.textContent = total;
}

function filterByCategory(cat) {
  if (cat === 'All') return courses.slice();
  return courses.filter(c => c.category === cat);
}

// wire up buttons
if (allBtn)
  allBtn.addEventListener('click', () =>
    renderCourses(filterByCategory('All'))
  );
if (cseBtn)
  cseBtn.addEventListener('click', () =>
    renderCourses(filterByCategory('CSE'))
  );
if (wddBtn)
  wddBtn.addEventListener('click', () =>
    renderCourses(filterByCategory('WDD'))
  );

// initial render
renderCourses(courses);
