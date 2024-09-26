import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType, TaskType } from "./App"
import { Button } from "./Button"

type PropsType = {
  title: string
  tasks: TaskType[]
  filter: FilterValuesType
  removeTask: (taskId: string) => void
  changeFilter: (filter: FilterValuesType) => void
  addTask: (title: string) => void
  changeTaskStatus: (taskId: string, taskStatus: boolean) => void
}
export const Todolist = ({ title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus }: PropsType
) => {
  const [value, setValue] = useState<string>("")
  const [error, setError] = useState<string | null>(null)

  const addTaskHandler = () => {
    if (value.trim()) {
      addTask(value)
      setValue("")
    } else {
      setError("Title is required")
    }
  }

  const changeFilterTasksHandler = (filter: FilterValuesType) => {
    changeFilter(filter)
  }

  return (
    <div>
      <h3>{title}</h3>
      <div>
        <input
          className={error ? "error" : ""}
          value={value}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            setError(null)
            if (e.key === "Enter") {
              addTaskHandler()
            }
          }}
        />
        <button onClick={addTaskHandler}>+</button>
        {error && <div className={"error-message"}>{error}</div>}
      </div>
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const neStatusValue = e.currentTarget.checked
              changeTaskStatus(task.id, neStatusValue)
            }
            return (

              <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                <input
                  type="checkbox"
                  checked={task.isDone}
                  onChange={changeTaskStatusHandler}
                />
                <span>{task.title}</span>
                <Button title={'x'} onClick={() => removeTaskHandler()} />

              </li>
            )
          }

          )}
        </ul>)}
      <div>
        <Button
          className={filter === 'all' ? 'active-filter' : ''}
          title={'All'}
          onClick={() => changeFilterTasksHandler('all')}
        />
        <Button
          className={filter === 'active' ? 'active-filter' : ''}
          title={'Active'}
          onClick={() => changeFilterTasksHandler('active')}
        />
        <Button
          className={filter === 'completed' ? 'active-filter' : ''}
          title={'Completed'}
          onClick={() => changeFilterTasksHandler('completed')}
        />
      </div>
    </div>
  )
}