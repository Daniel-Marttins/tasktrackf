import { ToDoItem } from "./ToDoItem";

export interface User {
    id: number;
    username: string;
    email: string;
    password: string;
    imgUrl: string;
    toDoItems: ToDoItem[];
    createAt: Date;
    updatedAt: Date;
}