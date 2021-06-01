import { createAction, nanoid } from "@reduxjs/toolkit";

export const addTodo = createAction(
  "todos/add",
  function prepare(text: string) {
    return {
      payload: {
        text,
        id: nanoid(),
      },
    };
  }
);

export const addTodoTextChange = createAction(
  "todos/addTodoTextChange",
  function prepare(text: string) {
    return {
      payload: {
        text,
      },
    };
  }
);

export const deleteTodo = createAction(
  "todos/delete",
  function prepare(id: string) {
    return {
      payload: {
        id,
      },
    };
  }
);

export const toggleTodo = createAction(
  "todos/toggle",
  function prepare(id: string) {
    return {
      payload: {
        id,
      },
    };
  }
);

export const editTodo = createAction(
  "todos/edit",
  function prepare(id: string, text: string) {
    return {
      payload: {
        id,
        text,
      },
    };
  }
);

export const editTextChange = createAction(
  "todos/editTextChange",
  function prepare(text: string) {
    return {
      payload: {
        text,
      },
    };
  }
);

export const saveEdit = createAction(
  "todos/saveEdit",
  function prepare(id: string, editingText: string) {
    return {
      payload: {
        id,
        editingText,
      },
    };
  }
);

export const cancelEdit = createAction("todos/cancelEdit");
