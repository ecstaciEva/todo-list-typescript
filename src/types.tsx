export interface Todo {
  content: string;
  isComplete: boolean;
  isCached: boolean;
  id: number;
}

export type ToggleTodo = (selectedTodo: Todo) => void;
export type AddTodo = (text: string) => void;
export type EditTodo = (todo: Todo) => void;
export type DeleteTodo = (todo: Todo) => void;
export type SetEditText = (todo: Todo, text: string) => void;
export type CancelEdit = () => void;
