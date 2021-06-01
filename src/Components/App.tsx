import React from "react";
import { RootState } from "../store/store";
import { TodoList } from "./TodoList";
import { AddTodoForm } from "./AddTodoForm";

import { useSelector } from "react-redux";

import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(() => ({
  title: {
    fontSize: 45,
    marginBottom: 50,
  },
}));

const App: React.FC = () => {
  const todos = useSelector((state: RootState) => state.todos);
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <Typography component="h1" className={classes.title}>
        What is the Plan for Today ?
      </Typography>
      <TodoList todos={todos} />
      <AddTodoForm />
    </Container>
  );
};

export default App;
