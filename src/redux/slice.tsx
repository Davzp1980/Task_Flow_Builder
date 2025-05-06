import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
  },

  reducers: {
    setAllTasks(state, action: PayloadAction<Node[]>) {
      state.items.push(action.payload);
    },
  },
});

export const { setAllTasks } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
