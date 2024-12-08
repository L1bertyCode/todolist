import { instance } from "@/common/common/instance/instance";
import {
  DomainTask, GetTasksResponse, UpdateTaskModel,
} from "./tasksApi.types";
import { BaseTaskResponse } from "@/common/types/types";

export const tasksApi = {
  getTasks(todolistId: string) {
    return instance.get<GetTasksResponse>(`todo-lists/${todolistId}/tasks`);
  },
  createTask(payload: { todolistId: string, title: string; }) {
    const { todolistId, title } = payload;
    return instance.post<BaseTaskResponse<DomainTask>>(`todo-lists/${todolistId}/tasks`,
      { title });
  },
  removeTask(payload: { taskId: string, todolistId: string; }) {
    const { taskId, todolistId } = payload;
    return instance.delete<BaseTaskResponse>(
      `todo-lists/${todolistId}/tasks/${taskId}`
    );
  },
  changeTaskStatus(payload: { model: UpdateTaskModel, todolistId: string, taskId: string; }) {
    const { model, todolistId, taskId } = payload;
    return instance.put<BaseTaskResponse<DomainTask>>(
      `https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
      model,
    );
  },
  changeTaskTitle(payload: { title: string, todolistId: string, taskId: string; }) {
    const { taskId, todolistId, title } = payload;
    return instance.put<BaseTaskResponse<DomainTask>>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`,
      title
    );
  }
};