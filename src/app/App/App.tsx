import { Todolist } from "@/widgets/Todolist/Todolist";
import s from "./App.module.css";
import { useState } from "react";
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type FilterType = "all" | "completed" | "active";
interface AppProps { };
export const App = ({ }: AppProps) => {
  const [filter, setFilter] = useState<FilterType>("all");
  const [tasks, setTasks] = useState([
    { id: "1", title: 'HTML&CSS', isDone: true },
    { id: "2", title: 'JS', isDone: true },
    { id: "3", title: 'ReactJS', isDone: false },
  ]);

  const removeTask = (id: string) => {
    setTasks([...tasks.filter(t => t.id !== id)]);
  };

  const changeFilter = (filter: FilterType) => {
    console.log("filter", filter);

    setFilter(filter);
  };
  let tasksForTodolist = tasks;

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }
  return (
    <div className={s.app}>
      <Todolist
        title="Want to learn" tasks={tasksForTodolist}
        removeTask={removeTask}
        changeFilter={changeFilter}
      />
    </div>
  );
};