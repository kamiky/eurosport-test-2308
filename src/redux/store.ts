import { configureStore } from "@reduxjs/toolkit";
import thunk from "redux-thunk";
import playersReducer from "redux/players";
import matchesReducer from "redux/matches";

export const store = configureStore({
  reducer: {
    players: playersReducer,
    matches: matchesReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(thunk),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
