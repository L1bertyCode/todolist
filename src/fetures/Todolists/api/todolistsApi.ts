import { TodolistType } from "./todolistsApi.types";
import { instance } from "@/common/instance/instance";
import { BaseResponse } from "@/common/types/types";

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>("todo-lists");
  },
  updateTodolist(payload: { todolistId: string; title: string; }) {
    const { title, todolistId } = payload;
    return instance.put<BaseResponse>(`todo-lists/${todolistId}`, { title });
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType; }>>("todo-lists", { title });
  },
  removeTodolist(todolistId: string) {
    return instance.delete<BaseResponse>(`todo-lists/${todolistId}`);
  },
};
