import {
  type Action,
  configureStore,
  type ThunkAction,
} from "@reduxjs/toolkit";
import quizReducer from "./slices/quizSlice";

export const store = configureStore({
  reducer: {
    quiz: quizReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();
  const quizzes = state.quiz.quizzes;
  localStorage.setItem("quizzes", JSON.stringify(quizzes));
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
