
import { TasksStateType } from '@/app/App/App';
import { addTaskAC, removeTaskAC, tasksReducer } from './tasks-reducer';

test('correct task should be deleted from correct array', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  const endState = tasksReducer(startState, removeTaskAC({
    taskId: '2',
    todolistId: 'todolistId2',
  }));

  expect(endState).toEqual({
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '3', title: 'tea', isDone: false },
    ],
  });
});

test('correct task should be added to correct array', () => {
  const startState: TasksStateType = {
    todolistId1: [
      { id: '1', title: 'CSS', isDone: false },
      { id: '2', title: 'JS', isDone: true },
      { id: '3', title: 'React', isDone: false },
    ],
    todolistId2: [
      { id: '1', title: 'bread', isDone: false },
      { id: '2', title: 'milk', isDone: true },
      { id: '3', title: 'tea', isDone: false },
    ],
  };

  const endState = tasksReducer(startState, addTaskAC({ title: 'juce', todolistId: 'todolistId2' }));

  expect(endState['todolistId1'].length).toBe(3);
  expect(endState['todolistId2'].length).toBe(4);
  expect(endState['todolistId2'][0].id).toBeDefined();
  expect(endState['todolistId2'][0].title).toBe('bread');
  expect(endState['todolistId2'][0].isDone).toBe(false);
});