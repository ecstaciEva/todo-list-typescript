import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { DeleteTodo } from "../types";
import { EditTodo } from "../types";
import { SetEditText } from "../types";
import { CancelEdit } from "../types";

interface Props {
  todo: Todo;
  toggleTodo: ToggleTodo;
  editTodo: EditTodo;
  deleteTodo: DeleteTodo;
  setEditText: SetEditText;
  cancelEdit: CancelEdit;
}

export const TodoListItem: React.FC<Props> = ({
  todo,
  toggleTodo,
  editTodo,
  deleteTodo,
  setEditText,
  cancelEdit,
}: Props) => {
  const [editText, setEdit] = useState(todo.text);

  const todoListItemStyle = {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "10px",
  };

  const cachedInputStyle = {
    display: todo.isCached ? "inline-block" : "none",
    height: "20px",
    transform: "translateY(80%)",
    margin: "0 30px",
  };

  const buttonStyle = {
    margin: "0 20px",
  };

  return (
    <li className="todo-list-item" style={todoListItemStyle}>
      <label>
        <Checkbox
          style={{ display: "inline-block" }}
          color="primary"
          checked={todo.isComplete}
          onClick={() => {
            toggleTodo(todo);
          }}
        />
        <p
          style={{
            textDecoration: todo.isComplete ? "line-through" : undefined,
            display: "inline-block",
            width: "200px",
          }}
        >
          {todo.text + " "}
        </p>
      </label>
      <Button
        variant="outlined"
        style={buttonStyle}
        onClick={() => {
          editTodo(todo);
        }}
      >
        修改
      </Button>
      <Button
        variant="outlined"
        color="secondary"
        style={buttonStyle}
        onClick={() => {
          deleteTodo(todo);
        }}
      >
        移除
      </Button>

      <TextField
        id="cachedInput"
        defaultValue={todo.text}
        style={cachedInputStyle}
        onChange={(e) => {
          setEdit(e.target.value.trim());
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        style={{ display: todo.isCached ? "inline-block" : "none" }}
        onClick={function (e) {
          e.preventDefault();
          if (editText !== "") {
            setEditText(todo, editText);
          }
        }}
      >
        確定
      </Button>
      <Button
        variant="outlined"
        style={{
          margin: "0 20px",
          display: todo.isCached ? "inline-block" : "none",
        }}
        onClick={() => {
          cancelEdit();
        }}
      >
        取消
      </Button>
    </li>
  );
};
