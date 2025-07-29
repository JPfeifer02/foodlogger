const form = document.getElementById('food-form');
const logList = document.getElementById('log-list');

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const name = document.getElementById('food-name').value;
  const calories = document.getElementById('calories').value;

  const li = document.createElement('li');
  li.textContent = `${name} - ${calories} cal`;
  logList.appendChild(li);

  // Reset
  form.reset();
});
