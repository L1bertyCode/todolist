import { FilterValuesType, TodolistType } from '../../App/App'
import { v1 } from 'uuid'

let todolistID1 = v1()
let todolistID2 = v1()

const initialState: TodolistType[] = [

]

export const todolistsReducer = (state: TodolistType[] = initialState, action: ActionsType): TodolistType[] => {
  switch (action.type) {
    case 'REMOVE-TODOLIST': {
      return state.filter(tl => tl.id !== action.payload.todolistId)
    }
    case 'ADD-TODOLIST': {
      return [...state, { id: action.payload.todolistId, title: action.payload.title, filter: "all" }]
    }
    case 'CHANGE-TODOLIST-TITLE': {
      return [...state.map(tl => tl.id === action.payload.todolistId ? { ...tl, title: action.payload.title } : tl)]
    }
    case 'CHANGE-TODOLIST-FILTER': {
      return [...state.map(tl => tl.id === action.payload.todolistId ? { ...tl, filter: action.payload.filter } : tl)]
    }
    default:
      return state
  }
}
// Action creators
export const removeTodolistAC = (todolistId: string) => {
  return {
    type: 'REMOVE-TODOLIST',
    payload: { todolistId }
  } as const
}

export const addTodolistAC = (title: string) => {
  return { type: 'ADD-TODOLIST', payload: { title, todolistId: v1() } } as const
}

export const changeTodolistTitleAC = (todolistId: string, title: string) => {
  return { type: 'CHANGE-TODOLIST-TITLE', payload: { todolistId, title } } as const
}

export const changeTodolistFilterAC = (todolistId: string, filter: FilterValuesType) => {
  return { type: 'CHANGE-TODOLIST-FILTER', payload: { todolistId, filter } } as const
}

// Actions types
export type RemoveTodolistActionType = ReturnType<typeof removeTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>

type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistTitleActionType
  | ChangeTodolistFilterActionType