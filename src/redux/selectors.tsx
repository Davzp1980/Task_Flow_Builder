import { RootState } from './store';

export const selectAllTasks = (state: RootState): Node[] => state.tasks.items;
