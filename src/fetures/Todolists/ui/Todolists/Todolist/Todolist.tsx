import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons"
import { TasksList } from "./TasksList/TasksList"
import { TodolistTitle } from "./TodolistTitle/TodolistTitle"

import { AddItemForm } from "@/common/components/AddItemForm"
import { TodolistType } from "@/fetures/Todolists/model/todolists-reducer/todolists-reducer"
import { addTaskAC } from "@/fetures/Todolists/model/tasks-reducer/tasks-reducer"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"

interface TodolistProps {
  todolist: TodolistType
  updateTodolist: (todolistId: string, title: string) => void
}
export const Todolist = ({ todolist }: TodolistProps) => {
  const dispatch = useAppDispatch()

  const addTaskCallback = (title: string) => dispatch(addTaskAC({ title, todolistId: todolist.id }))

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <TasksList todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div>
  )
}
