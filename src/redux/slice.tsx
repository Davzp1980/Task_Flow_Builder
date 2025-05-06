import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NodeData {
  id: string;
  data: {
    label: string;
  };
  position: {
    x: number;
    y: number;
  };
  type: string;
}

interface TasksState {
  items: NodeData[];
}

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: {
    items: [],
  },

  reducers: {
    setAllTasks(state, action: PayloadAction<NodeData>) {
      state.items.push(action.payload);
    },
  },
});

export const { setAllTasks } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
