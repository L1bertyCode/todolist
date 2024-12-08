import { TaskPriority, TaskStatus } from "@/common/enums/enums";
import { FieldError } from "@/common/types/types";

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

export type DomainTask = {
  description: string;
  title: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type UpdateTaskModel = {
  title: string;
  deadline: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  startDate: string;
};

