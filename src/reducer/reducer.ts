import { Todo } from "../types";
import { createReducer } from "@reduxjs/toolkit";
import * as actions from "../action/action";

interface InitState {
  todos: Todo[];
  addTodoText: string;
  editText: string;
  text: string;
}

const initState: InitState = {
  text: "123",
  todos: [
    {
      text: "React Redux Learning",
      isComplete: false,
      isEditing: false,
      id: "123",
    },
    {
      text: "React Hooks Learning",
      isComplete: false,
      isEditing: false,
      id: "456",
    },
  ],
  addTodoText: "新增事項",
  editText: "待改內容",
};

const todoReducer = createReducer(initState, (builder) => {
  builder
    .addCase(actions.addTodo, (state, action) => {
      const newTodo = {
        text: action.payload.text,
        id: action.payload.id,
        isComplete: false,
        isEditing: false,
      };
      state.todos.push(newTodo);
    })
    .addCase(actions.deleteTodo, (state, action) => {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    })
    .addCase(actions.toggleTodo, (state, action) => {
      const newTodos = state.todos.map((todo) => {
        if (todo.id === action.payload.id) {
          return {
            ...todo,
            isComplete: !todo.isComplete,
            isEditing: false,
          };
        }
        return todo;
      });
      state.todos = newTodos;
    })
    .addCase(actions.editTodo, (state, action) => {
      state.todos = state.todos.map((todo) => {
        todo.isEditing = todo.id === action.payload.id;
        return todo;
      });
    })
    // 待確認
    .addCase(actions.cancelEdit, (state) => {
      state.todos = state.todos.map((todo) => {
        todo.isEditing = false;
        return todo;
      });
    });
});

export default todoReducer;
