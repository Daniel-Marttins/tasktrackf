export class ToDoItem {
    id!:number;
    uid!:number;
    ownerId!: { id: number};
    title!: string;
    taskStatus!: string;
    description!: string;
    favorite!: boolean;
    color!: string;
    createAt!: Date;
    updatedAt!: Date;
}