export interface Todo {
  text: string;
  isComplete: boolean;
  isEditing: boolean;
  id: string;
}

export type ToggleTodo = (selectedTodo: Todo) => void;
export type AddTodo = (text: string) => void;
export type EditTodo = (todo: Todo) => void;
export type DeleteTodo = (todo: Todo) => void;
export type SaveEdit = (todo: Todo, text: string) => void;
export type CancelEdit = () => void;
