let todos = [];
let currentFilter = 'all';


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
        
        // Tentukan class CSS: jika completed true, pakai 'line-through' dan warna abu-abu
        const textStyle = task.completed ? 'line-through text-gray-400' : '';

        row.innerHTML = `
            <td class="p-2 border-b border-[#605b53] ${textStyle}">${task.task}</td>
            <td class="p-2 border-b border-[#605b53] ${textStyle}">${task.dueDate}</td>
            <td class="p-2 border-b border-[#605b53]">${task.completed ? 'Complete' : 'Incomplete'}</td>
            <td class="p-2 border-b border-[#605b53]">
                <button onclick="completeTask(${task.id})" class="p-1 bg-[#11ac77] text-white font-bold rounded cursor-pointer">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>
                <button onclick="deleteTask(${task.id})" class="p-1 bg-[#ff4c4c] text-white rounded cursor-pointer">🗑</button>
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

// Fungsi untuk mengubah status filter
function filterTasks(filter) {
    currentFilter = filter;
    displayTasks();
}

function displayTasks() {
    const taskList = document.getElementById('task-list');
    taskList.innerHTML = '';

    // Logika Filter
    let filteredTodos = todos;
    const today = new Date().toISOString().split('T')[0]; // Ambil tanggal hari ini (YYYY-MM-DD)

    if (currentFilter === 'today') {
        filteredTodos = todos.filter(task => task.dueDate === today);
    } else if (currentFilter === 'incomplete') {
        filteredTodos = todos.filter(task => !task.completed);
    } else if (currentFilter === 'completed') {
        filteredTodos = todos.filter(task => task.completed);
    }

    // Gunakan filteredTodos (bukan todos) untuk di-looping
    filteredTodos.forEach(task => {
        const row = document.createElement('tr');
        const textStyle = task.completed ? 'line-through text-gray-500' : '';

        row.innerHTML = `
            <td class="p-2 border-b border-[#605b53] ${textStyle}">${task.task}</td>
            <td class="p-2 border-b border-[#605b53] ${textStyle}">${task.dueDate}</td>
            <td class="p-2 border-b border-[#605b53]">${task.completed ? 'Complete' : 'Incomplete'}</td>
            <td class="p-2 border-b border-[#605b53]">
                <button onclick="completeTask(${task.id})" class="p-1 bg-[#11ac77] text-white font-bold rounded cursor-pointer">
                    ${task.completed ? 'Undo' : 'Done'}
                </button>
                <button onclick="deleteTask(${task.id})" class="p-1 bg-[#ff4c4c] text-white rounded cursor-pointer">🗑</button>
            </td>
        `;
        taskList.appendChild(row);
    });
}


