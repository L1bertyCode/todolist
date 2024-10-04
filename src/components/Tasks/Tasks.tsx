import { ChangeEvent } from "react";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType } from "../../model/tasks-reducer/tasks-reducer";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Checkbox from "@mui/material/Checkbox";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { TodolistType } from "../../model/todolists-reducer/todolists-reducer";
import { EditableSpan } from "../EditableSpan";
import { getListItemSx } from "../Todolist/Todolist.styles";
import { RootState } from "../../App/store/store";
type TasksProps = {
  todolist: TodolistType;
};

const Tasks = ({ todolist }: TasksProps) => {
  const { id: todolistId } = todolist;
  const tasks = useSelector<RootState, TasksStateType>(state => state.tasks);
  const dispatch = useDispatch();


  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({ taskId, todolistId }));
  };
  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }));
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ taskId, title, todolistId }));
  };
  let tasksForTodolist = tasks[todolist.id];
  if (todolist.filter === "active") {
    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
  }
  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map(task => {
            const removeTaskHandler = () => {
              removeTask(task.id, todolistId);
            };

            const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
              const neStatusValue = e.currentTarget.checked;
              changeTaskStatus(task.id, neStatusValue, todolistId);
            };
            const changeTaskTitleHandler = (title: string) => {
              updateTask(todolistId, task.id, title);
            };
            return (
              <ListItem
                key={task.id}
                className={task.isDone ? 'is-done' : ''}
                sx={getListItemSx(task.isDone)}
              >
                <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
                <EditableSpan onChange={changeTaskTitleHandler} value={task.title} />
                <IconButton onClick={removeTaskHandler}>
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            );
          }

          )}
        </List>)
      }
    </>
  );
};

export default Tasks;