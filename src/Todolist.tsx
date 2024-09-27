import { ChangeEvent, KeyboardEvent, useState } from "react"
import { FilterValuesType, TaskType } from "./App"
import { Button } from "./Button"
import { AddItemForm } from "./AddItemForm"

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
}
export const Todolist = ({ todolistId, title, tasks, filter, removeTask, changeFilter, addTask, changeTaskStatus, removeTodolist }: PropsType
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

  return (
    <div>
      <div className={'todolist-title-container'}>
        <h3>{title}</h3>
        <Button title={'x'} onClick={removeTodolistHandler} />

      </div>
      <AddItemForm addItem={addTaskCallback} />
      {tasks.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <ul>
          {tasks.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolistId)
            }

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const neStatusValue = e.currentTarget.checked
              changeTaskStatus(task.id, neStatusValue, todolistId)
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