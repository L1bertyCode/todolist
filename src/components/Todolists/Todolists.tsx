import { useDispatch, useSelector } from "react-redux"
import { RootState } from "../../App/store/store"

import { Grid } from '@mui/material'
import Paper from '@mui/material/Paper'

import { changeTodolistFilterAC, changeTodolistTitleAC, FilterValuesType, removeTodolistAC, TodolistType } from "../../model/todolists-reducer/todolists-reducer"
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from "../../model/tasks-reducer/tasks-reducer"
import { Todolist } from "../Todolist/Todolist"

const Todolists = () => {
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
  const updateTodolist = (id: string, title: string) => {
    dispatch(changeTodolistTitleAC(id, title))
  }
  return (
    <>{todolists.map(tl => {
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
              todolist={tl}
              tasks={tasksForTodolist}
              removeTask={removeTask}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
              removeTodolist={removeTodolist}
              updateTask={updateTask}
              updateTodolist={updateTodolist}
            />
          </Paper>
        </Grid>
      )
    })}</>
  )
}

export default Todolists