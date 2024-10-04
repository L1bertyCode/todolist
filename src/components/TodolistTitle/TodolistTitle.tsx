import { EditableSpan } from "../EditableSpan"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'

type TodolistTitleProps = {
  title: string
  todolistId: string
  updateTodolist: (todolistId: string, title: string) => void
  removeTodolist: (todolistId: string) => void
}

export const TodolistTitle = ({ updateTodolist, removeTodolist, title, todolistId }: TodolistTitleProps) => {
  const changeTaskTitleHandler = (title: string) => {
    updateTodolist(todolistId, title)
  }
  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }
  return (
    <h3>
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan onChange={changeTaskTitleHandler} value={title} />
        </h3>
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>

      </div>
    </h3>
  )
}