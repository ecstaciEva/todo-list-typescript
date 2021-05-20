interface Todo {
    text: string;
    isComplete: boolean;
    isCached: boolean;
    id: number;
}

interface Style {
    [propName: string]: string;
}

type ToggleTodo = (selectedTodo: Todo) => void;
type AddTodo = (text:string) => void;
type EditTodo = (todo: Todo) => void;
type DeleteTodo = (todo: Todo) => void;
type SetEditText = (todo:Todo, text:string) => void;
type CancelEdit = () => void;