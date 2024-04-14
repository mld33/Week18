// Получаем ссылки на необходимые элементы
const taskInput = document.getElementById('taskInput');
const taskList = document.getElementById('taskList');
const clearButton = document.getElementById('clearButton');
const noTasksMsg = document.getElementById('noTasksMsg');

// При загрузке страницы проверяем, есть ли сохраненные задачи в Local Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Функция для отображения задач
function displayTasks() {
taskList.innerHTML = '';
if (tasks.length === 0) {
    noTasksMsg.style.display = 'block';
    clearButton.disabled = true;
} else {
    noTasksMsg.style.display = 'none';
    clearButton.disabled = false;

    tasks.forEach((task, index) => {
    const li = document.createElement('li');
    li.innerHTML = `<input type="checkbox" id="task${index}" onchange="toggleTask(${index})">
    <label for="task${index}">${task}</label>`;
    taskList.appendChild(li);
    });
    }
}

// Функция для добавления задачи
function addTask() {
    const taskText = taskInput.value;
    if (taskText.trim() !== '') {
    tasks.push(taskText);
    taskInput.value = '';
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
    }
}

//Функция для изменения состояния задачи (выполнена или нет)
function toggleTask(index) {
    tasks[index] = tasks[index].startsWith('✓ ') ? tasks[index].substring(2) : '✓ ' + tasks[index];
    localStorage.setItem('tasks', JSON.stringify(tasks));
    displayTasks();
}

// Функция для очистки списка задач
function clearTasks() {
    tasks = [];
    localStorage.removeItem('tasks');
    displayTasks();
}

// Показываем сохраненные задачи при загрузке страницы
displayTasks();