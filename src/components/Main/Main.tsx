import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../App/store/store"

import { Todolist } from "../Todolist/Todolist"
import { TasksStateType } from '../../model/tasks-reducer/tasks-reducer'
import { TodolistType } from '../../model/todolists-reducer/todolists-reducer'
import { FilterValuesType } from "../../model/todolists-reducer/todolists-reducer"

import Container from '@mui/material/Container'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper'

import { AddItemForm } from "../AddItemForm"


import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "../../model/tasks-reducer/tasks-reducer"
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "../../model/todolists-reducer/todolists-reducer"

const Main = () => {
  const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

  const dispatch = useDispatch()

  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({ taskId, todolistId }))
  }

  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC({ title, todolistId }))
  }

  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }))
  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ taskId, title, todolistId }))
  }

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId)
    dispatch(action)
  }

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }

  const changeFilter = (id: string, filter: FilterValuesType) => {
    dispatch(changeTodolistFilterAC(id, filter))
  }

  const updateTodolist = (id: string, title: string) => {
    dispatch(changeTodolistTitleAC(id, title))
  }

  return (
    <Container fixed>
      <Grid container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={4} sx={{
        display: 'flex'
      }}>

        {todolists.map(tl => {
          let tasksForTodolist = tasks[tl.id]
          if (tl.filter === "active") {
            tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
          }
          if (tl.filter === "completed") {
            tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
          }
          return (
            <Grid
              key={tl.id}
              sx={{
                mt: "20px",
                mr: "20px"

              }}
            >
              <Paper sx={{ p: '0px 20px 20px 20px' }}>
                <Todolist
                  key={tl.id}
                  todolistId={tl.id}
                  title={tl.title}
                  tasks={tasksForTodolist}
                  removeTask={removeTask}
                  filter={tl.filter}
                  changeFilter={changeFilter}
                  addTask={addTask}
                  changeTaskStatus={changeTaskStatus}
                  removeTodolist={removeTodolist}
                  updateTask={updateTask}
                  updateTodolist={updateTodolist}
                />
              </Paper>
            </Grid>
          )
        })}
      </Grid>
    </Container >

  )
}

export default Main