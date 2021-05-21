import React, { useState } from "react";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";
import Container from "@material-ui/core/Container";

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { AddTodo } from "../types";
import { DeleteTodo } from "../types";
import { EditTodo } from "../types";
import { SetEditText } from "../types";
import { CancelEdit } from "../types";

const initialTodos = [
  { text: "task 2", isComplete: false, isCached: false, id: 123 },
  { text: "task 1", isComplete: true, isCached: false, id: 456 },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);

  // toggleTodo切換isComplete
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
    const timestamp: number = Math.floor(Date.now());
    const newTodo = { text, isComplete: false, isCached: false, id: timestamp };
    setTodos([...todos, newTodo]);
  };

  const editTodo: EditTodo = (todo) => {
    todos.forEach((item) => (item.isCached = false));
    setTodos([...todos]);
    const cacheTodo: Todo = todos.filter((item) => todo.id === item.id)[0];
    cacheTodo.isCached = true;
  };

  const setEditText: SetEditText = (todo, text) => {
    // 修改目標todo內容
    todos.forEach((item) => {
      if (item.id === todo.id) {
        todo.text = text;
        todo.isCached = false;
      }
    });
    setTodos([...todos]);
  };

  const cancelEdit: CancelEdit = () => {
    todos.forEach((item) => (item.isCached = false));
    setTodos([...todos]);
  };

  const deleteTodo: DeleteTodo = (todo: Todo) => {
    const key: string = todo.text;
    const spliceIndex: number = todos.findIndex((item) => item.text === key);
    todos.splice(spliceIndex, 1);
    setTodos([...todos]);
  };

  return (
    <Container maxWidth="md">
      <h1>What is the Plan for Today ?</h1>
      <TodoList
        todos={todos}
        editTodo={editTodo}
        toggleTodo={toggleTodo}
        deleteTodo={deleteTodo}
        setEditText={setEditText}
        cancelEdit={cancelEdit}
      />
      <AddTodoForm addTodo={addTodo} />
    </Container>
  );
};

export default App;
