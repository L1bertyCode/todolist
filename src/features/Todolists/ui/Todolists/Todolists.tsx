import { useSelector } from "react-redux";
import { RootState } from "../../../../App/store/store";

import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';

import { TodolistType } from "../../../../model/todolists-reducer/todolists-reducer";

import { Todolist } from "../Todolist/Todolist";

const Todolists = () => {
  const todolists = useSelector<RootState, TodolistType[]>(state => state.todolists);
  return (
    <>{todolists.map(tl => {

      return (
        <Grid
          key={tl.id}
          sx={{ mt: "20px", mr: "20px" }}>
          <Paper sx={{ p: '0px 20px 20px 20px' }}>
            <Todolist
              key={tl.id}
              todolist={tl}
            />
          </Paper>
        </Grid>
      );
    })}</>
  );
};

export default Todolists;