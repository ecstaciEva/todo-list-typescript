import React, { useState } from "react";
import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";

import { AddTodo } from "../types";

interface Props {
  addTodo: AddTodo;
}
const useStyles = makeStyles({
  addTodoForm: {
    width: "100%",
  },
  addTodoInput: {
    border: 0,
    marginBottom: 10,
    width: "100%",
  },
  addTodoButton: {
    width: "100%",
  },
});

export const AddTodoForm: React.FC<Props> = ({ addTodo }) => {
  const [text, setText] = useState("");
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  const classes = useStyles();

  return (
    <Box component="form" className={classes.addTodoForm}>
      <InputLabel htmlFor="todo-input">輸入待辦事項</InputLabel>
      <Input
        id="todo-input"
        className={classes.addTodoInput}
        type="text"
        value={text}
        onChange={handleChange}
      />
      <Button
        variant="outlined"
        color="primary"
        className={classes.addTodoButton}
        onClick={(e) => {
          e.preventDefault();
          if (text.trim() !== "") {
            addTodo(text);
            setText("");
          }
        }}
      >
        新增
      </Button>
    </Box>
  );
};
