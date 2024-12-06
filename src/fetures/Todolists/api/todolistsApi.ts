import axios from 'axios';
import { CreateTodolistResponse, DeleteTodolistResponse, TodolistType, UpdateTodolistResponse } from './todolistsApi.types';
const API_KEY = '';
const TOKEN = '';

export const todolistsApi = {
  getTodolists() {
    const promise = axios.get<TodolistType[]>(
      'https://social-network.samuraijs.com/api/1.1/todo-lists',
      {
        headers: {
          Authorization: `${TOKEN}`,
        },
      }
    );
    return promise;
  },
  updateTodolist(payload: { id: string; title: string; }) {
    const { title, id } = payload;
    const promise = axios.put<UpdateTodolistResponse>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
      { title },
      {
        headers: {
          Authorization: `${TOKEN}`,
          'API-KEY': `${API_KEY}`,
        },
      }
    );
    return promise;
  },
  createTodolist(title: string) {
    const promise = axios.post<CreateTodolistResponse>('https://social-network.samuraijs.com/api/1.1/todo-lists',
      { title },
      {
        headers: {
          Authorization: `${TOKEN}`,
          'API-KEY': `${API_KEY}`
        },
      });
    return promise;
  },
  removeTodolist(id: string) {
    axios.delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
      headers: {
        Authorization: `${TOKEN}`,
        'API-KEY': `${API_KEY}`,
      },
    });
  }
};