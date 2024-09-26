import { useState } from 'react'
import './App.css'
import { Todolist } from './Todolist'
import { v1 } from 'uuid'



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

export type FilterValuesType = 'all' | 'active' | 'completed'
function App() {
  let todolistID1 = v1()
  let todolistID2 = v1()

  let [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ])

  let [tasks, setTasks] = useState({
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
    setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, filter: filter } : tl)])
  }

  const addTask = (title: string) => {
    // setTasks([{ id: v1(), title, isDone: false }, ...tasks])
  }

  const changeTaskStatus = (taskId: string, taskStatus: boolean) => {
    // setTasks([...tasks.map(t => t.id !== taskId ? t : { ...t, isDone: taskStatus })])
  }
  return (
    <div className="App">
      {todolists.map(tl => {
        let tasksForTodolist = tasks[tl.id]
        // if (tl.filter === "active") {
        //   tasksForTodolist = tasks.filter(task => !task.isDone)
        // }
        // if (tl.filter === 'completed') {
        //   tasksForTodolist = tasks.filter(task => task.isDone)
        // }
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
          />)
      })}
    </div>
  )
}

export default App