import { RootState } from "../../../App/store/store";
import { TodolistType } from "./todolists-reducer/todolists-reducer";

export const selectTodolists = (state: RootState): TodolistType[] => state.todolists;