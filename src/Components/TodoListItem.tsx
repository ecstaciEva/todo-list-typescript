import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  deleteTodo,
  toggleTodo,
  editTodo,
  cancelEdit,
  saveEdit,
} from "../action/action";

import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";
import ListItem from "@material-ui/core/ListItem";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

import { Todo } from "../types";

interface Props {
  todo: Todo;
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
});

export const TodoListItem: React.FC<Props> = ({ todo }) => {
  const dispatch = useDispatch();

  const [editText, setEdit] = useState(todo.text);
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEdit(e.target.value);
  };

  const classes = useStyles(todo);

  return (
    <ListItem className={classes.todoListItem}>
      <Checkbox
        style={{ display: "inline-block" }}
        color="primary"
        checked={todo.isComplete}
        onClick={() => {
          // console.log("toggleTodo");
          dispatch(toggleTodo(todo.id));
        }}
      />
      <Typography className={classes.todoText}>{todo.text}</Typography>
      <Button
        variant="outlined"
        className={`${classes.button} ${classes.editButton}`}
        onClick={() => {
          dispatch(editTodo(todo.id));
        }}
      >
        修改
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        className={classes.button}
        onClick={() => {
          dispatch(deleteTodo(todo.id));
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
            // console.log("saveEdit, todo, editText");

            dispatch(saveEdit(todo.id, editText));
          }
        }}
      >
        確定
      </Button>
      <Button
        variant="outlined"
        className={`${classes.button} ${classes.hiddenButton}`}
        onClick={() => {
          dispatch(cancelEdit());
        }}
      >
        取消
      </Button>
    </ListItem>
  );
};
