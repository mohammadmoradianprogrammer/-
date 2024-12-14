document.addEventListener('DOMContentLoaded', function() {
    const todoInput = document.getElementById('todo-input');
    const addTodoButton = document.getElementById('add-todo');
    const todoList = document.getElementById('todo-list');
    const editModal = document.getElementById('edit-modal');
    const editInput = document.getElementById('edit-input');
    const notification = document.getElementById('notification');
    let editIndex = null;

    // Load todos from cookies
    loadTodos();

    addTodoButton.addEventListener('click', function() {
        const task = todoInput.value;
        const todos = getTodosFromCookies();
        
        if (todos.length >= 5) {
            showNotification('شما می‌توانید حداکثر 5 کار اضافه کنید. برای نسخه پرو، لطفا اقدام کنید.');
            return;
        }

        if (task) {
            const date = new Date().toLocaleString();
            const todoItem = { task, date };
            saveTodoToCookies(todoItem);
            todoInput.value = '';
            showNotification('کار ثبت شد: ' + task + ' در ' + date);
            loadTodos();
        }
    });

    function loadTodos() {
        const todos = getTodosFromCookies();
        todoList.innerHTML = '';
        todos.forEach((todo, index) => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${todo.task}</td>
                <td>${todo.date}</td>
                <td>
                    <button class="edit" onclick="openEditModal(${index})">ویرایش</button>
                    <button class="delete" onclick="deleteTodo(${index})">حذف</button>
                </td>
            `;
            todoList.appendChild(tr);
        });
    }

    window.deleteTodo = function(index) {
        const todos = getTodosFromCookies();
        todos.splice(index, 1);
        document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
        loadTodos();
    }

    window.openEditModal = function(index) {
        const todos = getTodosFromCookies();
        editIndex = index;
        editInput.value = todos[index].task;
        editModal.style.display = 'flex';
    }

    document.getElementById('edit-modal').addEventListener('click', function(e) {
        if (e.target === this) {
            this.style.display = 'none';
        }
    });

    document.getElementById('edit-submit').addEventListener('click', function() {
        const updatedTask = editInput.value;
        if (updatedTask) {
            const todos = getTodosFromCookies();
            todos[editIndex].task = updatedTask;
            todos[editIndex].date = new Date().toLocaleString();
            document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
            editModal.style.display = 'none';
            loadTodos();
            showNotification('کار ویرایش شد: ' + updatedTask);
        }
    });

    function saveTodoToCookies(todo) {
        const todos = getTodosFromCookies();
        todos.push(todo);
        document.cookie = "todos=" + JSON.stringify(todos) + "; path=/";
    }

    function getTodosFromCookies() {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; todos=`);
        if (parts.length === 2) return JSON.parse(parts.pop().split(';')[0]) || [];
        return [];
    }

    function showNotification(message) {
        notification.innerText = message;
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    }
});
