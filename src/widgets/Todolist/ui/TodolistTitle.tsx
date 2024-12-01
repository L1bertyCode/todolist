import { EditableSpan } from "@/fetures/EditableSpan";
import MuiIconButton from '@mui/material/IconButton';
import MuiDeleteIcon from '@mui/icons-material/Delete';
import { useDispatch } from "react-redux";
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from "@/model/todolists-reducer/todolists-reducer";
import s from "./Todolist.module.css";
type Props = {
  todolist: TodolistType;
};

export const TodolistTitle = ({ todolist }: Props) => {
  const { title, id } = todolist;

  const dispatch = useDispatch();

  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(id));
  };

  const updateTodolistHandler = (title: string) => {
    dispatch(changeTodolistTitleAC({ todolistId: id, title }));

  };

  return (
    <div className={`todolist-title-container ${s.title}`}>
      <h3>
        <EditableSpan
          title={title}
          onChange={updateTodolistHandler} />
      </h3>
      <MuiIconButton onClick={removeTodolistHandler}>
        <MuiDeleteIcon />
      </MuiIconButton>
    </div>
  );
};