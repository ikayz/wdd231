// Store the selected elements that we are going to use.
const navButton = document.querySelector('#ham-button');
const navLinks = document.querySelector('#nav-bar');

// Toggle the show class off and on
navButton.addEventListener('click', () => {
  navButton.classList.toggle('show');
  navLinks.classList.toggle('show');
});

async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
  const data = response.json();
  console.log(data);
}

getData();
