import { Todolist } from "@/widgets/Todolist/Todolist";
import s from "./App.module.css";
import { useState } from "react";
import { v1 } from "uuid";
import { AddItemForm } from "@/fetures/AddItemForm";
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Grid from "@mui/material/Grid2";
import Paper from '@mui/material/Paper';

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

  const changeFilter = (filter: FilterType, todolistId: string) => {
    setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl)]);
  };

  const addTask = (todolistId: string, title: string) => {
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], { id: v1(), title, isDone: false }] });
  };

  const changeTaskStatus = (todolistId: string, taskId: string, status: boolean) => {
    setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: status } : t)] });
  };

  const removeTodolist = (todolistId: string) => {
    setTodolists([...todolists.filter(tl => tl.id !== todolistId)]);
    delete tasks[todolistId];

    setTasks({ ...tasks });
  };

  const addTodolist = (title: string) => {
    const newTodolostId = v1();
    setTodolists([...todolists, { id: newTodolostId, title, filter: "all" }]);
    setTasks({ ...tasks, [newTodolostId]: [] });
  };

  const updateTask = (todolisId: string, taskId: string, title: string) => {
    setTasks({
      ...tasks, [todolisId]:
        [...tasks[todolisId].map(t => t.id === taskId ? { ...t, title } : t)]
    });
  };

  const updateTodolist = (todolistId: string, title: string) => {
    setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, title } : tl)]);
  };
  return (
    <div className={s.app}>
      <AppBar position="static">
        <Toolbar>
          <Container
            fixed>
            <IconButton color="inherit">
              <MenuIcon />
            </IconButton>
            <Button color="inherit">Login</Button>
          </Container>
        </Toolbar>
      </AppBar>
      <Container
        fixed>
        <Grid >
          <AddItemForm addItem={addTodolist} />
        </Grid>
        <Grid container spacing={4}>
          {
            todolists.map(tl => {
              let tasksForTodolist = tasks[tl.id];

              if (tl.filter === 'active') {
                tasksForTodolist = tasks[tl.id].filter(t => !t.isDone);
              }
              if (tl.filter === "completed") {
                tasksForTodolist = tasks[tl.id].filter(t => t.isDone);
              }
              console.log("tl.id", tl.id);

              return (
                <Grid
                  size={4}
                  key={tl.id}>
                  <Paper>

                    <Todolist
                      key={tl.id}
                      title={tl.title} tasks={tasksForTodolist}
                      todolistId={tl.id}
                      removeTask={removeTask}
                      filter={tl.filter}
                      changeFilter={changeFilter}
                      addTask={addTask}
                      changeTaskStatus={changeTaskStatus}
                      removeTodolist={removeTodolist}
                      updateTask={updateTask}
                      updateTodolist={
                        updateTodolist
                      }
                    />
                  </Paper>
                </Grid>
              );
            }
            )
          }
        </Grid>
      </Container>

    </div >
  );
};