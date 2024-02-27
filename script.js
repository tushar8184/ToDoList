//* Selectors
const toDoInput = document.querySelector("#todo_input");
const toDoButton = document.querySelector("#todo_button");
const toDoList = document.querySelector("#todo_list");
const filterOption = document.querySelector("#filter-todo");

//* EventListner
document.addEventListener("DOMContentLoaded", getToDos);
toDoButton.addEventListener("click", function (event) {
  //* prevent default refresh behavior when clicking the button
  event.preventDefault();

  //* create new div with the class "todo"
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //* create new "li" list item with the class "todo_item"
  const newToDo = document.createElement("li");
  newToDo.innerText = toDoInput.value;
  newToDo.classList.add("todo_item");

  //* Append the child "li" tag into "div" wrapping the "li" tag inside "div"
  todoDiv.appendChild(newToDo);

  //* Add Local storage
  saveLocalToDos(toDoInput.value);

  //* create "check" button with class and "<i>" tag
  const completedButton = document.createElement("button");
  completedButton.classList.add("complete-btn");
  completedButton.innerHTML = `<i class="fas fa-check"></i>`;
  todoDiv.appendChild(completedButton);

  //* create "check" button with class and "<i>" tag
  const thrashButton = document.createElement("button");
  thrashButton.classList.add("thrash-btn");
  thrashButton.innerHTML = `<i class="fas fa-trash"></i>`;
  todoDiv.appendChild(thrashButton);

  //* Append new div "todoDiv" or add this "div" in "ul" tag
  toDoList.appendChild(todoDiv);

  //* Clear the "todo_input" value i.e text written inside the input tag
  toDoInput.value = "";
});

//* Delete the item i.e "li"
toDoList.addEventListener("click", function (events) {
  const myItem = events.target;

  //* Removing the Element
  if (myItem.classList[0] === "thrash-btn") {
    const liTodo = myItem.parentElement;
    liTodo.classList.add("fall");
    removeToDo(liTodo);
    liTodo.addEventListener("transitionend", function () {
      liTodo.remove();
    });
  }

  //* Adding or Check-mark the item or Element
  if (myItem.classList[0] === "complete-btn") {
    const liTodo = myItem.parentElement;
    liTodo.classList.toggle("completed");
  }
});

filterOption.addEventListener("click", function (events) {
  const mytodos = toDoList.childNodes;
  mytodos.forEach(function (todo) {
    console.log(todo.target);
    switch (events.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "incompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
});

//* Local Storage
function saveLocalToDos(toDo) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  toDos.push(toDo);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}

function getToDos() {
  console.log("hello");
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }

  toDos.forEach(function (action) {
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //* create new "li" list item with the class "todo_item"
    const newToDo = document.createElement("li");
    newToDo.innerText = action;
    newToDo.classList.add("todo_item");

    //* Append the child "li" tag into "div" wrapping the "li" tag inside "div"
    todoDiv.appendChild(newToDo);

    //* create "check" button with class and "<i>" tag
    const completedButton = document.createElement("button");
    completedButton.classList.add("complete-btn");
    completedButton.innerHTML = `<i class="fas fa-check"></i>`;
    todoDiv.appendChild(completedButton);

    //* create "check" button with class and "<i>" tag
    const thrashButton = document.createElement("button");
    thrashButton.classList.add("thrash-btn");
    thrashButton.innerHTML = `<i class="fas fa-trash"></i>`;
    todoDiv.appendChild(thrashButton);

    //* Append new div "todoDiv" or add this "div" in "ul" tag
    toDoList.appendChild(todoDiv);
  });
}

function removeToDo(actionToDo) {
  let toDos;
  if (localStorage.getItem("toDos") === null) {
    toDos = [];
  } else {
    toDos = JSON.parse(localStorage.getItem("toDos"));
  }
  const toDoIndex = actionToDo.children[0].innerText;
  toDos.splice(toDos.indexOf(toDoIndex), 1);
  localStorage.setItem("toDos", JSON.stringify(toDos));
}
