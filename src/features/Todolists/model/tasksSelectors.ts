import { RootState } from "../../../App/store/store";
import { TasksStateType, TaskType } from "./tasks-reducer/tasks-reducer";


export const selectTasks = (state: RootState): TasksStateType => state.tasks;