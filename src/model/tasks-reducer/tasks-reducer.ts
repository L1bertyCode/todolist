import { v1 } from "uuid"
import { TasksStateType } from "../../components/App/App"

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(tl => tl.id !== action.payload.taskId) }
    }
    case 'ADD-TASK': {
      return { ...state, [action.payload.todolistId]: [{ id: v1(), title: action.payload.title, isDone: false }, ...state[action.payload.todolistId]] }
    }

    case "CHANGE-TASK-STATUS": {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].map(tl => tl.id === action.payload.taskId ? { ...tl, isDone: action.payload.isDone } : tl)] }
    }
    case "CHANGE-TASK-TITLE": {
      return { ...state, [action.payload.todolistId]: [...state[action.payload.todolistId].map(tl => tl.id === action.payload.taskId ? { ...tl, title: action.payload.title } : tl)] }
    }
    default:
      throw new Error("I don't understand this type")
  }
}

export const removeTaskAC = (payload: { taskId: string; todolistId: string }): RemoveTaskActionType => {
  return {
    type: 'REMOVE-TASK',
    payload: payload,
  } as const
}
export const addTaskAC = (payload: { title: string, todolistId: string }): AddTaskActionType => {
  return {
    type: 'ADD-TASK',
    payload: payload,
  } as const
}
export const changeTaskStatusAC = (payload: {
  taskId: string,
  isDone: boolean,
  todolistId: string
}): ChangeTaskStatusActionType => {
  return {
    type: 'CHANGE-TASK-STATUS',
    payload: payload
  }
}
export const changeTaskTitleAC = (payload: { taskId: string, title: string, todolistId: string }): ChangeTaskTitleActionType => {
  return {
    type: "CHANGE-TASK-TITLE",
    payload: payload
  }
}
export type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  payload: {
    taskId: string,
    todolistId: string
  }
}
export type AddTaskActionType = {
  type: 'ADD-TASK'
  payload: {
    title: string,
    todolistId: string
  }
}
type ChangeTaskStatusActionType = {
  type: 'CHANGE-TASK-STATUS'
  payload: {
    taskId: string,
    isDone: boolean,
    todolistId: string
  }
}

type ChangeTaskTitleActionType = {
  type: "CHANGE-TASK-TITLE"
  payload: {
    taskId: string,
    title: string,
    todolistId: string
  }
}
type ActionsType = RemoveTaskActionType
  | AddTaskActionType | ChangeTaskStatusActionType | ChangeTaskTitleActionType