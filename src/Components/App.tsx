import React, { useState } from "react";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";
import Container from "@material-ui/core/Container";

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { AddTodo } from "../types";
import { DeleteTodo } from "../types";
import { EditTodo } from "../types";
import { SaveEdit } from "../types";
import { CancelEdit } from "../types";

const initialTodos = [
  { text: "task 1", isComplete: false, isEditing: false, id: 123 },
  { text: "task 2", isComplete: true, isEditing: false, id: 456 },
];

const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);

  const toggleTodo: ToggleTodo = (selectedTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo.text === selectedTodo.text) {
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (text) => {
    const timestamp = Date.now();
    const newTodo: Todo = {
      text,
      isComplete: false,
      isEditing: false,
      id: timestamp,
    };
    setTodos(todos.concat(newTodo));
  };

  const editTodo: EditTodo = (todo) => {
    const editList = todos.map((item) => {
      item.isEditing = item.id === todo.id;
      return item;
    });
    setTodos(editList);
  };

  // FIXME: use arr.map
  const saveEdit: SaveEdit = (todo, text) => {
    const savedTodos = todos.map((item) => {
      if (item.id === todo.id) {
        item.text = text;
        item.isEditing = false;
      }
      return item;
    });
    setTodos(savedTodos);
  };

  const cancelEdit: CancelEdit = () => {
    const cancelEditTodos = todos.map((item) => {
      item.isEditing = false;
      return item;
    });
    setTodos(cancelEditTodos);
  };

  const deleteTodo: DeleteTodo = (todo: Todo) => {
    const remainedTodos = todos.filter((item) => item.id !== todo.id);
    setTodos(remainedTodos);
  };

  return (
    <Container maxWidth="md">
      <h1>What is the Plan for Today ?</h1>
      <TodoList
        todos={todos}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        saveEdit={saveEdit}
        cancelEdit={cancelEdit}
      />
      <AddTodoForm addTodo={addTodo} />
    </Container>
  );
};

export default App;
