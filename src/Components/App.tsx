import React, { useState } from "react";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import "@fontsource/roboto";

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { AddTodo } from "../types";
import { DeleteTodo } from "../types";
import { EditTodo } from "../types";
import { SetEditText } from "../types";
import { CancelEdit } from "../types";

const useStyles = makeStyles((theme) => ({
  title: {
    marginBottom: theme.spacing(6),
  },
}));

const initialTodos = [
  { content: "task 2", isComplete: false, isCached: false, id: 123 },
  { content: "task 1", isComplete: true, isCached: false, id: 456 },
];

const App = () => {
  const [todos, setTodos] = useState(initialTodos);
  const classes = useStyles();

  // toggleTodo切換isComplete
  const toggleTodo: ToggleTodo = (selectedTodo) => {
    const newTodos = todos.map((todo) => {
      if (todo.content === selectedTodo.content) {
        return {
          ...todo,
          isComplete: !todo.isComplete,
        };
      }
      return todo;
    });
    setTodos(newTodos);
  };

  const addTodo: AddTodo = (content) => {
    const timestamp: number = Math.floor(Date.now());
    const newTodo = {
      content,
      isComplete: false,
      isCached: false,
      id: timestamp,
    };
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
        todo.content = text;
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
    const key: string = todo.content;
    const spliceIndex: number = todos.findIndex((item) => item.content === key);
    todos.splice(spliceIndex, 1);
    setTodos([...todos]);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h3" className={classes.title}>
        What is the Plan for Today ?
      </Typography>
      <TodoList
        todos={todos}
        onEditTodo={editTodo}
        onToggleTodo={toggleTodo}
        onDeleteTodo={deleteTodo}
        onSetEditText={setEditText}
        onCancelEdit={cancelEdit}
      />
      <AddTodoForm addTodo={addTodo} />
    </Container>
  );
};

export default App;
