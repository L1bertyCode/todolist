import { EditableSpan } from "@/fetures/EditableSpan";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TasksStateType, TaskType } from "@/model/tasks-reducer/tasks-reducer";
import { Checkbox, List, ListItem } from "@mui/material";
import { ChangeEvent } from "react";
import MuiIconButton from '@mui/material/IconButton';
import MuiDeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from "react-redux";
import { getListItemSx } from "./Todolist.styles";
import { RootState } from "@/app/providers/reduxProvider/store";
import { TodolistType } from "@/model/todolists-reducer/todolists-reducer";
interface TasksListProps {
  todolist: TodolistType;
};
export const TasksList = ({ todolist }: TasksListProps) => {
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
  if (todolist.filter === 'active') {
    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
  }

  return (
    < >
      {tasksForTodolist?.length !== 0 ? <List>{tasksForTodolist?.map(t => {
        const changeTaskTitle = (title: string) => {
          updateTask(todolist.id, t.id, title);
        };
        return (
          <ListItem key={t.id}
            sx={getListItemSx(t.isDone)}
          >
            <Checkbox
              checked={t.isDone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked, todolist.id)} />
            <EditableSpan title={t.title}
              onChange={changeTaskTitle}
            />
            <MuiIconButton onClick={() => removeTask(todolist.id, t.id)}><MuiDeleteIcon /></MuiIconButton>
          </ListItem>
        );
      })}</List> : <div>{"Tasks not found"}</div>}
    </>
  );
};