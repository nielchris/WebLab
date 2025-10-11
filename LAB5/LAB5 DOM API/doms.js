const apiUrl = "http://localhost:8080/api/todos"; // ✅ Backend URL

const todoForm = document.getElementById("todoForm");
const todoList = document.getElementById("todoList");

// ✅ Fetch all todos
async function getTodos() {
  const response = await fetch(apiUrl);
  const todos = await response.json();
  displayTodos(todos);
}

// ✅ Display todos in the UI
function displayTodos(todos) {
  todoList.innerHTML = "";

  if (todos.length === 0) {
    todoList.innerHTML = "<p>No tasks yet. Add one above 👆</p>";
    return;
  }

  todos.forEach((todo) => {
    const div = document.createElement("div");
    div.classList.add("task");

    div.innerHTML = `
      <div class="task-info">
        <span class="task-title">${todo.title}</span>
        <span class="task-date">📅 ${todo.dueDate}</span>
      </div>
      <div>
        <button class="edit-btn" onclick="editTodo(${todo.id}, '${todo.title}', '${todo.dueDate}')">Edit</button>
        <button class="delete-btn" onclick="deleteTodo(${todo.id})">Delete</button>
      </div>
    `;

    todoList.appendChild(div);
  });
}

// ✅ Add new todo
todoForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const newTodo = {
    title: document.getElementById("title").value,
    dueDate: document.getElementById("date").value,
    description: "",    // optional
    completed: false    // default value
  };

  await fetch(apiUrl, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(newTodo),
  });

  todoForm.reset();
  getTodos();
});

// ✅ Edit existing todo
async function editTodo(id, oldTitle, oldDueDate) {
  const title = prompt("Edit task title:", oldTitle);
  const dueDate = prompt("Edit date (YYYY-MM-DD):", oldDueDate);

  if (!title || !dueDate) return;

  await fetch(`${apiUrl}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ 
      title, 
      dueDate, 
      description: "",   // keep it empty
      completed: false   // or true if you want
    }),
  });

  getTodos();
}

// ✅ Delete a todo
async function deleteTodo(id) {
  if (!confirm("Delete this task?")) return;

  await fetch(`${apiUrl}/${id}`, { method: "DELETE" });
  getTodos();
}

// ✅ Load todos on page startup
getTodos();
