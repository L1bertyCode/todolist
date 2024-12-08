import { Box } from "@mui/material"
import MuiButton from "@mui/material/Button"
import { filterButtonsContainerSx } from "./FilterTasksButtons.styles"
import {
  changeTodolistFilterAC,
  FilterValuesType,
  TodolistType,
} from "@/fetures/Todolists/model/todolists-reducer/todolists-reducer"
import { useAppDispatch } from "@/common/hooks/useAppDispatch"
interface FilterTaskButtonType {
  todolist: TodolistType
}

export const FilterTasksButtons = ({ todolist }: FilterTaskButtonType) => {
  const dispatch = useAppDispatch()

  const changeFilter = (filter: FilterValuesType, todolistId: string) => {
    dispatch(changeTodolistFilterAC({ todolistId, filter }))
  }
  return (
    <Box sx={filterButtonsContainerSx}>
      <MuiButton
        variant={todolist.filter === "all" ? "outlined" : "text"}
        color={"inherit"}
        onClick={() => changeFilter("all", todolist.id)}
      >
        All
      </MuiButton>
      <MuiButton
        variant={todolist.filter === "active" ? "outlined" : "text"}
        color={"primary"}
        onClick={() => changeFilter("active", todolist.id)}
      >
        Active
      </MuiButton>
      <MuiButton
        variant={todolist.filter === "completed" ? "outlined" : "text"}
        color={"secondary"}
        onClick={() => changeFilter("completed", todolist.id)}
      >
        Completed
      </MuiButton>
    </Box>
  )
}
