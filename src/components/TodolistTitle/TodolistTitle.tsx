import { EditableSpan } from "../EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from "../../model/todolists-reducer/todolists-reducer";

type TodolistTitleProps = {
  todolist: TodolistType;
};

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const dispatch = useDispatch();
  const { title, id: todolistId } = todolist;
  const changeTodolistHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title));
  };
  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(todolistId));
  };
  return (
    <h3>
      <div className={'todolist-title-container'}>
        <h3>
          <EditableSpan onChange={changeTodolistHandler} value={title} />
        </h3>
        <IconButton onClick={removeTodolistHandler}>
          <DeleteIcon />
        </IconButton>

      </div>
    </h3>
  );
};