import { Container, Grid2 as Grid } from "@mui/material";
import s from "./Main.module.css";

import { useDispatch } from "react-redux";
import { addTodolistAC } from "@/model/todolists-reducer/todolists-reducer";
import { Todolists } from "@/fetures/Todolists/ui/Todolists/Todolists";
import { AddItemForm } from "@/common/components/AddItemForm";


interface MainProps { };
export const Main = ({ }: MainProps) => {
  const dispatch = useDispatch();
  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title));
  };

  return (
    <Container
      fixed>
      <Grid container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Todolists />
    </Container>
  );
};