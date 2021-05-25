import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import Checkbox from "@material-ui/core/Checkbox";
import TextField from "@material-ui/core/TextField";

import { Todo } from "../types";
import { ToggleTodo } from "../types";
import { DeleteTodo } from "../types";
import { EditTodo } from "../types";
import { SaveEdit } from "../types";
import { CancelEdit } from "../types";
import { CSSProperties } from "@material-ui/styles";

interface Props {
  todo: Todo;
  toggleTodo: ToggleTodo;
  editTodo: EditTodo;
  deleteTodo: DeleteTodo;
  saveEdit: SaveEdit;
  cancelEdit: CancelEdit;
}

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
    setEdit(e.target.value.trim());
  };

  const todoListItemStyle: CSSProperties = {
    display: "flex",
    justifyContent: "flex-start",
    width: "100%",
    marginBottom: "10px",
  };

  const cachedInputStyle: CSSProperties = {
    display: todo.isEditing ? "inline-block" : "none",
    height: 20,
    transform: "translateY(80%)",
    margin: "0 30px",
  };

  const buttonStyle: CSSProperties = {
    margin: "0 20px",
  };

  return (
    <li className="todo-list-item" style={todoListItemStyle}>
      <label>
        <Checkbox
          style={{ display: "inline-block" }}
          color="primary"
          checked={todo.isComplete}
          onClick={function () {
            toggleTodo(todo);
          }}
        />
        <p
          style={{
            textDecoration: todo.isComplete ? "line-through" : undefined,
            display: "inline-block",
            width: 200,
            marginRight: 5,
          }}
        >
          {todo.text}
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
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        style={{ display: todo.isEditing ? "inline-block" : "none" }}
        onClick={function (e) {
          e.preventDefault();
          if (editText !== "") {
            saveEdit(todo, editText);
          }
        }}
      >
        確定
      </Button>
      <Button
        variant="outlined"
        style={{
          margin: "0 20px",
          display: todo.isEditing ? "inline-block" : "none",
        }}
        onClick={cancelEdit}
      >
        取消
      </Button>
    </li>
  );
};
