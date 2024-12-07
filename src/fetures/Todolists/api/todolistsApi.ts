import axios from 'axios';
import {  TodolistType } from './todolistsApi.types';
import { instance } from '@/common/common/instance/instance';
import { BaseResponse } from '@/common/types/types';

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  updateTodolist(payload: { id: string; title: string; }) {
    const { title, id } = payload;
    return instance.put<BaseResponse>(
      `todo-lists/${id}`, { title });
  },
  createTodolist(title: string) {
    return instance.post<BaseResponse<{ item: TodolistType; }>>('todo-lists',
      { title },
    );
  },
  removeTodolist(id: string) {
    return instance.delete<BaseResponse>(`todo-lists/${id}`);
  }
};