import { addTaskAC, TaskType } from "@/model/tasks-reducer/tasks-reducer";
import { TodolistType } from '@/model/todolists-reducer/todolists-reducer';

import s from "./Todolist.module.css";
import { AddItemForm } from "@/fetures/AddItemForm";
import { EditableSpan } from "@/fetures/EditableSpan";

import MuiIconButton from '@mui/material/IconButton';
import MuiDeleteIcon from '@mui/icons-material/Delete';

import { FilterTasksButtons } from "./FilterTasksButtons";
import { TasksList } from "./TasksList";
import { TodolistTitle } from "./TodolistTitle";
import { useDispatch } from "react-redux";


interface TodolistProps {
  todolist: TodolistType;
  updateTodolist: (todolistId: string, title: string) => void;
}
export const Todolist = ({
  todolist,
}: TodolistProps) => {
  const dispatch = useDispatch();

  const addTaskCallback = (title: string) => dispatch(addTaskAC({ title, todolistId: todolist.id }));;

  return (
    <div className={s.todolist}>
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskCallback}
      />
      <TasksList todolist={todolist} />
      <FilterTasksButtons
        todolist={todolist}
      />
    </div>
  );
}; 