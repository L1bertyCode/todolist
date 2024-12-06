import axios from 'axios';
import { CreateTodolistResponse, DeleteTodolistResponse, TodolistType, UpdateTodolistResponse } from './todolistsApi.types';
import { instance } from '@/common/common/instance/instance';

export const todolistsApi = {
  getTodolists() {
    return instance.get<TodolistType[]>('todo-lists');
  },
  updateTodolist(payload: { id: string; title: string; }) {
    const { title, id } = payload;
    return instance.put<UpdateTodolistResponse>(
      `todo-lists/${id}`, { title });
  },
  createTodolist(title: string) {
    return instance.post<CreateTodolistResponse>('todo-lists',
      { title },
    );
  },
  removeTodolist(id: string) {
    return instance.delete<DeleteTodolistResponse>(`todo-lists/${id}`);
  }
};