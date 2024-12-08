import { Checkbox, ListItem } from "@mui/material"

import { ChangeEvent } from "react"

import MuiIconButton from "@mui/material/IconButton"
import MuiDeleteIcon from "@mui/icons-material/Delete"

import { EditableSpan } from "@/common/components/EditableSpan"
import { getListItemSx } from "./TaskItem.style"
import {
  changeTaskStatusAC,
  changeTaskTitleAC,
  removeTaskAC,
  TaskType,
} from "@/fetures/Todolists/model/tasks-reducer/tasks-reducer"
import { TodolistType } from "@/fetures/Todolists/model/todolists-reducer/todolists-reducer"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"

type Props = {
  task: TaskType
  todolist: TodolistType
}

export const TaskItem = ({ task, todolist }: Props) => {
  const dispatch = useAppDispatch()

  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }))
  }

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDone = e.currentTarget.checked
    dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }))
  }

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }))
  }

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan title={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <MuiIconButton onClick={removeTaskHandler}>
        <MuiDeleteIcon />
      </MuiIconButton>
    </ListItem>
  )
}
