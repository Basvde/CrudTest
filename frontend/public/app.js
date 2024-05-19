// Update de Axios-verzoeken om te verwijzen naar de juiste URL van de backend
const backendURL = 'http://localhost:5000'; // URL van de Flask-backend
const todosURL = `${backendURL}/todos`;

function fetchTodos() {
    axios.get(todosURL)
        .then(response => {
            console.log('Taken:', response.data);
            const todoList = document.getElementById('todo-list');
            todoList.innerHTML = '';  // Wis de lijst voordat nieuwe items worden toegevoegd

            response.data.forEach((todo, index) => {
                const todoItem = document.createElement('li');
                todoItem.textContent = todo.title;

                // Bewerk knop
                const editButton = document.createElement('button');
                editButton.textContent = 'Bewerk';
                editButton.onclick = () => updateTodo(todo.id, todo.title);
                todoItem.appendChild(editButton);

                // Verwijder knop
                const deleteButton = document.createElement('button');
                deleteButton.textContent = 'Verwijder';
                deleteButton.onclick = () => removeTodo(todo.id);
                todoItem.appendChild(deleteButton);

                todoList.appendChild(todoItem);
            });
        })
        .catch(error => {
            console.error('Fout bij het ophalen van taken:', error);
        });
}

function editTodo(id, newTitle) {
    axios.put(`${todosURL}/${id}`, { title: newTitle })
        .then(() => fetchTodos())
        .catch(error => console.error('Fout bij het bewerken van taak:', error));
}

function deleteTodo(id) {
    axios.delete(`${todosURL}/${id}`)
        .then(() => fetchTodos())
        .catch(error => console.error('Fout bij het verwijderen van taak:', error));
}

function createTodo() {
    const todoInput = document.getElementById('todo-input');
    const title = todoInput.value.trim();
    if (title) {
        axios.post(todosURL, { title })
            .then(() => {
                fetchTodos();
                todoInput.value = '';
            })
            .catch(error => console.error('Fout bij het toevoegen van taak:', error));
    }
}

function updateTodo(id, title) {
    const newTitle = prompt('Voer nieuwe titel in:', title);
    if (newTitle) {
        editTodo(id, newTitle);
    }
}

function removeTodo(id) {
    const confirmed = confirm('Weet je zeker dat je deze taak wilt verwijderen?');
    if (confirmed) {
        deleteTodo(id);
    }
}

// Initieel ophalen om bestaande taken te laden
fetchTodos();
