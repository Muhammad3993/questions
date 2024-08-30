import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Quizz } from "../../interfaces";

interface QuizState {
  quizzes: Quizz[];
}

const initialState: QuizState = {
  quizzes: JSON.parse(localStorage.getItem("quizzes") || "[]"),
};

const quizSlice = createSlice({
  name: "quizSlice",
  initialState,
  reducers: {
    addQuiz: (state, action: PayloadAction<Quizz>) => {
      const newQuiz: Quizz = {
        id: action.payload.id,
        title: action.payload.title,
        questions: action.payload.questions,
      }
      state.quizzes.push(newQuiz);
    },
  },
});

export const { addQuiz } = quizSlice.actions;
export default quizSlice.reducer;
