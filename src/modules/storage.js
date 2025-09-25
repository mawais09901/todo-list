import { Project } from "./Project";
import { Todo } from "./Todo";

export function saveToLocalStorage(projects){
    localStorage.setItem("projects",JSON.stringify(projects));
}

export function loadFromLocalStorage(){

    let data = localStorage.getItem("projects");
    if (!data) return [];

    let parsedData = JSON.parse(data);
    return parsedData.map(project => {
        const newProject = new Project(project.name);
        if(project.todos && project.todos.length > 0){
            project.todos.forEach(todo => {
                const newTodo = new Todo(todo.title, todo.description, todo.dueDate, todo.priority);
                newProject.addTodo(newTodo);
            })
        }
        return newProject;
    })

}