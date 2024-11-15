import { TaskType } from "@/app/App/App";
import { AppButton } from "@/app/shared/ui/AppButton/AppButton";

interface TodolistProps {
  title: string;
  subTitle?: string;
  description?: string;
  tasks?: TaskType[];
}
export const Todolist = ({ title, subTitle, description, tasks }: TodolistProps) => {
  return (
    <div>
      <h3>{title}</h3>
      <h4>{subTitle}</h4>
      <p>{description}</p>

      <div>
        <input />
        <button>+</button>
      </div>
      {tasks ? <ul>{tasks.map(t => <li key={t.id}>{t.title}</li>)}</ul> : <div>{"Tasks not found"}</div>}
      <div>
        <AppButton>All</AppButton>
        <AppButton>Active</AppButton>
        <AppButton>Completed</AppButton>
      </div>
    </div>
  );
};