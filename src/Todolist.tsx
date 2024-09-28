import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType, TaskType } from "./App"
import Button from '@mui/material/Button'
import { AddItemForm } from "./AddItemForm"
import { EditableSpan } from "./EditableSpan"
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from "@mui/material/Checkbox"
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import Box from "@mui/material/Box"

type PropsType = {
  todolistId: string
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  removeTask: (taskId: string, todolistId: string) => void
  changeFilter: (todolistId: string, filter: FilterValuesType) => void
  addTask: (title: string, todolistId: string,) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void
  removeTodolist: (todolistId: string) => void
  updateTask: (todolistId: string, taskId: string, title: string) => void
  updateTodolist: (todolistId: string, title: string) => void
}
export const Todolist = ({ todolistId, title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist, updateTask, updateTodolist }: PropsType
) => {

  const addTaskCallback = (title: string) => {
    addTask(title, todolistId)

  }

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(todolistId, filter)
  }

  const removeTodolistHandler = () => {
    removeTodolist(todolistId)
  }

  const changeTaskTitleHandler = (title: string) => {
    updateTodolist(todolistId, title)
  }
  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan onChange={changeTaskTitleHandler} value={title} />
        </h3>
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>


      </div>
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
                sx={{
                  p: 0,
                  justifyContent: 'space-between',
                  opacity: task.isDone ? 0.5 : 1,
                }}
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
        </List>)}
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button
          variant={filter === 'all' ? 'outlined' : 'text'}
          color={'inherit'}
          onClick={() => changeFilterTasksHandler('all')}
        >
          All
        </Button>
        <Button
          variant={filter === 'active' ? 'outlined' : 'text'}
          color={'primary'}
          onClick={() => changeFilterTasksHandler('active')}
        >
          Active
        </Button>
        <Button
          variant={filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={() => changeFilterTasksHandler('completed')}
        >
          Completed
        </Button>
      </Box>
    </div>
  )
}