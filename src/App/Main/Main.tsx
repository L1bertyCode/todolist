
import Container from '@mui/material/Container';
import { Grid } from '@mui/material';

import { AddItemForm } from "../../common/components/AddItemForm/AddItemForm";


import { addTodolistAC, } from "../../features/Todolists/model/todolists-reducer/todolists-reducer";
import Todolists from "../../features/Todolists/ui/Todolists/Todolists";
import { useAppDispatch } from '../../common/hooks/useAppDispatch';

const Main = () => {
  const dispatch = useAppDispatch();

  const addTodolist = (title: string) => {
    const action = addTodolistAC(title);
    dispatch(action);
  };


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

  );
};

export default Main;