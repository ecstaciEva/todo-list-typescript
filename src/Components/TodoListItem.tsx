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
import { SetEditText } from "../types";
import { CancelEdit } from "../types";

interface Props {
  todo: Todo;
  onToggleTodo: ToggleTodo;
  onEditTodo: EditTodo;
  onDeleteTodo: DeleteTodo;
  onSetEditText: SetEditText;
  onCancelEdit: CancelEdit;
}

const useStyle = makeStyles((theme) => ({
  button: {
    marginLeft: theme.spacing(3),
  },
  cachedInput: {
    margin: "0 30px",
  },
  ckeckbox: {
    display: "inline-block",
  },
  todoListItem: {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: theme.spacing(1),
  },
  todoText: {
    display: "inline-block",
    width: "200px",
  },
}));

export const TodoListItem: React.FC<Props> = ({
  todo,
  onToggleTodo,
  onEditTodo,
  onDeleteTodo,
  onSetEditText,
  onCancelEdit,
}: Props) => {
  const [editText, setEdit] = useState(todo.content);
  const classes = useStyle();

  return (
    <ListItem className={classes.todoListItem}>
      <Checkbox
        className="checkbox"
        color="primary"
        checked={todo.isComplete}
        onClick={() => {
          onToggleTodo(todo);
        }}
      />

      <Typography
        className={classes.todoText}
        style={{ textDecoration: todo.isComplete ? "line-through" : undefined }}
      >
        {todo.content + " "}
      </Typography>

      <Button
        className={classes.button}
        style={{ display: todo.isComplete ? "none" : "inline-block" }}
        variant="outlined"
        onClick={() => {
          onEditTodo(todo);
        }}
      >
        修改
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        color="secondary"
        onClick={() => {
          onDeleteTodo(todo);
        }}
      >
        移除
      </Button>

      <TextField
        id="cachedInput"
        className={classes.cachedInput}
        style={{ display: todo.isCached ? "inline-block" : "none" }}
        defaultValue={todo.content}
        onChange={(e) => {
          setEdit(e.target.value.trim());
        }}
      />
      <Button
        className={classes.button}
        variant="outlined"
        color="primary"
        type="submit"
        style={{ display: todo.isCached ? "inline-block" : "none" }}
        onClick={function (e) {
          e.preventDefault();
          if (editText !== "") {
            onSetEditText(todo, editText);
          }
        }}
      >
        確定
      </Button>
      <Button
        className={classes.button}
        variant="outlined"
        style={{ display: todo.isCached ? "inline-block" : "none" }}
        onClick={() => {
          onCancelEdit();
        }}
      >
        取消
      </Button>
    </ListItem>
  );
};
