import { FilterType, TaskType } from "@/app/App/App";
import { AppButton } from "@/shared/ui/AppButton/AppButton";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./Todolist.module.css";
import cn from "classnames";
import { AppInput } from "@/shared/ui/AppInput/AppInput";
import { AddItemForm } from "@/fetures/AddItemForm";
import { EditableSpan } from "@/fetures/EditableSpan";


interface TodolistProps {
  title: string;
  subTitle?: string;
  description?: string;
  tasks?: TaskType[];
  todolistId: string;
  removeTask: (todolistId: string, taskId: string) => void;
  filter: FilterType;
  changeFilter: (filter: FilterType, todolistId: string) => void;
  addTask: (todolistId: string, task: string) => void;
  changeTaskStatus: (todolistId: string, taskId: string, status: boolean) => void;
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
    <div>
      <div className={s.tl}>
        <h3>
          <EditableSpan
            title={title}
            onChangeTitle={changeTodolistTitle} />
        </h3> <AppButton onClick={() => removeTodolist(todolistId)}>x</AppButton>
      </div>
      <h4>{subTitle}</h4>
      <p>{description}</p>
      <AddItemForm
        addItem={addTaskCallback}
      />
      {tasks ? <ul>{tasks.map(t => {
        const changeTaskTitle = (title: string) => {
          updateTask(todolistId, t.id, title);
        };
        return (
          <li key={t.id}
            className={cn(t.isDone && s["is-done"])}
          >
            <input
              type="checkbox" checked={t.isDone}
              onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(todolistId, t.id, e.currentTarget.checked)}
            />
            <EditableSpan title={t.title}
              onChangeTitle={changeTaskTitle}
            />
            <AppButton onClick={() => removeTask(todolistId, t.id)}>x</AppButton>
          </li>
        );
      })}</ul> : <div>{"Tasks not found"}</div>}
      <div>
        <AppButton className={cn(filter === "all" && s["active-filter"])} onClick={() => changeFilter("all", todolistId)}>All</AppButton>
        <AppButton className={cn(filter === "active" && s["active-filter"])} onClick={() => changeFilter("active", todolistId)}>Active</AppButton>
        <AppButton className={cn(filter === "completed" && s["active-filter"])} onClick={() => changeFilter("completed", todolistId)}>Completed</AppButton>
      </div>
    </div>
  );
};