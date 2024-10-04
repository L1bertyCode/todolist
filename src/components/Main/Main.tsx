import { useDispatch } from "react-redux"

import Container from '@mui/material/Container'
import { Grid } from '@mui/material'

import { AddItemForm } from "../AddItemForm"


import { addTodolistAC, } from "../../model/todolists-reducer/todolists-reducer"
import Todolists from "../Todolists/Todolists"

const Main = () => {
  const dispatch = useDispatch()

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title)
    dispatch(action)
  }


  return (
    <Container fixed>
      <Grid container sx={{ mb: '30px' }}>
        <AddItemForm addItem={addTodolist} />
      </Grid>

      <Grid container spacing={4} sx={{
        display: 'flex'
      }}>
        <Todolists />

      </Grid>
    </Container >

  )
}

export default Main