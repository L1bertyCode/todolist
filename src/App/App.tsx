import './App.css'

import { AddItemForm } from '../components/AddItemForm'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import Container from '@mui/material/Container'
import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper'
import { MenuButton } from '../components/MenuButton'
import { ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch'
import { Todolist } from '../components/Todolist/Todolist'
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from '../model/tasks-reducer/tasks-reducer'
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from '../model/todolists-reducer/todolists-reducer'
import { useDispatch, useSelector } from 'react-redux'
import { RootState } from './store/store'
import { getTheme } from './theme'
import { changeThemeAC, ThemeMode } from '../model/app-reducer/app-reducer'





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




function App() {
  const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists)
  const tasks = useSelector<RootState, TasksStateType>(state => state.tasks)

  const themeMode = useSelector<RootState, ThemeMode>(state => state.app.themeMode)
  const theme = getTheme(themeMode)
  const dispatch = useDispatch()
  // const [themeMode, setThemeMode] = useState<ThemeMode>('light')
  // const theme = createTheme({
  //   palette: {
  //     mode: themeMode === 'light' ? 'light' : 'dark',
  //     primary: {
  //       main: '#087EA4',
  //     },
  //   },
  // })
  const changeModeHandler = () => {
    dispatch(changeThemeAC(themeMode === 'light' ? 'dark' : 'light'))
  }

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

export default App