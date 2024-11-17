import { FilterType, TaskType } from "@/app/App/App";
import { AppButton } from "@/app/shared/ui/AppButton/AppButton";
import { ChangeEvent, KeyboardEvent, useState } from "react";
import s from "./Todolist.module.css";
import cn from "classnames";


interface TodolistProps {
  title: string;
  subTitle?: string;
  description?: string;
  tasks?: TaskType[];
  todolistId: string;
  removeTask: (todolistId: string, taskId: string) => void;
  filter: FilterType;
  changeFilter: (filter: FilterType) => void;
  addTask: (task: string) => void;
  changeTaskStatus: (taskId: string, status: boolean) => void;
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
  changeTaskStatus
}: TodolistProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState("");

  const addTaskHandler = () => {
    if (value) {
      setError("");
      addTask(value);
      setValue("");
    } else {
      setError("Field is requred");
    }

  };
  return (
    <div>
      <h3>{title}</h3>
      <h4>{subTitle}</h4>
      <p>{description}</p>
      <div>
        <input
          className={cn(error && s.error)}
          value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            setError("");
            if (e.key === "Enter") {
              addTaskHandler();
            }
          }}
        />
        <AppButton onClick={addTaskHandler}>+</AppButton>
        {error && <div className={s["error-message"]}>{error}</div>}
      </div>
      {tasks ? <ul>{tasks.map(t => <li key={t.id}
        className={cn(t.isDone && s["is-done"])}
      >
        <input
          type="checkbox" checked={t.isDone}
          onChange={(e: ChangeEvent<HTMLInputElement>) => changeTaskStatus(t.id, e.currentTarget.checked)}
        />
        <span>{t.title}</span>
        <AppButton onClick={() => removeTask(todolistId, t.id)}>x</AppButton>
      </li>)}</ul> : <div>{"Tasks not found"}</div>}
      <div>
        <AppButton className={cn(filter === "all" && s["active-filter"])} onClick={() => changeFilter("all")}>All</AppButton>
        <AppButton className={cn(filter === "active" && s["active-filter"])} onClick={() => changeFilter("active")}>Active</AppButton>
        <AppButton className={cn(filter === "completed" && s["active-filter"])} onClick={() => changeFilter("completed")}>Completed</AppButton>
      </div>
    </div>
  );
};