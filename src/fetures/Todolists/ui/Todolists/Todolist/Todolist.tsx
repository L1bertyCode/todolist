import { addTaskAC, TaskType } from "@/model/tasks-reducer/tasks-reducer";
import { TodolistType } from '@/model/todolists-reducer/todolists-reducer';




import { FilterTasksButtons } from "./FilterTasksButtons/FilterTasksButtons";
import { TasksList } from "./TasksList/TasksList";
import { TodolistTitle } from "./TodolistTitle/TodolistTitle";
import { useDispatch } from "react-redux";
import { AddItemForm } from "@/common/components/AddItemForm";


interface TodolistProps {
  todolist: TodolistType;
  updateTodolist: (todolistId: string, title: string) => void;
}
export const Todolist = ({
  todolist,
}: TodolistProps) => {
  const dispatch = useDispatch();

  const addTaskCallback = (title: string) => dispatch(addTaskAC({ title, todolistId: todolist.id }));;

  return (
    <div>
      <TodolistTitle todolist={todolist} />
      <AddItemForm
        addItem={addTaskCallback}
      />
      <TasksList todolist={todolist} />
      <FilterTasksButtons
        todolist={todolist}
      />
    </div>
  );
}; 