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
    const timestamp: number = Date.now();
    const newTodo = {
      text,
      isComplete: false,
      isEditing: false,
      id: timestamp,
    };
    setTodos(todos.concat([newTodo]));
  };

  const editTodo: EditTodo = (todo) => {
    const editList = todos.map((item) => {
      item.isEditing = item.id === todo.id ? true : false;
      return item;
    });
    setTodos([...editList]);
  };

  const saveEdit: SaveEdit = (todo, text) => {
    todos.forEach((item) => {
      if (item.id === todo.id) {
        todo.text = text;
        todo.isEditing = false;
      }
    });
    setTodos([...todos]);
  };

  const cancelEdit: CancelEdit = () => {
    todos.forEach((item) => (item.isEditing = false));
    setTodos([...todos]);
  };

  const deleteTodo: DeleteTodo = (todo: Todo) => {
    const remainedTodos = todos.filter((item) => item.id !== todo.id);
    setTodos([...remainedTodos]);
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
