// Code to change bookmark button color while hovering coursor
let hoverTimers = new Map();
const buttons = document.querySelectorAll('.burning-button');

buttons.forEach(button => {
  button.addEventListener('mouseenter', () => startHoverTimer(button));
  button.addEventListener('mouseleave', () => resetHoverTimer(button));
});

function startHoverTimer(button) {
  const timer = setTimeout(() => applyAnimations(button), 0);
  hoverTimers.set(button, timer);
}

function resetHoverTimer(button) {
  clearTimeout(hoverTimers.get(button));
  button.style.backgroundColor = '#333333';
  button.style.animation = '';
}

function applyAnimations(button) {
  button.style.animation = 'greyAnimation 5s, redAnimation 7s 5s, orangeAnimation 2s 12s, skyBlueAnimation 5s 14s';
  button.addEventListener('animationend', () => {
    button.style.backgroundColor = '#333333';
  });
}

// To-do list
const input = document.getElementById("myInput");
const addButton = document.getElementById("addBtn");
const ul = document.getElementById("myUL");

function createTask(taskText, done = false) {
  const li = document.createElement("li");

  if (done) {
    li.classList.add("checked");
  }

  // ... rest of the createTask function
}

function addTask() {
  const li = createTask(input.value);
  ul.appendChild(li);
  addToLocalStorage(input.value, new Date().toISOString(), false);
  input.value = "";
}

function addToLocalStorage(task, timestamp, done) {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.push({ text: task, timestamp, done });
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function removeFromLocalStorage(task) {
  // ... rest of the removeFromLocalStorage function
}

function loadTasks() {
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  tasks.forEach(task => {
    const li = createTask(task.text, task.done);
    ul.appendChild(li);
    updateBulletColor(li, task.timestamp);
  });
}

function updateBulletColor(li, timestamp) {
  // ... rest of the updateBulletColor function
}

addButton.addEventListener("click", addTask);
input.addEventListener("keypress", (event) => {
  if (event.keyCode == 13 || event.which == 13) {
    addTask();
    event.preventDefault();
  }
});

loadTasks();


// Clocks
