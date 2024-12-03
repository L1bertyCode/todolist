import { Grid2 as Grid, Paper } from "@mui/material";
import { Todolist } from "./Todolist/Todolist";
import { changeTodolistTitleAC, } from "../../model/todolists-reducer/todolists-reducer";
import { useAppDispatch } from "@/common/hooks/useAppDispatch";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTodolists } from "../../model/todolists-reducer/todolistsSelectors";


interface TodolistsProps { };
export const Todolists = ({ }: TodolistsProps) => {
  const dispatch = useAppDispatch();
  const todolists = useAppSelector(selectTodolists);

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