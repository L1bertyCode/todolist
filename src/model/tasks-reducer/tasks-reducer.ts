import { TasksStateType } from '@/app/App/App';

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].filter(t => t.id !== action.payload.taskId)] };
    }

    default:
      throw new Error("I don't understand this type");
  }
};

// Action creators
export const removeTaskAC = (taskId: string, todolistId: string) => {
  return { type: 'REMOVE-TASK', payload: { taskId, todolistId } } as const;
};

// Actions types
export type removeTaskActionType = ReturnType<typeof removeTaskAC>;

type ActionsType = removeTaskActionType;