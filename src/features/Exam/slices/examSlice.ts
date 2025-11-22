import { createSlice } from "@reduxjs/toolkit";

export type ExamState = {
    value: boolean;
}

const initialState: ExamState = {
    value: false
}

export const examSlice = createSlice({
    name: "exam",
    initialState: initialState,
    reducers: {
        setExam: (state) => { state.value = true },
        removeExam: (state) => { state.value = false }
    }
});

export const { setExam, removeExam } = examSlice.actions;

export default examSlice.reducer;