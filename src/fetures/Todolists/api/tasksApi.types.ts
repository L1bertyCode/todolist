import { FieldError } from "./todolistsApi.types";

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

export type DomainTask = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type CreateTaskResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {
    item: DomainTask;
  };
};

export type UpdateTaskModel = {
  status: number;
  title: string;
  deadline: string;
  description: string;
  priority: number;
  startDate: string;
};

export type UpdateTaskResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {
    item: DomainTask;
  };
};

export type DeleteTaskResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {
  };
};