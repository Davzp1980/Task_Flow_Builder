import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface NodeType {
  id: string;
  type: string;
  position: { x: number; y: number };
  data: {
    label: string;
  };
  measured: { height: number; width: number };
}

interface InitialStateProps {
  items: NodeType[];
}

const initialState: InitialStateProps = {
  items: [],
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,

  reducers: {
    setAllTasks(state: InitialStateProps, action: PayloadAction<NodeType>) {
      state.items.push({
        id: action.payload.id,
        type: action.payload.type,
        position: action.payload.position,
        data: action.payload.data,
        measured: action.payload.measured,
      });
    },
  },
});

export const { setAllTasks } = tasksSlice.actions;

export const tasksReducer = tasksSlice.reducer;
