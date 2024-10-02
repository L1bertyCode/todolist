import { useState } from 'react'
import './App.css'

import { v1 } from 'uuid'
import { AddItemForm } from '../components/AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import { MenuButton } from '../components/MenuButton'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import { Todolist } from '../components/Todolist/Todolist'
import { useReducer } from 'react'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from '../model/tasks-reducer/tasks-reducer'
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from '../model/todolists-reducer/todolists-reducer'





type ThemeMode = 'dark' | 'light'
export type TaskType = {
  id: string
  title: string
  isDone: boolean
}
export type TodolistType = {
  id: string
  title: string
  filter: FilterValuesType
}
export type TasksStateType = {
  [key: string]: TaskType[]
}
export type FilterValuesType = 'all' | 'active' | 'completed'


function AppWithReducers() {

  let todolistId1 = v1()
  let todolistId2 = v1()

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistId1, title: 'What to learn', filter: 'all' },
    { id: todolistId2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistId1]: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    [todolistId2]: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  })

  const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087EA4',
      },
    },
  })
  const changeModeHandler = () => {
    setThemeMode(themeMode === 'light' ? 'dark' : 'light')
  }

  const removeTask = (taskId: string, todolistId: string) => {
    dispatchToTasks(removeTaskAC({ taskId, todolistId }))
  }

  const addTask = (title: string, todolistId: string) => {
    dispatchToTasks(addTaskAC({ title, todolistId }))
  }

  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    dispatchToTasks(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }))
  }
  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatchToTasks(changeTaskTitleAC({ taskId, title, todolistId }))
  }

  const removeTodolist = (todolistId: string) => {
    // dispatchToTodolists(removeTodolistAC(todolistId))
    const action = removeTodolistAC(todolistId)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  const addTodolist = (title: string) => {
    // dispatchToTodolists(addTodolistAC(title))
    const action = addTodolistAC(title)
    dispatchToTodolists(action)
    dispatchToTasks(action)
  }

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    dispatchToTodolists(changeTodolistFilterAC(todolistId, filter))
  }

  const updateTodolist = (todolistId: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC(todolistId, title))
  }
  return (
    <ThemeProvider theme={theme}>
      <AppBar position="static" sx={{ mb: '30px' }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <IconButton color="inherit">
            <MenuIcon />
          </IconButton>
          <div>
            <MenuButton>Login</MenuButton>
            <MenuButton>Logout</MenuButton>
            <MenuButton>Faq</MenuButton>
            <Switch color={'default'} onChange={changeModeHandler} />
          </div>
        </Toolbar>
      </AppBar>
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

    </ThemeProvider>
  )
}

export default AppWithReducers