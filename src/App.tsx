import { useState } from 'react'
import './App.css'
import { Todolist } from './Todolist'
import { v1 } from 'uuid'
import { AddItemForm } from './AddItemForm'



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
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, setTasks] = useState<TasksStateType>({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  })

  const removeTask = (taskId: string, todolistId: string) => {
    const filteredTasks = tasks[todolistId].filter(task => {
      return task.id !== taskId
    })
    setTasks({ ...tasks, [todolistId]: filteredTasks })
  }

  const changeFilter = (todolistId: string, filter: FilterValuesType) => {
    setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl)])
  }

  const addTask = (title: string, todolistId: string) => {
    setTasks({ ...tasks, [todolistId]: [{ id: v1(), title, isDone: false }, ...tasks[todolistId]] })
  }

  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    setTasks({
      ...tasks,
      [todolistId]: [...tasks[todolistId].map(t => t.id !== taskId ? t : { ...t, isDone: taskStatus })]
    })
  }

  const removeTodolist = (todolistId: string) => {
    setTodolists([...todolists.filter(tl => tl.id !== todolistId)])
    delete tasks[todolistId]
    setTasks({ ...tasks })
  }

  const addTodolist = (title: string) => {
    const newId = v1()
    setTodolists([{ id: newId, title, filter: "all" }, ...todolists])
    setTasks({ [newId]: [], ...tasks })
  }

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId ? { ...t, title: title } : t)]
    })
  }

  const updateTodolist = (todolistId: string, title: string) => {
    setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, title: title } : tl)])
  }
  return (
    <div className="App">
      <AddItemForm addItem={addTodolist} />
      {todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        if (tl.filter === "active") {
          tasksForTodolist = tasks[tl.id].filter(t => !t.isDone)
        }
        if (tl.filter === "completed") {
          tasksForTodolist = tasks[tl.id].filter(t => t.isDone)
        }
        return (
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
          />)
      })}
    </div>
  )
}

export default App