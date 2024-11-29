import { v1 } from 'uuid';

import { AddTodolistActionType, RemoveTodolistActionType } from '../todolists-reducer/todolists-reducer';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TasksStateType = Record<string, TaskType[]>;

const initialState: TasksStateType = {};

export const tasksReducer = (state: TasksStateType = initialState, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)] };
    }
    case "ADD-TASK": {
      console.log("action.payload.title", action.payload.todolistId);

      return {
        ...state,
        [action.payload.todolistId]:
          [...state[action.payload.todolistId],
          {
            id: v1(),
            title: action.payload.title, isDone: false
          }
          ]
      };
    }
    case "CHANGE-TASK-STATUS": {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t) };
    }

    case "CHANGE-TASK-TITLE": {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t) };
    }
    case "ADD-TODOLIST": {
      return { ...state, [action.payload.todolistId]: [] };
    }
    case "REMOVE-TODOLIST": {
      delete state[action.payload.todolistId];
      return state;
    }

    default:
      return state;
  }
};

// Action creators
export const removeTaskAC = (payload: { taskId: string; todolistId: string; }) => {
  return {
    type: 'REMOVE-TASK',
    payload,
  } as const;
};

export const addTaskAC = (payload: { title: string, todolistId: string; }) => {

  return {
    type: "ADD-TASK",
    payload
  } as const;
};

export const changeTaskStatusAC = (payload: { taskId: string, isDone: boolean, todolistId: string; }) => {
  return {
    type: "CHANGE-TASK-STATUS",
    payload
  } as const;
};

export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string; }) => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload
  } as const;
};


// Actions types
export type removeTaskActionType = ReturnType<typeof removeTaskAC>;

export type addTaskActionType = ReturnType<typeof addTaskAC>;

export type changeTaskStatusType = ReturnType<typeof changeTaskStatusAC>;

export type changeTaskTitleType = ReturnType<typeof changeTaskTitleAC>;

type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusType | changeTaskTitleType | AddTodolistActionType |
  RemoveTodolistActionType;
