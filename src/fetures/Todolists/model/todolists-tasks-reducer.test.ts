import { TodolistType } from "./todolists-reducer/todolists-reducer";
import { TasksStateType } from "./tasks-reducer/tasks-reducer";
import { addTodolistAC, todolistsReducer } from "./todolists-reducer/todolists-reducer";
import { tasksReducer } from "./tasks-reducer/tasks-reducer";

test('ids should be equals', () => {
  const startTasksState: TasksStateType = {};
  const startTodolistsState: TodolistType[] = [];

  const action = addTodolistAC('new todolist');
  console.log("action", action);


  const endTasksState = tasksReducer(startTasksState, action);
  const endTodolistsState = todolistsReducer(startTodolistsState, action);


  const keys = Object.keys(endTasksState);
  const idFromTasks = keys[0];
  const idFromTodolists = endTodolistsState[0].id;

  expect(idFromTasks).toBe(action.payload.todolistId);
  expect(idFromTodolists).toBe(action.payload.todolistId);
});