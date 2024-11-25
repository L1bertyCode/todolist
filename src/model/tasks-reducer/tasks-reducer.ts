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


// Actions types
export type removeTaskActionType = ReturnType<typeof removeTaskAC>;

export type addTaskActionType = ReturnType<typeof addTaskAC>;

type ActionsType = removeTaskActionType | addTaskActionType;