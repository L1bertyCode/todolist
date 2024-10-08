import List from '@mui/material/List';
import { TodolistType } from "../../model/todolists-reducer/todolists-reducer";
import { Task } from "../Task/Task";
import { useAppSelector } from "../../../../common/hooks/useAppSelector";
import { selectTasks } from "../../model/tasksSelectors";
type TasksProps = {
  todolist: TodolistType;
};

export const Tasks = ({ todolist }: TasksProps) => {
  const tasks = useAppSelector(selectTasks);

  const allTodolistTasks = tasks[todolist.id];

  let tasksForTodolist = allTodolistTasks;

  if (todolist.filter === 'active') {
    tasksForTodolist = allTodolistTasks.filter(task => !task.isDone);
  }

  if (todolist.filter === 'completed') {
    tasksForTodolist = allTodolistTasks.filter(task => task.isDone);
  }

  return (
    <>
      {tasksForTodolist.length === 0 ? (
        <p>Тасок нет</p>
      ) : (
        <List>
          {tasksForTodolist.map(task => {
            return <Task task={task} todolist={todolist} />;

          })}
        </List>
      )}
    </>
  );
};

export default Tasks;