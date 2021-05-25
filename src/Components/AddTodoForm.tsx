import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";

import { AddTodo } from "../types";

interface Props {
  addTodo: AddTodo;
}

// eslint-disable-next-line react/prop-types
export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const useStyles = makeStyles(() => ({
    addTodoForm: {
      display: "flex",
    },
    addTodoInput: {
      border: 0,
      marginBottom: 10,
    },
  }));

  const classes = useStyles();

  return (
    <form className={classes.addTodoForm}>
      <InputLabel htmlFor="todo-input">輸入待辦事項</InputLabel>
      <Input
        className={classes.addTodoInput}
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
    </form>
  );
};
