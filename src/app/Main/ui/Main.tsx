import { Container, Grid2 as Grid } from "@mui/material"
import s from "./Main.module.css"

import { Todolists } from "@/fetures/Todolists/ui/Todolists/Todolists"
import { AddItemForm } from "@/common/components/AddItemForm"
import { addTodolistAC } from "@/fetures/Todolists/model/todolists-reducer/todolists-reducer"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"

interface MainProps {}
export const Main = ({}: MainProps) => {
  const dispatch = useAppDispatch()
  const addTodolist = (title: string) => {
    dispatch(addTodolistAC(title))
  }

  return (
    <Container fixed>
      <Grid container sx={{ mb: "30px" }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>
      <Todolists />
    </Container>
  )
}
