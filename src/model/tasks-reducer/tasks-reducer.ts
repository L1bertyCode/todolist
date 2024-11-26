import { TasksStateType } from '@/app/App/App';
import { v1 } from 'uuid';

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)] };
    }
    case "ADD-TASK": {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId], { id: v1(), title: action.payload.title, isDone: false }] };
    }
    case "CHANGE-TASK-STATUS": {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, isDone: action.payload.isDone } : t) };
    }

    case "CHANGE-TASK-TITLE": {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].map(t => t.id === action.payload.taskId ? { ...t, title: action.payload.title } : t) };
    }

    default:
      throw new Error("I don't understand this type");
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

type ActionsType = removeTaskActionType | addTaskActionType | changeTaskStatusType | changeTaskTitleType;