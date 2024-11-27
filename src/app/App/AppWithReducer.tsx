import { Todolist } from "@/widgets/Todolist/Todolist";
import s from "./App.module.css";
import { useReducer, useState } from "react";
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
import { MenuButton } from "@/shared/ui/MenuButton/MenuButton";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import CssBaseline from '@mui/material/CssBaseline';
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC, todolistsReducer } from "@/model/todolists-reducer/todolists-reducer";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC, tasksReducer } from "@/model/tasks-reducer/tasks-reducer";

type ThemeMode = 'dark' | 'light';

export type TaskType = {
  id: string;
  title: string;
  isDone: boolean;
};
export type TasksStateType = Record<string, TaskType[]>;
export type FilterValuesType = "all" | "completed" | "active";

export type TodolistType = {
  id: string,
  title: string;
  filter: FilterValuesType;
};
interface AppProps { };



export const App = ({ }: AppProps) => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: TodolistType[] = [];

  const action = addTodolistAC('new todolist');
  console.log("action", action);
  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);
  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  console.log("idFromTasks", idFromTasks);
  console.log("idFromTodolists", idFromTodolists);


  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  const theme = createTheme({
    palette: {
      mode: themeMode === 'light' ? 'light' : 'dark',
      primary: {
        main: '#087EA4',
      },
    },
  });
  const changeModeHandler = () => {
    setThemeMode(themeMode == 'light' ? 'dark' : 'light');
  };

  const todolistID1 = v1();
  const todolistID2 = v1();

  let [todolists, dispatchToTodolists] = useReducer(todolistsReducer, [
    { id: todolistID1, title: 'What to learn', filter: 'all' },
    { id: todolistID2, title: 'What to buy', filter: 'all' },
  ]);

  let [tasks, dispatchToTasks] = useReducer(tasksReducer, {
    [todolistID1]: [
      { id: v1(), title: 'HTML&CSS', isDone: true },
      { id: v1(), title: 'JS', isDone: true },
      { id: v1(), title: 'ReactJS', isDone: false },
    ],
    [todolistID2]: [
      { id: v1(), title: 'Rest API', isDone: true },
      { id: v1(), title: 'GraphQL', isDone: false },
    ],
  });


  const removeTask = (taskId: string, todolistId: string) => {
    dispatchToTasks(removeTaskAC({ taskId, todolistId }));
  };


  const addTask = (todolistId: string, title: string) => {
    dispatchToTasks(addTaskAC({ title, todolistId }));
    // setTasks({ ...tasks, [todolistId]: [...tasks[todolistId], { id: v1(), title, isDone: false }] });
  };

  const changeTaskStatus = (todolistId: string, taskId: string, status: boolean) => {
    dispatchToTasks(changeTaskStatusAC({ taskId, isDone: status, todolistId }));
    // setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].map(t => t.id === taskId ? { ...t, isDone: status } : t)] });
  };
  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatchToTasks(changeTaskTitleAC({ taskId, title, todolistId }));
    // setTasks({
    //   ...tasks, [todolisId]:
    //     [...tasks[todolisId].map(t => t.id === taskId ? { ...t, title } : t)]
    // });
  };

  const removeTodolist = (todolistId: string) => {
    const action = removeTodolistAC(todolistId);
    dispatchToTodolists(action);
    dispatchToTasks(action);
    // setTodolists([...todolists.filter(tl => tl.id !== todolistId)]);
    // delete tasks[todolistId];
    // setTasks({ ...tasks });

  };
  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatchToTodolists(changeTodolistFilterAC(todolistId, filter));
    // setTodolists([...todolists.map(tl => tl.id === todolistId ? { ...tl, filter } : tl)]);
  };

  const updateTodolist = (todolistId: string, title: string) => {
    dispatchToTodolists(changeTodolistTitleAC(todolistId, title));
  };

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatchToTodolists(action);
    dispatchToTasks(action);
  };


  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className={s.app}>
        <AppBar position="static" sx={{ mb: '30px' }}>
          <Toolbar >
            <Container
              fixed
              sx={{ display: 'flex', justifyContent: 'space-between' }}
            >
              <IconButton color="inherit">
                <MenuIcon />
              </IconButton>
              <div>
                <MenuButton color="inherit">Login</MenuButton>
                <MenuButton color="inherit">Logout</MenuButton>
                <MenuButton
                  background={theme.palette.primary.dark}
                  color="inherit">Faq</MenuButton>
                <Switch color={'default'} onChange={changeModeHandler} />
              </div>
            </Container>
          </Toolbar>
        </AppBar>
        <Container
          fixed>
          <Grid container sx={{ mb: '30px' }}>
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


                return (
                  <Grid
                    size={4}
                    key={tl.id}>
                    <Paper sx={{ p: '0 20px 20px 20px' }}>

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
    </ThemeProvider>
  );
};