import { TasksStateType } from "../../components/App/App"

export const tasksReducer = (state: TasksStateType, action: ActionsType): TasksStateType => {
  switch (action.type) {
    case 'REMOVE-TASK': {
      return { ...state, [action.payload.todolistId]: state[action.payload.todolistId].filter(tl => tl.id !== action.payload.taskId) }
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
// export const addTaskAC = (title: string): AddTaskActionType => {
//   return {
//     type: 'ADD-TASK',
//     payload: {
//       title,
//     },
//   } as const
// }
type RemoveTaskActionType = {
  type: 'REMOVE-TASK'
  payload: {
    taskId: string,
    todolistId: string
  }
}
// type AddTaskActionType = {
//   type: 'ADD-TASK'
//   payload: {
//     title: string
//   }
// }

type ActionsType = RemoveTaskActionType
// | AddTaskActionType