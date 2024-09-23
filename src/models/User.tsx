import { ToDoItem } from "./ToDoItem";

export interface User {
    id: number;
    uid: number;
    username: string;
    email: string;
    password: string;
    toDoItems: ToDoItem[];
    createAt: Date;
    updatedAt: Date;
}