import { changeTodolistFilterAC, FilterValuesType, TodolistType } from "@/model/todolists-reducer/todolists-reducer";
import { Box } from "@mui/material";
import MuiButton from '@mui/material/Button';
import { filterButtonsContainerSx } from "./Todolist.styles";
import { useDispatch } from "react-redux";
interface FilterTaskButtonType {
  todolist: TodolistType;
}

export const FilterTasksButtons = (
  { todolist }: FilterTaskButtonType
) => {
  const dispatch = useDispatch();

  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC({ todolistId, filter }));

  };
  return (
    <Box sx={filterButtonsContainerSx}>
      <MuiButton
        variant={todolist.filter === 'all' ? 'outlined' : 'text'}
        color={'inherit'}
        onClick={() => changeFilter('all', todolist.id)}
      >
        All
      </MuiButton>
      <MuiButton
        variant={todolist.filter === 'active' ? 'outlined' : 'text'}
        color={'primary'}
        onClick={() => changeFilter('active', todolist.id)}
      >
        Active
      </MuiButton>
      <MuiButton
        variant={todolist.filter === 'completed' ? 'outlined' : 'text'}
        color={'secondary'}
        onClick={() => changeFilter('completed', todolist.id)}
      >
        Completed
      </MuiButton>
    </Box>
  );
};