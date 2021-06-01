import React, { useMemo } from "react";
import { TodoListItem } from "./TodoListItem";

import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import { Todo } from "../types";

interface Props {
  todos: Todo[];
}

const useStyles = makeStyles({
  categorySection: {
    marginBottom: 50,
  },
});

export const TodoList: React.FC<Props> = ({ todos }) => {
  const activeTodos = useMemo(
    () => todos.filter((todo) => todo.isComplete === false),
    [todos]
  );
  const completedTodos = useMemo(
    () => todos.filter((todo) => todo.isComplete === true),
    [todos]
  );

  const classes = useStyles();

  return (
    <>
      <Box className={classes.categorySection}>
        <Typography>進行中</Typography>
        <List className="active-list">
          {activeTodos.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </List>
      </Box>
      <Box className={classes.categorySection}>
        <Typography>已完成</Typography>
        <List className="completed-list`">
          {completedTodos.map((todo) => (
            <TodoListItem todo={todo} key={todo.id} />
          ))}
        </List>
      </Box>
    </>
  );
};
