import { FilterType, TaskType } from "@/app/App/App";
import { AppButton } from "@/app/shared/ui/AppButton/AppButton";
import { ChangeEvent, KeyboardEvent, useState } from "react";

interface TodolistProps {
  title: string;
  subTitle?: string;
  description?: string;
  tasks?: TaskType[];
  removeTask: (id: string) => void;
  changeFilter: (filter: FilterType) => void;
  addTask: (task: string) => void;
}
export const Todolist = ({
  title,
  subTitle,
  description,
  tasks,
  removeTask,
  changeFilter,
  addTask
}: TodolistProps) => {
  const [value, setValue] = useState<string>("");
  const [error, setError] = useState("");
  const addTaskHandler = () => {
    if (value) {
      setError("");
      addTask(value);
      setValue("");
    }
    setError("Field is requred");
  };

  return (
    <div>
      <h3>{title}</h3>
      <h4>{subTitle}</h4>
      <p>{description}</p>
      <div>
        <input
          value={value} onChange={(e: ChangeEvent<HTMLInputElement>) => setValue(e.currentTarget.value)}
          onKeyUp={(e: KeyboardEvent<HTMLInputElement>) => {
            if (e.key === "Enter") {
              addTaskHandler();
            }
          }}
        />
        <AppButton onClick={addTaskHandler}>+</AppButton>
      </div>
      {tasks ? <ul>{tasks.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <AppButton onClick={() => removeTask(t.id)}>x</AppButton>
      </li>)}</ul> : <div>{"Tasks not found"}</div>}
      <div>
        <AppButton onClick={() => changeFilter("all")}>All</AppButton>
        <AppButton onClick={() => changeFilter("active")}>Active</AppButton>
        <AppButton onClick={() => changeFilter("completed")}>Completed</AppButton>
      </div>
    </div>
  );
};