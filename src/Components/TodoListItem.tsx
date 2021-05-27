import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { DeleteTodo } from "../types";
import { EditTodo } from "../types";
import { SaveEdit } from "../types";
import { CancelEdit } from "../types";

interface Props {
  todo: Todo;
  toggleTodo: ToggleTodo;
  editTodo: EditTodo;
  deleteTodo: DeleteTodo;
  saveEdit: SaveEdit;
  cancelEdit: CancelEdit;
}

const useStyles = makeStyles({
  todoListItem: {
    marginBottom: 10,
  },
  cachedInput: (prop: Todo) => ({
    display: prop.isEditing ? "inline-block" : "none",
    height: 20,
    margin: "0 30px",
  }),
  button: {
    margin: "0 10px",
  },
  hiddenButton: (prop: Todo) => ({
    display: prop.isEditing ? "inline-block" : "none",
  }),
  editButton: (prop: Todo) => ({
    display: prop.isComplete ? "none" : "inline-block",
  }),
  todoText: (prop: Todo) => ({
    textDecoration: prop.isComplete ? "line-through" : undefined,
    display: "inline-block",
    width: 200,
    marginRight: 5,
  }),
  checkbox: {
    display: "inline-block",
  },
});

export const TodoListItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  editTodo,
  deleteTodo,
  saveEdit,
  cancelEdit,
}: Props) => {
  const [editText, setEdit] = useState(todo.text);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(e.target.value);
  };

  const styleProps = todo;
  const classes = useStyles(styleProps);

  return (
    <ListItem className={classes.todoListItem}>
      <Checkbox
        className={classes.checkbox}
        color="primary"
        checked={todo.isComplete}
        onClick={function () {
          toggleTodo(todo);
        }}
      />
      <Typography className={classes.todoText}>{todo.text}</Typography>
      <Button
        variant="outlined"
        className={`${classes.button} ${classes.editButton}`}
        onClick={() => {
          editTodo(todo);
        }}
      >
        修改
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.button}
        onClick={() => {
          deleteTodo(todo);
        }}
      >
        移除
      </Button>

      <TextField
        value={editText}
        className={classes.cachedInput}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        color="primary"
        className={`${classes.button} ${classes.hiddenButton}`}
        onClick={(e) => {
          e.preventDefault();
          if (editText.trim() !== "") {
            saveEdit(todo, editText);
          }
        }}
      >
        確定
      </Button>
      <Button
        variant="outlined"
        className={`${classes.button} ${classes.hiddenButton}`}
        onClick={cancelEdit}
      >
        取消
      </Button>
    </ListItem>
  );
};
