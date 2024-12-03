import { List } from "@mui/material";
import { TaskItem } from "./TaskItem/TaskItem";
import { TodolistType } from "@/fetures/Todolists/model/todolists-reducer/todolists-reducer";
import { useAppSelector } from "@/common/hooks/useAppSelector";
import { selectTasks } from "@/fetures/Todolists/model/tasks-reducer/tasksSelectors";

interface TasksListProps {
  todolist: TodolistType;
};
export const TasksList = ({ todolist }: TasksListProps) => {
  const tasks = useAppSelector(selectTasks);

  let tasksForTodolist = tasks[todolist.id];
  if (todolist.filter === 'active') {
    tasksForTodolist = tasks[todolist.id].filter(t => !t.isDone);
  }
  if (todolist.filter === "completed") {
    tasksForTodolist = tasks[todolist.id].filter(t => t.isDone);
  }

  return (
    < >
      {tasksForTodolist?.length !== 0 ? <List>{tasksForTodolist?.map(t => {
        return (
          <TaskItem
            key={t.id}
            task={t}
            todolist={todolist}
          />
        );
      })}</List> : <div style={{ padding: "20px 0" }}>{"Tasks not found"}</div>}
    </>
  );
};