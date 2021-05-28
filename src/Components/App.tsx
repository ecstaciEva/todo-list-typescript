import React, { useState } from "react";
import { useCallback } from "react";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { AddTodo } from "../types";
import { DeleteTodo } from "../types";
import { EditTodo } from "../types";
import { SaveEdit } from "../types";
import { CancelEdit } from "../types";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 45,
    marginBottom: 50,
  },
}));

const initialTodos = [
  { text: "task 1", isComplete: false, isEditing: false, id: 123 },
  { text: "task 2", isComplete: true, isEditing: false, id: 456 },
];

const App: React.FC = () => {
  const [todos, setTodos] = useState(initialTodos);
  const classes = useStyles();

  // Learn how to use useCallback()
  const toggleTodo: ToggleTodo = useCallback(
    (todo) => {
      setTodos((todos) => {
        const newTodos = todos.map((item) => {
          if (todo.id === item.id) {
            return {
              ...item,
              isComplete: !item.isComplete,
            };
          }
          return item;
        });
        return newTodos;
      });
    },
    [todos]
  );

  const addTodo: AddTodo = (text) => {
    setTodos((todos) => {
      const timestamp = Date.now();
      const newTodo: Todo = {
        text,
        isComplete: false,
        isEditing: false,
        id: timestamp,
      };
      return todos.concat(newTodo);
    });
  };

  const editTodo: EditTodo = (todo) => {
    setTodos((todos) => {
      const editList = todos.map((item) => {
        item.isEditing = item.id === todo.id;
        return item;
      });
      return editList;
    });
  };

  const saveEdit: SaveEdit = (todo, text) => {
    setTodos((todos) => {
      const savedTodos = todos.map((item) => {
        if (item.id === todo.id) {
          item.text = text;
          item.isEditing = false;
        }
        return item;
      });
      return savedTodos;
    });
  };

  const cancelEdit: CancelEdit = () => {
    setTodos((todos) => {
      const cancelEditTodos = todos.map((item) => {
        item.isEditing = false;
        return item;
      });
      return cancelEditTodos;
    });
  };

  const deleteTodo: DeleteTodo = (todo: Todo) => {
    setTodos((todos) => {
      const remainedTodos = todos.filter((item) => item.id !== todo.id);
      return remainedTodos;
    });
  };

  return (
    <Container maxWidth="md">
      <Typography component="h1" className={classes.title}>
        What is the Plan for Today ?
      </Typography>
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
