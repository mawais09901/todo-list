import { Project } from "./Project";
import { createProjectUI } from "./ProjectsUIManager.js";
import { loadFromLocalStorage, saveToLocalStorage } from "./storage.js";
import { Todo } from "./Todo.js";

export const projects = loadFromLocalStorage();

if (projects.length === 0) {

    const defaultProject1 = new Project("Outside Work");
    const defaultProject2 = new Project("Work In Home");

    const todo1 = new Todo("Buy groceries", "Milk, eggs, bread, and fruits", "2025-09-25", "High");
    const todo2 = new Todo("Finish report", "Complete the quarterly financial report", "2025-09-24", "Medium");
    const todo3 = new Todo("Call plumber", "Fix the leaking sink in the kitchen", "2025-09-23", "Low");
    const todo4 = new Todo("Workout", "Gym session: legs and cardio", "2025-09-22", "Medium");

    defaultProject1.addTodo(todo1);
    defaultProject1.addTodo(todo2);
    defaultProject2.addTodo(todo3);
    defaultProject2.addTodo(todo4);

    projects.push(defaultProject1, defaultProject2)

    saveToLocalStorage(projects);

}


export function renderProjects() {

    const projectsList = document.querySelector(".projects");
    projectsList.innerHTML = "";

    projects.forEach((project, index) => createProjectUI(project, index, projectsList))
}


