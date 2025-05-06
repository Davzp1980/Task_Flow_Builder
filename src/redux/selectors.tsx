import { RootState } from './store';

export const selectAllTasks = (state: RootState) => state.tasks.items;
