import { TaskType } from "@/model/tasks-reducer/tasks-reducer";
import { TodolistType } from '@/model/todolists-reducer/todolists-reducer';

import s from "./Todolist.module.css";
import { AddItemForm } from "@/fetures/AddItemForm";
import { EditableSpan } from "@/fetures/EditableSpan";

import MuiIconButton from '@mui/material/IconButton';
import MuiDeleteIcon from '@mui/icons-material/Delete';

import { FilterTasksButtons } from "./FilterTasksButtons";
import { TasksList } from "./TasksList";
import { TodolistTitle } from "./TodolistTitle";


interface TodolistProps {
  todolist: TodolistType;

  addTask: (todolistId: string, task: string) => void;
  removeTodolist: (todolistId: string,) => void;
  updateTodolist: (todolistId: string, title: string) => void;
}
export const Todolist = ({
  todolist,

  addTask,
  removeTodolist,
  updateTodolist
}: TodolistProps) => {

  const addTaskCallback = (title: string) => addTask(title, todolist.id);
  const changeTodolistTitle = (title: string) => {
    updateTodolist(title, todolist.id);
  };
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