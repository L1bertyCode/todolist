import { Checkbox, ListItem } from "@mui/material";
import { getListItemSx } from "../../Todolist.styles";
import { ChangeEvent } from "react";

import MuiIconButton from '@mui/material/IconButton';
import MuiDeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, TaskType } from "@/model/tasks-reducer/tasks-reducer";
import { TodolistType } from "@/model/todolists-reducer/todolists-reducer";
import { EditableSpan } from "@/common/components/EditableSpan";


type Props = {
  task: TaskType;
  todolist: TodolistType;
};

export const TaskItem = ({ task, todolist }: Props) => {
  const dispatch = useDispatch();

  const removeTaskHandler = () => {
    dispatch(removeTaskAC({ taskId: task.id, todolistId: todolist.id }));

  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>) => {
    const isDone = e.currentTarget.checked;
    dispatch(changeTaskStatusAC({ taskId: task.id, isDone, todolistId: todolist.id }));
  };

  const changeTaskTitleHandler = (title: string) => {
    dispatch(changeTaskTitleAC({ taskId: task.id, title, todolistId: todolist.id }));
  };

  return (
    <ListItem key={task.id} sx={getListItemSx(task.isDone)}>
      <div>
        <Checkbox checked={task.isDone} onChange={changeTaskStatusHandler} />
        <EditableSpan title={task.title} onChange={changeTaskTitleHandler} />
      </div>
      <MuiIconButton onClick={removeTaskHandler}>
        <MuiDeleteIcon />
      </MuiIconButton>
    </ListItem>
  );
};