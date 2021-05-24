import React from "react";
import { TodoListItem } from "./TodoListItem";

import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import List from "@material-ui/core/List";
import { makeStyles } from "@material-ui/core/styles";

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { EditTodo } from "../types";
import { DeleteTodo } from "../types";
import { SetEditText } from "../types";
import { CancelEdit } from "../types";

interface Props {
  todos: Todo[];
  onToggleTodo: ToggleTodo;
  onEditTodo: EditTodo;
  onDeleteTodo: DeleteTodo;
  onSetEditText: SetEditText;
  onCancelEdit: CancelEdit;
}

const useStyles = makeStyles((theme) => ({
  notCompletedSection: {
    marginBottom: theme.spacing(6),
  },
}));

export const TodoList: React.FC<Props> = ({
  todos,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
  onSetEditText,
  onCancelEdit,
}: Props) => {
  const activeTodos = todos.filter((todo) => todo.isComplete === false);
  const completedTodos = todos.filter((todo) => todo.isComplete === true);
  const classes = useStyles();

  return (
    <>
      <Grid className={classes.notCompletedSection}>
        <Typography variant="body1">進行中</Typography>
        <List>
          {activeTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggleTodo={onToggleTodo}
              onEditTodo={onEditTodo}
              onDeleteTodo={onDeleteTodo}
              onSetEditText={onSetEditText}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </List>
      </Grid>
      <Grid>
        <Typography variant="body1">已完成</Typography>
        <List>
          {completedTodos.map((todo) => (
            <TodoListItem
              key={todo.id}
              todo={todo}
              onToggleTodo={onToggleTodo}
              onEditTodo={onEditTodo}
              onDeleteTodo={onDeleteTodo}
              onSetEditText={onSetEditText}
              onCancelEdit={onCancelEdit}
            />
          ))}
        </List>
      </Grid>
    </>
  );
};
