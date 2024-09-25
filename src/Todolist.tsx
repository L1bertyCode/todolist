import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType, TaskType } from "./App"
import { Button } from "./Button"

type PropsType = {
  title: string
  tasks: TaskType[]
  date?: string
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title: string) => void
}
export const Todolist = ({ title, tasks, date, removeTask, changeFilter, addTask }: PropsType) => {
  const [value, setValue] = useState<string>("")
  const addTaskHandler = () => {
    if (value.trim()) {
      addTask(value)
    }
    setValue("")
  }

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter)
  }
  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)} onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            addTaskHandler()
          }
        }} />
        <button onClick={addTaskHandler}>+</button>
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id)
            }
            return (

              <li key={task.id}>
                <input type="checkbox" checked={task.isDone} /> <span>{task.title}</span>
                <Button title={'x'} onClick={() => removeTaskHandler()} />

              </li>
            )
          }

          )}
        </ul>)}
      <div>
        <Button onClick={() => changeFilterTasksHandler("all")} title={'All'} />
        <Button onClick={() => changeFilterTasksHandler("active")} title={'Active'} />
        <Button onClick={() => changeFilterTasksHandler("completed")} title={'Completed'} />
      </div>
      <div>{date}</div>
    </div>
  )
}