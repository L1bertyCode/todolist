import { TaskType } from "@/model/tasks-reducer/tasks-reducer";
import { FilterValuesType, TodolistType } from '@/model/todolists-reducer/todolists-reducer';
import { ChangeEvent } from "react";
import s from "./Todolist.module.css";
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
import { FilterTasksButtons } from "./FilterTasksButtons";


interface TodolistProps {
  todolist: TodolistType;
  tasks: TaskType[];
  removeTask: (todolistId: string, taskId: string) => void;
  addTask: (todolistId: string, task: string) => void;
  changeTaskStatus: (taskId: string, taskStatus: boolean, todolistId: string) => void;
  
  removeTodolist: (todolistId: string,) => void;
  updateTask: (todolisId: string, taskId: string, title: string) => void;
  updateTodolist: (todolistId: string, title: string) => void;
}
export const Todolist = ({
  todolist,
  tasks,
  removeTask,
  addTask,
  changeTaskStatus, removeTodolist,
  updateTask,
  updateTodolist
}: TodolistProps) => {

  const addTaskCallback = (title: string) => addTask(title, todolist.id);
  const changeTodolistTitle = (title: string) => {
    updateTodolist(title, todolist.id);
  };
  return (
    <div className={s.todolist}>

      <div className={s.title}>
        <h3>
          <EditableSpan
            title={todolist.title}
            onChangeTitle={changeTodolistTitle} />
        </h3>
        <MuiIconButton onClick={() => removeTodolist(todolist.id)}><MuiDeleteIcon /></MuiIconButton>
      </div>
      <AddItemForm
        addItem={addTaskCallback}
      />
      {tasks?.length !== 0 ? <List>{tasks?.map(t => {
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
              onChangeTitle={changeTaskTitle}
            />
            <MuiIconButton onClick={() => removeTask(todolist.id, t.id)}><MuiDeleteIcon /></MuiIconButton>
          </ListItem>
        );
      })}</List> : <div>{"Tasks not found"}</div>}
      <FilterTasksButtons
        todolist={todolist}
      />
    </div>
  );
};