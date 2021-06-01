import { configureStore } from "@reduxjs/toolkit";
import todoReducer from "../reducer/reducer";
import logger from "redux-logger";

const store = configureStore({
  reducer: todoReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;

// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
