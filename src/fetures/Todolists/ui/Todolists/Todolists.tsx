import { useDispatch, useSelector } from "react-redux";
import s from "./Todolists.module.css";

import { Grid2 as Grid, Paper } from "@mui/material";
import { RootState } from "@/app/providers/reduxProvider/store";
import { changeTodolistTitleAC, TodolistType } from "@/model/todolists-reducer/todolists-reducer";
import { Todolist } from "./Todolist/Todolist";

interface TodolistsProps { };
export const Todolists = ({ }: TodolistsProps) => {
  const dispatch = useDispatch();
  const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists);

  const updateTodolist = (todolistId: string, title: string) => {
    dispatch(changeTodolistTitleAC({ todolistId, title }));
  };
  return (
    <Grid container spacing={4}>
      {
        todolists.map(tl => {
          return (
            <Grid
              size={4}
              key={tl.id}>
              <Paper sx={{ p: '0 20px 20px 20px' }}>
                <Todolist
                  key={tl.id}
                  todolist={tl}
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
  );
};