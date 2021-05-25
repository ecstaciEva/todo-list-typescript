import React from "react";
import { TodoListItem } from "./TodoListItem";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles"; // TODO:

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { EditTodo } from "../types";
import { DeleteTodo } from "../types";
import { SaveEdit } from "../types";
import { CancelEdit } from "../types";

interface Props {
  todos: Todo[];
  toggleTodo: ToggleTodo;
  editTodo: EditTodo;
  deleteTodo: DeleteTodo;
  saveEdit: SaveEdit;
  cancelEdit: CancelEdit;
}

export const TodoList: React.FC<Props> = ({
  todos,
  toggleTodo,
  editTodo,
  deleteTodo,
  saveEdit,
  cancelEdit,
}: Props) => {
  // FIXME:
  const activeTodos = todos.filter((todo) => todo.isComplete === false);
  const completedTodos = todos.filter((todo) => todo.isComplete === true);

  const useStyles = makeStyles(() => ({
    categorySection: {
      marginBottom: 50,
    },
  }));

  const classes = useStyles();

  return (
    <>
      <Box className={classes.categorySection}>
        <Typography>進行中</Typography>
        <List className="active-list">
          {activeTodos.map((todo) => (
            <TodoListItem
              key={todo.text}
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
            />
          ))}
        </List>
      </Box>
      <Box className={classes.categorySection}>
        <Typography>已完成</Typography>
        <List className="completed-list`">
          {completedTodos.map((todo) => (
            <TodoListItem
              key={todo.text}
              todo={todo}
              toggleTodo={toggleTodo}
              editTodo={editTodo}
              deleteTodo={deleteTodo}
              saveEdit={saveEdit}
              cancelEdit={cancelEdit}
            />
          ))}
        </List>
      </Box>
    </>
  );
};
