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

type TodolistType = {
  id: string,
  title: string;
  filter: FilterType;
};
interface AppProps { };

export const App = ({ }: AppProps) => {
  const [filter, setFilter] = useState<FilterType>("all");


  const todolistID1 = v1();
  const todolistID2 = v1();
  
  const [todolists, setTodolists] = useState<TodolistType[]>([
    { id: todolistID1, title: "What to learn", filter: "all" },
    { id: todolistID2, title: "What to buy", filter: "all" }
  ]);

  const [tasks, setTasks] = useState<Record<string, TaskType[]>>({
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ]
  });

  const removeTask = (todolistId: string, taskId: string) => {
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].filter(t => t.id !== taskId)] });
  };

  const changeFilter = (filter: FilterType) => {
    setFilter(filter);
  };

  const addTask = (title: string) => {
    // setTasks([...tasks, { id: v1(), title: title, isDone: false }]);
  };

  const changeTaskStatus = (taskId: string, status: boolean) => {
    // setTasks([...tasks.map(t => t.id === taskId ? { ...t, isDone: status } : t)]);
  };

  return (
    <div className={s.app}>
      {
        todolists.map(tl => {
          let tasksForTodolist = tasks[tl.id];
          console.log("tasksForTodolist", tasksForTodolist);

          if (filter === 'active') {
            // tasksForTodolist = tasks.filter(t => !t.isDone);
          }
          if (filter === "completed") {
            // tasksForTodolist = tasks.filter(t => t.isDone);
          }
          return (
            <Todolist
              key={tl.id}
              title="Want to learn" tasks={tasksForTodolist}
              todolistId={tl.id}
              removeTask={removeTask}
              filter={filter}
              changeFilter={changeFilter}
              addTask={addTask}
              changeTaskStatus={changeTaskStatus}
            />
          );
        }
        )
      }
    </div>
  );
};