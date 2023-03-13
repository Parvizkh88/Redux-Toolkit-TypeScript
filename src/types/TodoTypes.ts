export interface TodoT {
    userId:number
    id:number
    title:string
    completed:boolean
    // I added newTodo later by myself:
    newTodo:string
}
export interface TodosState {
    todos: TodoT[];
    isLoading: boolean;
    isError: boolean;
    message: string;
}

