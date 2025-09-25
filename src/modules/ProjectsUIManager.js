import { Project } from "./Project.js";
import { renderProjects } from "./Dom.js";
import { projects } from "./Dom.js";
import { addTodoToList, viewTodos } from "./TodosUIManager.js";
import { saveToLocalStorage } from "./storage.js";

const submitButton = document.querySelector(".submit");
const addProjectButton = document.querySelector(".add-project");
const addProjectDialog = document.querySelector(".add-project-dialog");
const closeDialogButton = document.querySelector(".close-dialog");
const mainContainer = document.querySelector(".main-content-container");
const addTodoDialog = document.querySelector(".add-todo-dialog");


addProjectButton.addEventListener("click", () => {
    addProjectDialog.showModal();
});

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    addProjectToList(projects, addProjectDialog);
})

closeDialogButton.addEventListener("click", (e) => {
    e.preventDefault();
    document.getElementById("project-name").value = "";
    addProjectDialog.close();
})


export function createProjectUI(proj, index, projList) {
    const li = document.createElement("li");
    const h3 = document.createElement("h3");
    const removeProjectButton = document.createElement("button");
    removeProjectButton.title = "Remove"

    li.classList.add("project");
    li.setAttribute("id", index)
    h3.textContent = proj.name
    removeProjectButton.textContent = "🗑️";

    li.appendChild(h3);
    li.appendChild(removeProjectButton);
    projList.appendChild(li);

    removeProjectButton.addEventListener("click", (e) => {
        e.stopPropagation();
        removeProject(index, projects);
    });

    li.addEventListener("click", (e) => {
        const target = e.currentTarget.getAttribute("id");
        renderProjectDetails(target, projects);
    })
}

export function addProjectToList(projectsArr, dialog) {
    let input = document.getElementById("project-name");
    const projectName = input.value.trim();
    input.value = "";

    if (!projectName || projectName === "") {
        alert("Project Name is Required.")
        return;
    }

    if (projectsArr.some(proj => proj.name === projectName)) {
        alert("Project already exists! Use Another Name.");
        return;
    }

    const newProject = new Project(projectName);
    projectsArr.push(newProject);
    saveToLocalStorage(projectsArr);
    renderProjects();
    dialog.close();
}

export function removeProject(projectIndex, projectsArr) {
    if (projectIndex < 0 || projectIndex >= projectsArr.length) {
        alert("Invalid Index");
        return;
    }
    projectsArr.splice(projectIndex, 1);
    saveToLocalStorage(projectsArr);
    renderProjects();
}

function renderProjectDetails(projectIndex, projectsArr) {
    const submitTodoButton = document.querySelector(".submit-todo");
    const closeTodoDialog = document.querySelector(".close-todo-dialog");

    mainContainer.innerHTML = "";

    const div = document.createElement("div")
    const h2 = document.createElement("h2")
    const buttonsWrapper = document.createElement("div");
    const viewTodosButton = document.createElement("button");
    const hideTodosButton = document.createElement("button");
    const addTodoButton = document.createElement("button");

    buttonsWrapper.classList.add("todo-buttons-wrapper")
    div.classList.add("project-details");
    viewTodosButton.classList.add("view-todos");
    addTodoButton.classList.add("add-todos");

    viewTodosButton.textContent = "View Todos"
    viewTodosButton.title = "showtodos"
    addTodoButton.textContent = "+ Add Todo"

    hideTodosButton.textContent = "Hide Todos"
    hideTodosButton.style.display = "none";

    h2.textContent = projects[projectIndex].name;

    buttonsWrapper.appendChild(viewTodosButton);
    buttonsWrapper.appendChild(hideTodosButton);
    buttonsWrapper.appendChild(addTodoButton);
    div.appendChild(h2);
    div.appendChild(buttonsWrapper);
    mainContainer.appendChild(div);

    viewTodosButton.addEventListener("click", (e) => {
        const targetButton = e.currentTarget;
        targetButton.style.display = "none";
        hideTodosButton.style.display = "block"
        viewTodos(projectIndex, projectsArr, div)
    })

    hideTodosButton.addEventListener("click", (e) => {
        const targetButton = e.currentTarget;
        targetButton.style.display = "none";
        viewTodosButton.style.display = "block"
        document.querySelector(".todo-list").innerHTML = "";
    })

    addTodoButton.addEventListener("click", () => {
        addTodoDialog.showModal();
    })

    submitTodoButton.addEventListener("click",(e) => {
        e.preventDefault();
        addTodoToList(projectsArr,projectIndex,div);
        addTodoDialog.close();
    })

    closeTodoDialog.addEventListener("click",(e) => {
        e.preventDefault();
        addTodoDialog.close();
    })
}

