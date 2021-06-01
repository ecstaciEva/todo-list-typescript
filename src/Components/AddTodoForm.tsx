import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store/store";
import { addTodo, addTodoTextChange } from "../action/action";

import Button from "@material-ui/core/Button";
import InputLabel from "@material-ui/core/InputLabel";
import Box from "@material-ui/core/Box";
import Input from "@material-ui/core/Input";
import { makeStyles } from "@material-ui/core/styles";

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

export const AddTodoForm: React.FC = () => {
  const dispatch = useDispatch();
  const addTodoText = useSelector((state: RootState) => state.addTodoText);

  const classes = useStyles();

  return (
    <Box component="form" className={classes.addTodoForm}>
      <InputLabel htmlFor="todo-input">輸入待辦事項</InputLabel>
      <Input
        id="todo-input"
        className={classes.addTodoInput}
        type="text"
        value={addTodoText}
        onChange={(e) => {
          dispatch(addTodoTextChange(e.target.value));
        }}
      />
      <Button
        variant="outlined"
        color="primary"
        className={classes.addTodoButton}
        onClick={(e) => {
          e.preventDefault();
          if (addTodoText.trim() !== "") {
            dispatch(addTodo(addTodoText));
          }
        }}
      >
        新增
      </Button>
    </Box>
  );
};
