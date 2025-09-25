import { Todo } from "./Todo";

export class Project {

    constructor(name){
        this.name = name;
        this.todos = [];
    }

    addTodo(todo){
        if(! (todo instanceof Todo)){
            throw new Error("Invalid Todo!");
        }
        if(this.todos.some(td => td.title === todo.title)){
            throw new Error("Todo Already Exists!");
        }
        this.todos.push(todo);
    }

    removeTodo(title){
        this.todos = this.todos.filter(td => td.title !== title);
    }

    getTodos(){
        return this.todos;
    }

}