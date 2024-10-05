import { EditableSpan } from "../../../../common/components/EditableSpan/EditableSpan";
import IconButton from '@mui/material/IconButton';
import DeleteIcon from '@mui/icons-material/Delete';
import { changeTodolistTitleAC, removeTodolistAC, TodolistType } from "../../model/todolists-reducer/todolists-reducer";
import { useAppDispatch } from "../../../../common/hooks/useAppDispatch";

type TodolistTitleProps = {
  todolist: TodolistType;
};

export const TodolistTitle = ({ todolist }: TodolistTitleProps) => {
  const dispatch = useAppDispatch();
  const { title, id: todolistId } = todolist;
  const changeTodolistHandler = (title: string) => {
    dispatch(changeTodolistTitleAC(todolistId, title));
  };
  const removeTodolistHandler = () => {
    dispatch(removeTodolistAC(todolistId));
  };
  return (
    <h3>
      <div className={'container'}>
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