import { saveToLocalStorage } from "./storage.js";
import { Todo } from "./Todo.js";

export function viewTodos(index, projectsArr, projectDetailsDiv) {
    const existingList = document.querySelector(".todo-list");
    if (existingList) existingList.remove();

    const todoList = document.createElement("ul");
    todoList.classList.add("todo-list");

    projectsArr[index].getTodos().forEach(todo => createTodoUI(todo, todoList, projectsArr, index));

    projectDetailsDiv.appendChild(todoList);
}

function createTodoUI(todoItem, todoUl, projectsArr, index) {
    const projectDetailsDiv = document.querySelector(".project-details");
    const li = document.createElement("li");
    li.classList.add("todo-item");
    const deleteTodoButton = document.createElement("button");
    deleteTodoButton.textContent = "🗑️";
    deleteTodoButton.title = "Delete"

    const items = [
        `Title: ${todoItem.title}`,
        `DueDate: ${todoItem.dueDate}`,
    ];

    items.forEach(item => {
        const span = document.createElement("span");
        span.textContent = item;
        li.appendChild(span);
    })

    li.appendChild(deleteTodoButton);
    todoUl.appendChild(li);

    li.addEventListener("click", (e) => {
        const target = e.currentTarget;
        target.classList.toggle("expanded");

        manageExtraDetails(target, todoItem);
    })

    deleteTodoButton.addEventListener("click", (event) => {
        event.stopPropagation();
        projectsArr[index].removeTodo(todoItem.title);
        saveToLocalStorage(projectsArr);
        viewTodos(index, projectsArr, projectDetailsDiv);
    })
}

function manageExtraDetails(targetLi, todo) {
    if (targetLi.classList.contains("expanded")) {
        const extraDetails = [
            `Description: ${todo.description}`,
            `Priority: ${todo.priority}`
        ]
        extraDetails.forEach(detail => {
            const span = document.createElement("span");
            span.classList.add("extra-detail");
            span.textContent = detail;
            targetLi.appendChild(span);
        })
    }
    else {
        const spans = targetLi.querySelectorAll("span");
        spans.forEach(span => {
            if (span.classList.contains("extra-detail")) {
                span.remove();
            }
        })
    }
}

export function addTodoToList(projects, projIndex, div) {
    const title = document.getElementById("todo-title").value.trim();
    const descripton = document.getElementById("todo-description").value.trim();
    const dueDate = document.getElementById("todo-dueDate").value.trim();
    const priority = document.getElementById("todo-priority").value.trim();

    const items = [title, descripton, dueDate, priority]
    if (items.some(item => !item || item === "")) {
        alert("All Fields are required");
        return;
    }
    if (projects[projIndex].getTodos().some(td => td.title.trim() === title)) {
        alert("Todo Already Exists");
        return;
    }
    const newTodo = new Todo(title, descripton, dueDate, priority)
    projects[projIndex].addTodo(newTodo);
    saveToLocalStorage(projects);
    viewTodos(projIndex, projects, div);

    document.getElementById("todo-title").value = "";
    document.getElementById("todo-description").value = "";
    document.getElementById("todo-dueDate").value = "";
    document.getElementById("todo-priority").value = "";
}
