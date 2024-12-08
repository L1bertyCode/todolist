import { RootState } from "@/app/providers/reduxProvider/store"

export const selectTasks = (state: RootState) => state.tasks
