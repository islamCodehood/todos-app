let todos = [];

const addTodoBtn = document.getElementById("submit-btn");
const todo = document.getElementById("todo");
const urgent = document.getElementById("urgent");
const important = document.getElementById("important");
const todosWrapper = document.querySelector(".todos-wrapper");
const fragment = document.createDocumentFragment();

addTodoBtn.addEventListener("click", (e) => {
  e.preventDefault();
  //in case no todo written don't do anythin and end function
  if (!todo.value) return;
  //this part will run if the previous condition evaluates to false
  const todoItem = {
    todoText: todo.value,
    urgent: urgent.checked,
    important: important.checked,
    timeStamp: new Date().getTime(),
  };
  //add new todo  to the todos array
  todos.push(todoItem);

  //show all todos
  showTodos(todos);

  //reset input fields
  todo.value = "";
  urgent.checked = false;
  important.checked = false;
});

const showTodos = (todos) => {
  todosWrapper.innerHTML = "";

  todos.forEach((todo) => {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo-item");
    todoDiv.innerHTML = `
        <p>${todo.todoText}</p><div><img src="delete.png" class="close"  data-timestamp=${todo.timeStamp} alt=""></div>
        `;
    addBackgroundColor(todo.urgent, todo.important, todoDiv);
    fragment.appendChild(todoDiv);
  });
  todosWrapper.appendChild(fragment);
};

//background color according to urgent, important
const addBackgroundColor = (urgent, important, div) => {
  if (urgent && important) {
    div.classList.add("urgent-important");
  } else if (urgent) {
    div.classList.add("urgent");
  } else if (important) {
    div.classList.add("important");
  } else {
    div.classList.add("ordinary");
  }
};

//Click event to delete todo
todosWrapper.addEventListener("click", (e) => {
  if (e.target.classList.contains("close")) {
    todos = todos.filter(
      (todo) => todo.timeStamp != e.target.getAttribute("data-timestamp")
    );
    showTodos(todos);
  }
});
