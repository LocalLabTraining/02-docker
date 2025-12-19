function renderTodos(todos) {
    const todosElement = document.getElementById('todos');
    todosElement.innerHTML = '';
    todos.forEach(todo => {
        const li = document.createElement('li');
        li.textContent = todo.title;
        todosElement.appendChild(li);
    });
}

async function addTodo(todo) {
    const todosElement = document.getElementById('todos');
    const response = await fetch('api/todos', {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: JSON.stringify(todo),
    });
    if (!response.ok) {
        alert('Failed to add todo');
        return;
    }
    const data = await response.json();
    const li = document.createElement('li');
    li.textContent = data.title;
    todosElement.appendChild(li);
}

window.addEventListener('DOMContentLoaded', async () => {
    console.log('DOMContentLoaded');
    const response = await fetch('api/todos');
    if (!response.ok) {
        alert('Failed to get todos');
        return;
    }
    const todos = await response.json();
    renderTodos(todos);
    const addTodoButton = document.getElementById('add-todo');
    const todoInput = document.getElementById('todo-input');
    addTodoButton.addEventListener('click', async () => {
        const todo = { title: todoInput.value };
        await addTodo(todo);
        todoInput.value = '';
    });
});