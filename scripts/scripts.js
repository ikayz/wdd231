const navBar = document.querySelector('#nav-button');

navBar.addEventListener('click', () => {
  navBar.classList.toggle('show');
});

async function getData() {
  const response = await fetch('https://jsonplaceholder.typicode.com/todos/');
  const data = response.json();
  console.log(data);
}

getData();
