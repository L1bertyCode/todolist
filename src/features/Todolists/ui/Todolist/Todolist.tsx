
import { addTaskAC, TaskType } from '../../model/tasks-reducer/tasks-reducer';
import { TodolistType } from "../../model/todolists-reducer/todolists-reducer";
import { AddItemForm } from "../../../../common/components/AddItemForm/AddItemForm";
import { TodolistTitle } from "../TodolistTitle/TodolistTitle";
import FilterTasksButtons from "../FilterTasksButtons/FilterTasksButtons";
import Tasks from "../Tasks/Tasks";
import { useAppDispatch } from '../../../../common/hooks/useAppDispatch';


type TodolistProps = {
  todolist: TodolistType;

};

export const Todolist = ({ todolist }: TodolistProps
) => {
  const { id: todolistId, title } = todolist;
  const dispatch = useAppDispatch();
  const addTask = (title: string, todolistId: string) => {
    dispatch(addTaskAC({ title, todolistId }));
  };
  const addTaskCallback = (title: string) => {
    dispatch(addTaskAC({ title, todolistId: todolist.id }));
  };
  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm addItem={addTaskCallback} />
      <Tasks todolist={todolist} />
      <FilterTasksButtons todolist={todolist} />
    </div >
  );
};