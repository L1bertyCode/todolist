import { RootState } from "@/app/providers/reduxProvider/store";

export const selectTodolists = (state: RootState) => state.todolists;