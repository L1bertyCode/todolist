import { FilterValuesType, TaskType } from "@/app/App/App";
import { AppButton } from "@/shared/ui/AppButton/AppButton";
import { ChangeEvent } from "react";
import s from "./Todolist.module.css";
import cn from "classnames";
import { AddItemForm } from "@/fetures/AddItemForm";
import { EditableSpan } from "@/fetures/EditableSpan";
import MuiButton from '@mui/material/Button';
import MuiIconButton from '@mui/material/IconButton';
import MuiDeleteIcon from '@mui/icons-material/Delete';
import Checkbox from "@mui/material/Checkbox";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import Box from '@mui/material/Box';
import { filterButtonsContainerSx, getListItemSx } from "./Todolist.styles";


interface TodolistProps {
  title: string;
  subTitle?: string;
  description?: string;
  tasks?: TaskType[];
  todolistId: string;
  removeTask: (todolistId: string, taskId: string) => void;
  filter: FilterValuesType;
  changeFilter: (filter: FilterValuesType, todolistId: string) => void;
  addTask: (todolistId: string, task: string) => void;
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
  removeTodolist: (todolistId: string,) => void;
  updateTask: (todolisId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
}
export const Todolist = ({
  title,
  subTitle,
  description,
  tasks,
  todolistId,
  removeTask,
  filter,
  changeFilter,
  addTask,
  changeTaskStatus, removeTodolist,
  updateTask,
  updateTodolist
}: TodolistProps) => {

  const addTaskCallback = (item: string) => addTask(todolistId, item);
  const changeTodolistTitle = (title: string) => {
    updateTodolist(todolistId, title);
  };
  return (
    <div className={s.todolist}>

      <div className={s.title}>
        <h3>
          <EditableSpan
            title={title}
            onChangeTitle={changeTodolistTitle} />
        </h3> <MuiIconButton onClick={() => removeTodolist(todolistId)}><MuiDeleteIcon /></MuiIconButton>
      </div>
      <h4>{subTitle}</h4>
      <p>{description}</p>
      <AddItemForm
        addItem={addTaskCallback}
      />
      {tasks ? <List>{tasks.map(t => {
        const changeTaskTitle = (title: string) => {
          updateTask(todolistId, t.id, title);
        };
        return (
          <ListItem key={t.id}
            sx={getListItemSx(t.isDone)}
          >
            <Checkbox
              checked={t.isDone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked, todolistId)} />
            {/* <input
              type="checkbox" checked={t.isDone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, t.id, e.currentTarget.checked)}
            /> */}
            <EditableSpan title={t.title}
              onChangeTitle={changeTaskTitle}
            />
            <MuiIconButton onClick={() => removeTask(todolistId, t.id)}><MuiDeleteIcon /></MuiIconButton>
          </ListItem>
        );
      })}</List> : <div>{"Tasks not found"}</div>}
      <Box sx={filterButtonsContainerSx}>
        <MuiButton
          variant={filter === 'all' ? 'outlined' : 'text'}
          color={"inherit"}
          onClick={() => changeFilter("all", todolistId)}>All</MuiButton>
        <MuiButton
          variant={filter === 'active' ? 'outlined' : 'text'}
          color={"primary"}
          onClick={() => changeFilter("active", todolistId)}>Active</MuiButton>
        <MuiButton
          variant={filter === 'completed' ? 'outlined' : 'text'}
          color={'secondary'}
          onClick={() => changeFilter("completed", todolistId)}>Completed</MuiButton>
      </Box>
    </div>
  );
};