import { ChangeEvent } from "react"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from "@mui/material/Checkbox"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import { TaskType } from '../../model/tasks-reducer/tasks-reducer'
import { FilterValuesType, TodolistType } from "../../model/todolists-reducer/todolists-reducer"
import { EditableSpan } from "../EditableSpan"
import { AddItemForm } from "../AddItemForm"
import { getListItemSx } from "./Todolist.styles"
import { TodolistTitle } from "../TodolistTitle/TodolistTitle"
import FilterTasksButtons from "../FilterTasksButtons/FilterTasksButtons"


type TodolistProps = {
  todolist: TodolistType

  tasks: TaskType[]
  removeTask: (taskId: string, todolistId: string) => void
  addTask: (title: string, todolistId: string,) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  updateTask: (todolistId: string, taskId: string, title: string) => void
  updateTodolist: (todolistId: string, title: string) => void
}
export const Todolist = ({ todolist, tasks = [], removeTask, addTask, changeTaskStatus, removeTodolist, updateTask, updateTodolist }: TodolistProps
) => {
  const { id: todolistId, title, filter } = todolist
  const addTaskCallback = (title: string) => {
    addTask(title, todolistId)

  }
  return (
    <div>
      <TodolistTitle
        updateTodolist={updateTodolist}
        removeTodolist={removeTodolist}
        todolistId={todolistId}
        title={title}
      />
      <AddItemForm addItem={addTaskCallback} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasks.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolistId)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const neStatusValue = e.currentTarget.checked
              changeTaskStatus(task.id, neStatusValue, todolistId)
            }
            const changeTaskTitleHandler = (title: string) => {
              updateTask(todolistId, task.id, title)
            }
            return (
              <ListItem
                key={task.id}
                className={task.isDone ? 'is-done' : ''}
                sx={getListItemSx(task.isDone)}
              >
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan onChange={changeTaskTitleHandler} value={task.title} />
                <IconButton onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            )
          }

          )}
        </List>)
      }
      <FilterTasksButtons
        todolist={todolist}
      />
    </div >
  )
}