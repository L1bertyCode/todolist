import { Todolist } from "@/widgets/Todolist/Todolist";
import s from "./App.module.css";
import { useState } from "react";
export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
interface AppProps { };
export const App = ({ }: AppProps) => {

  const [tasks, setTasks] = useState([
    { id: "1", title: 'HTML&CSS', isDone: true },
    { id: "2", title: 'JS', isDone: true },
    { id: "3", title: 'ReactJS', isDone: false },
  ]);

  const removeTask = (id: string) => {
    setTasks([...tasks.filter(t => t.id !== id)]);
  };

  let tasksForTodolist = tasks;

  return (
    <div className={s.app}>
      <Todolist
        title="Want to learn" tasks={tasksForTodolist}
        removeTask={removeTask}
      />
    </div>
  );
};