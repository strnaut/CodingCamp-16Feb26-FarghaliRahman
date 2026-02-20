let todos = [];
function addTask() {
    const taskInput = document.getElementById('task-input');
    const dueDateInput = document.getElementById('due-date-input');

    // validaton
    if (taskInput.value.trim() === ''|| dueDateInput.value === '') {
        alert("Please enter both a task and a due date.");
        return;
    } else {
        const newTask = {
            id: Date.now(),
            task: taskInput.value.trim(),
            dueDate: dueDateInput.value,
            completed: false
        };
        todos.push(newTask);
        
        taskInput.value = '';
        dueDateInput.value = '';

        displayTasks();
    }
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';
    todos.forEach(task => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td class="p-2 border-b border-[#605b53]">${task.task}</td>
            <td class="p-2 border-b border-[#605b53]">${task.dueDate}</td>
            <td class="p-2 border-b border-[#605b53]">${task.completed ? 'Complete' : 'Incomplete'}</td>
            <td class="p-2 border-b border-[#605b53]">
                <button onclick="completeTask(${task.id})" class="p-1 bg-[#11ac77] text-black rounded">Change Status</button>
                <button onclick="deleteTask(${task.id})" class="p-1 bg-[#ff4c4c] text-white rounded">🗑</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}

function completeTask(id) {
    const task = todos.find(task => task.id === id);
    if (task) {
        task.completed = !task.completed;
        
        displayTasks();
    }
}

    
function deleteAllTask() {
    todos = [];
    displayTasks();
}

function deleteTask(id) {
    todos = todos.filter(task => task.id !== id);
    displayTasks();
}