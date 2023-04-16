// Test todo list

function setCookie(name, value, days) {
    const date = new Date();
    date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
    const expires = "; expires=" + date.toUTCString();
    document.cookie = name + "=" + encodeURIComponent(value) + expires + "; path=/";
}

function getCookie(name) {
    const cookieName = name + "=";
    const decodedCookie = decodeURIComponent(document.cookie);
    const cookiesArray = decodedCookie.split(';');
    for (let i = 0; i < cookiesArray.length; i++) {
        let cookie = cookiesArray[i].trim();
        if (cookie.indexOf(cookieName) === 0) {
            return cookie.substring(cookieName.length);
        }
    }
    return "";
}

function deleteCookie(name) {
    setCookie(name, "", -1);
}


document.addEventListener('DOMContentLoaded', () => {
    const taskInput = document.querySelector('#taskInput');
    const addTaskButton = document.querySelector('#addTaskButton');
    const taskList = document.querySelector('#taskList');

    taskInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    addTaskButton.addEventListener('click', addTask);

    function addTask() {
        const taskText = taskInput.value.trim();

        if (taskText) {
            const task = document.createElement('li');
            const taskLabel = document.createElement('span');
            taskLabel.textContent = taskText;

            const doneButton = document.createElement('button');
            doneButton.textContent = 'Done';
            doneButton.addEventListener('click', () => {
                if (taskLabel.style.textDecoration === 'line-through') {
                    taskLabel.style.textDecoration = 'none';
                } else {
                    taskLabel.style.textDecoration = 'line-through';
                }
                saveTasks();
            });

            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(task);
                saveTasks();
            });

            task.appendChild(taskLabel);
            task.appendChild(doneButton);
            task.appendChild(deleteButton);
            taskList.appendChild(task);

            taskInput.value = '';
            saveTasks();
        }
    }

    function saveTasks() {
        const tasks = [];
        taskList.childNodes.forEach(task => {
            const taskText = task.querySelector('span').textContent;
            const isDone = task.querySelector('span').style.textDecoration === 'line-through';
            tasks.push({ taskText, isDone });
        });
        setCookie('tasks', JSON.stringify(tasks), 60); // Save tasks in a cookie for 7 days
    }
    
    function loadTasks() {
        const tasks = JSON.parse(getCookie('tasks')) || [];
        tasks.forEach(({ taskText, isDone }) => {
            const task = document.createElement('li');
            const taskLabel = document.createElement('span');
            taskLabel.textContent = taskText;
            taskLabel.style.textDecoration = isDone ? 'line-through' : 'none';
    
            const doneButton = document.createElement('button');
            doneButton.textContent = 'Done';
            doneButton.addEventListener('click', () => {
                if (taskLabel.style.textDecoration === 'line-through') {
                    taskLabel.style.textDecoration = 'none';
                } else {
                    taskLabel.style.textDecoration = 'line-through';
                }
                saveTasks();
            });
    
            const deleteButton = document.createElement('button');
            deleteButton.textContent = 'Delete';
            deleteButton.addEventListener('click', () => {
                taskList.removeChild(task);
                saveTasks();
            });
    
            task.appendChild(taskLabel);
            task.appendChild(doneButton);
            task.appendChild(deleteButton);
            taskList.appendChild(task);
        });
    }
    

loadTasks();
});