import { useState } from 'react'
import './App.css'

import { v1 } from 'uuid'
import { AddItemForm } from '../AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import { MenuButton } from '../MenuButton'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import { Todolist } from '../Todolist/Todolist'
import { useReducer } from 'react'
import { tasksReducer } from '../../model/tasks-reducer/tasks-reducer'
import { todolistsReducer } from '../../model/todolists-reducer/todolists-reducer'





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

  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])


  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
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
    setThemeMode(themeMode == 'light' ? 'dark' : 'light')
  }

  // let [tasks, dispatch] = useState<TasksStateType>({
  //   [todolistID1]: [
  //     { id: v1(), title: 'HTML&CSS', isDone: true },
  //     { id: v1(), title: 'JS', isDone: true },
  //     { id: v1(), title: 'ReactJS', isDone: false },
  //   ],
  //   [todolistID2]: [
  //     { id: v1(), title: 'Rest API', isDone: true },
  //     { id: v1(), title: 'GraphQL', isDone: false },
  //   ],
  // })
  // const removeTask = (taskId: string, todolistId: string) => {
  //   const payload = { taskId: taskId, todolistId: todolistId }
  //   dispatch(removeTaskAC(payload))
  // }
  // const addTask = (title: string, todolistId: string) => {
  //   const payload = { title: title, todolistId: todolistId }
  //   dispatch(addTaskAC(payload))
  // }

  const addTask = (title: string, todolistId: string) => {

    // setTasks({ ...tasks, [todolistId]: [{ id: v1(), title, isDone: false }, ...tasks[todolistId]] })
  }
  const removeTask = (taskId: string, todolistId: string) => {
    // const filteredTasks = tasks[todolistId].filter(task => {
    //   return task.id !== taskId
    // })
    // setTasks({ ...tasks, [todolistId]: filteredTasks })
  }

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    // setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl)])
  }


  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    // dispatch({
    //   ...tasks,
    //   [todolistId]: [...tasks[todolistId].map(t => t.id !== taskId ? t : { ...t, isDone: taskStatus })]
    // })
  }

  const removeTodolist = (todolistId: string) => {
    // setTodolists([...todolists.filter(tl => tl.id !== todolistId)])
    // delete tasks[todolistId]
    // dispatch({ ...tasks })
  }

  const addTodolist = (title: string) => {
    // const newId = v1()
    // setTodolists([{ id: newId, title, filter: "all" }, ...todolists])
    // dispatch({ [newId]: [], ...tasks })
  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    // dispatch({
    //   ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId ? { ...t, title: title } : t)]
    // })
  }

  const updateTodolist = (todolistId: string, title: string) => {
    // setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, title: title } : tl)])
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
            // let tasksForTodolist = tasks[tl.id]
            // if (tl.filter === "active") {
            //   tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
            // }
            // if (tl.filter === "completed") {
            //   tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
            // }
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
                    tasks={tasks["todolistId1"]}
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