
import { addTaskAC, TaskType } from '../../model/tasks-reducer/tasks-reducer';
import { TodolistType } from "../../model/todolists-reducer/todolists-reducer";
import { AddItemForm } from "../AddItemForm";
import { TodolistTitle } from "../TodolistTitle/TodolistTitle";
import FilterTasksButtons from "../FilterTasksButtons/FilterTasksButtons";
import Tasks from "../Tasks/Tasks";
import { useDispatch } from 'react-redux';


type TodolistProps = {
  todolist: TodolistType;

};

export const Todolist = ({ todolist }: TodolistProps
) => {
  const { id: todolistId, title } = todolist;
  const dispatch = useDispatch();
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