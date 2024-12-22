// script.js
let newTodoInput = document.getElementById('newTodo');
let todoForm = document.getElementById('todoForm');
let addButton = document.getElementById('addButton');
let todoList = document.getElementById('todoList');
let noTasksMessage = document.getElementById('noTasksMessage');
let hideCompletedCheckbox = document.getElementById('hideCompletedCheckbox');
let sortButton = document.getElementById('sortButton');

let todos = [
    { title: 'Tâches de test', completed: true, date: 1 },
    { title: 'Tâches à faire', completed: false, date: 2 },
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
            li.className = 'list-disc ml-6 mt-2';
            li.classList.toggle('line-through', todo.completed);
            li.classList.toggle('opacity-50', todo.completed);

            let checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = todo.completed;
            checkbox.addEventListener('change', () => {
                todo.completed = checkbox.checked;
                renderTodos(); // Appel à renderTodos pour mettre à jour l'affichage
            });

            let textNode = document.createTextNode(` ${todo.title} `);
            li.appendChild(checkbox);
            li.appendChild(textNode);

            // Afficher le bouton "Supprimer" uniquement si la tâche est cochée
            if (todo.completed) {
                let deleteButton = document.createElement('button');
                deleteButton.textContent = 'Supprimer';
                deleteButton.className = 'text-red-500 ml-2';
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
            date: Date.now(),
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

// Event Listeners
todoForm.addEventListener('submit', addTodo);
hideCompletedCheckbox.addEventListener('change', toggleHideCompleted);
sortButton.addEventListener('click', sortTodos);
newTodoInput.addEventListener('input', () => {
    addButton.disabled = newTodoInput.value.length === 0;
});

// Initial Render
renderTodos();
