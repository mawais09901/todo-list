export class Todo{
    
    constructor(title, description, dueDate, priority){
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.completed = false;
    }

    markComplete(){
        this.completed = true;
    }

    markIncomplete(){
        this.completed = false;
    }

}