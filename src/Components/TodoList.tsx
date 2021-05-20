import React from "react";
import { TodoListItem } from "./TodoListItem";

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { EditTodo } from "../types";
import { DeleteTodo } from "../types";
import { SetEditText } from "../types";
import { CancelEdit } from "../types";

interface Props {
  todos: Todo[];
  toggleTodo: ToggleTodo;
  editTodo: EditTodo;
  deleteTodo: DeleteTodo;
  setEditText: SetEditText;
  cancelEdit: CancelEdit;
}

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  editTodo,
  deleteTodo,
  setEditText,
  cancelEdit,
}: Props) => {
  const activeTodos = todos.filter((todo) => todo.isComplete === false);
  const completedTodos = todos.filter((todo) => todo.isComplete === true);

  return (
    <div>
      <div className="not-completed-section">
        <label>進行中</label>
        <ul className="not-completed-list`">
          {activeTodos.map((todo) => (
            <TodoListItem
              key={todo.text}
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              setEditText={setEditText}
              cancelEdit={cancelEdit}
            />
          ))}
        </ul>
      </div>
      <div className="not-completed-section">
        <label>已完成</label>
        <ul className="not-completed-list`">
          {completedTodos.map((todo) => (
            <TodoListItem
              key={todo.text}
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              setEditText={setEditText}
              cancelEdit={cancelEdit}
            />
          ))}
        </ul>
      </div>
    </div>
  );
};
