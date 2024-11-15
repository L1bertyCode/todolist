import { TaskType } from "@/app/App/App";
import { AppButton } from "@/app/shared/ui/AppButton/AppButton";

interface TodolistProps {
  title: string;
  subTitle?: string;
  description?: string;
  tasks?: TaskType[];
  removeTask: (id: string) => void;
}
export const Todolist = ({
  title,
  subTitle,
  description,
  tasks,
  removeTask
}: TodolistProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <h4>{subTitle}</h4>
      <p>{description}</p>
      <div>
        <input />
        <button>+</button>
      </div>
      {tasks ? <ul>{tasks.map(t => <li key={t.id}>
        <input type="checkbox" checked={t.isDone} />
        <span>{t.title}</span>
        <AppButton onClick={() => removeTask(t.id)}>x</AppButton>
      </li>)}</ul> : <div>{"Tasks not found"}</div>}
      <div>
        <AppButton>All</AppButton>
        <AppButton>Active</AppButton>
        <AppButton>Completed</AppButton>
      </div>
    </div>
  );
};