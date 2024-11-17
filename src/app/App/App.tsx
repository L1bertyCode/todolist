import { Todolist } from "@/widgets/Todolist/Todolist";
import s from "./App.module.css";
import { useState } from "react";
import { v1 } from "uuid";

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
    { id: v1(), title: 'HTML&CSS', isDone: true },
    { id: v1(), title: 'JS', isDone: true },
    { id: v1(), title: 'ReactJS', isDone: false },
  ]);

  const removeTask = (id: string) => {
    setTasks([...tasks.filter(t => t.id !== id)]);
  };

  const changeFilter = (filter: FilterType) => {
    setFilter(filter);
  };
  let tasksForTodolist = tasks;

  if (filter === 'active') {
    tasksForTodolist = tasks.filter(t => !t.isDone);
  }
  if (filter === "completed") {
    tasksForTodolist = tasks.filter(t => t.isDone);
  }

  const addTask = (title: string) => {
    setTasks([...tasks, { id: v1(), title: title, isDone: false }]);
  };
  const changeTaskStatus = (taskId: string, status: boolean) => {
    setTasks([...tasks.map(t => t.id === taskId ? { ...t, isDone: status } : t)]);
  };
  return (
    <div className={s.app}>
      <Todolist
        title="Want to learn" tasks={tasksForTodolist}
        removeTask={removeTask}
        filter={filter}
        changeFilter={changeFilter}
        addTask={addTask}
        changeTaskStatus={changeTaskStatus}
      />
    </div>
  );
};