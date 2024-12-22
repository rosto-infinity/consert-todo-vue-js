
let newTodoInput = document.getElementById('newTodo');
let todoForm = document.getElementById('todoForm');
let addButton = document.getElementById('addButton');
let todoList = document.getElementById('todoList');
let noTasksMessage = document.getElementById('noTasksMessage');
let hideCompletedCheckbox = document.getElementById('hideCompletedCheckbox');
let sortButton = document.getElementById('sortButton');

let todos = [
    { title: 'Tâches de test', completed: true },
    { title: 'Tâches à faire', completed: false },
];

let hideCompleted = false;

const renderTodos = () => {
    todoList.innerHTML = '';
    const filteredTodos = hideCompleted ? todos.filter(todo => !todo.completed) : todos;

    if (filteredTodos.length === 0) {
        noTasksMessage.style.display = 'block';
    } else {
        noTasksMessage.style.display = 'none';
        filteredTodos.forEach(todo => {
            let li = document.createElement('li');

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => {
                todo.completed = checkbox.checked;
                renderTodos();
            });

            let textNode = document.createElement('span');
            textNode.textContent = ` ${todo.title} `;
            textNode.classList.toggle('line-through', todo.completed); // Appliquer la classe ici

            li.appendChild(checkbox);
            li.appendChild(textNode);

            if (todo.completed) {
                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.className = 'text-color ml-2';
                deleteButton.addEventListener('click', () => {
                    deleteTodo(todo);
                });
                li.appendChild(deleteButton);
            }

            todoList.appendChild(li);
        });
    }
};

const addTodo = (event) => {
    event.preventDefault();
    if (newTodoInput.value.trim() !== '') {
        todos.push({
            title: newTodoInput.value,
            completed: false,
        });
        newTodoInput.value = '';
        renderTodos();
    }
};

const deleteTodo = (todoToDelete) => {
    todos = todos.filter(todo => todo !== todoToDelete);
    renderTodos();
};

const sortTodos = () => {
    todos.sort((a, b) => a.title.localeCompare(b.title));
    renderTodos();
};

const toggleHideCompleted = () => {
    hideCompleted = hideCompletedCheckbox.checked;
    renderTodos();
};

todoForm.addEventListener('submit', addTodo);
hideCompletedCheckbox.addEventListener('change', toggleHideCompleted);
sortButton.addEventListener('click', sortTodos);
newTodoInput.addEventListener('input', () => {
    addButton.disabled = newTodoInput.value.length === 0;
});

renderTodos();
