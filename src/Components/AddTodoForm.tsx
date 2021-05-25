import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import FormControl from "@material-ui/core/FormControl";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";

import { AddTodo } from "../types";
import { CSSProperties } from "@material-ui/styles";

interface Props {
  addTodo: AddTodo;
}

// eslint-disable-next-line react/prop-types
export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const formStyle: CSSProperties = {
    display: "flex",
  };

  return (
    <FormControl style={formStyle}>
      <InputLabel htmlFor="todo-input">輸入待辦事項</InputLabel>
      <Input
        style={{ border: 0, marginBottom: 10 }}
        type="text"
        id="todo-input"
        value={text}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        color="primary"
        type="submit"
        onClick={function (e) {
          e.preventDefault();
          if (text.trim() !== "") {
            addTodo(text);
            setText("");
          }
        }}
      >
        新增
      </Button>
    </FormControl>
  );
};
