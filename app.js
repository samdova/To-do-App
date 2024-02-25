function fetchTasks() {
    const taskMenu = document.getElementById('taskMenu');
    taskMenu.innerHTML = '';
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    tasks.forEach(task => {
        const listItem = document.createElement('li');
        listItem.innerHTML = `
            
            <span style="text-decoration: ${task.completed ? 'line-through' : 'none'}">${task.task}</span>
            <button id="updateButton" onclick="updateTask(${task.id})">Update</button>
            <button id="completeButton" onclick="completeTask(${task.id})">${task.completed ? 'Undo' : 'Complete'}</button>
            <button id="deleteButton" onclick="deleteTask(${task.id})" >Delete</button>
        `;
        taskMenu.appendChild(listItem);
    });
}

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const newTask = taskInput.value.trim();
    if (newTask !== '') {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        const task = { id: tasks.length + 1, task: newTask, completed: false };
        tasks.push(task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        fetchTasks();
        taskInput.value = '';
    }
}

function updateTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const taskToUpdate = tasks.find(task => task.id === id);

    if (taskToUpdate) {
        const updatedTaskText = prompt('Update task:', taskToUpdate.task);

        if (updatedTaskText !== null) {
            taskToUpdate.task = updatedTaskText.trim();
            localStorage.setItem('tasks', JSON.stringify(tasks));
            fetchTasks();
        }
    }
}

function completeTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    fetchTasks();
}

function deleteTask(id) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    const updatedTasks = tasks.filter(task => task.id !== id);
    localStorage.setItem('tasks', JSON.stringify(updatedTasks));
    fetchTasks();
}

document.addEventListener('DOMContentLoaded', function () {
    fetchTasks();
});
