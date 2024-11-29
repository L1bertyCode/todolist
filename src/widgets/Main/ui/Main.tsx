import { Container, Grid2 as Grid, Paper } from "@mui/material";
import s from "./Main.module.css";
import { AddItemForm } from "@/fetures/AddItemForm";
import { Todolist } from "@/widgets/Todolist/Todolist";
import { useDispatch, useSelector } from "react-redux";
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from "@/model/tasks-reducer/tasks-reducer";
import { TodolistType } from "@/app/App/App";
import { FilterValuesType, TasksStateType } from "@/model/tasks-reducer/tasks-reducer";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from "@/model/todolists-reducer/todolists-reducer";
import { RootState } from "@/app/providers/reduxProvider/store";
interface MainProps { };
export const Main = ({ }: MainProps) => {
  const dispatch = useDispatch();

  const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists);
  const tasks = useSelector<RootState, TasksStateType>(state => state.tasks);

  const removeTask = (taskId: string, todolistId: string) => {
    dispatch(removeTaskAC({ taskId, todolistId }));
  };

  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC({ title, todolistId }));
  };

  const changeTaskStatus = (taskId: string, taskStatus: boolean, todolistId: string) => {
    dispatch(changeTaskStatusAC({ taskId, isDone: taskStatus, todolistId }));
  };

  const updateTask = (todolistId: string, taskId: string, title: string) => {
    dispatch(changeTaskTitleAC({ taskId, title, todolistId }));
  };

  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC({ todolistId, filter }));

  };

  const removeTodolist = (todolistId: string) => {
    dispatch(removeTodolistAC(todolistId));

  };

  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title));
  };

  const updateTodolist = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({ todolistId, title }));

  };

  return (
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
  );
};