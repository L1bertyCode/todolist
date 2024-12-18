import MuiIconButton from "@mui/material/IconButton"
import MuiDeleteIcon from "@mui/icons-material/Delete"

import s from "../../Todolists.module.css"
import { EditableSpan } from "@/common/components/EditableSpan"
import {
  changeTodolistTitleAC,
  removeTodolistAC,
  TodolistType,
} from "@/fetures/Todolists/model/todolists-reducer/todolists-reducer"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
type Props = {
  todolist: TodolistType
}

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id } = todolist

  const dispatch = useAppDispatch()

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id))
  }

  const updateTodolistHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({ todolistId: id, title }))
  }

  return (
    <div className={`todolist-title-container ${s.title}`}>
      <h3>
        <EditableSpan title={title} onChange={updateTodolistHandler} />
      </h3>
      <MuiIconButton onClick={removeTodolistHandler}>
        <MuiDeleteIcon />
      </MuiIconButton>
    </div>
  )
}
