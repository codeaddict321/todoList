import { v4 as uuid } from "uuid";

const todoTemplate = document.querySelector("#todo-template");
const todoForm = document.querySelector("form");
const todos = document.querySelector(".todos");
const todosArray = [];

// if todo in localStorage exist
const existContent = localStorage.getItem("todos");
if (existContent) {
  const localTodo = JSON.parse(existContent);
  localTodo.forEach(todo => {
    todosArray.push(todo);
  });
  addTodo();
}

todoForm.addEventListener("submit", e => {
  e.preventDefault();
  const todoContent = e.target.add.value;

  if (todoContent.length > 0) {
    todosArray.push({ todo: todoContent, id: uuid() });
    addTodo();
    todoForm.reset();
  }
});

function addTodo() {
  //   add
  todos.innerHTML = "";
  todosArray.forEach(content => {
    const cloneTemplate = todoTemplate.content.cloneNode(true);
    const todo = cloneTemplate.querySelector(".content");
    todo.innerText = content.todo;
    const deleteBtn = cloneTemplate.querySelector("#delete-btn");
    deleteBtn.dataset.id = content.id;
    const isCompleted = cloneTemplate.querySelector("#completed");
    isCompleted.checked = content.checked;
    todos.appendChild(cloneTemplate);
  });
  // adding to local storage
  localStorage.setItem("todos", JSON.stringify(todosArray));
}

document.addEventListener("click", e => {
  if (e.target.matches("#delete-btn")) {
    const deleteId = e.target.dataset.id;
    deleteTodo(deleteId);
  }
  if (e.target.matches("#completed")) {
    const checkboxStatus = e.target.checked;
    const id = e.target.nextElementSibling.dataset.id;
    updateCheckbox(checkboxStatus, id);
  }
});

// delete todo
function deleteTodo(deleteId) {
  const index = todosArray.findIndex(item => {
    return item.id === deleteId;
  });

  todosArray.splice(index, 1);
  addTodo();
}

// update checkbox

function updateCheckbox(checkboxStatus, id) {
  const checkboxItem = todosArray.filter(item => {
    return item.id === id;
  });

  checkboxItem[0].checked = checkboxStatus;
  addTodo();
}
