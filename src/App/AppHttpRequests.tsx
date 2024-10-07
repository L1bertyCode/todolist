import Checkbox from '@mui/material/Checkbox';
import React, { ChangeEvent, useEffect, useState } from 'react';
import { AddItemForm } from '../common/components/AddItemForm/AddItemForm';
import { EditableSpan } from '../common/components/EditableSpan/EditableSpan';
import axios from 'axios';
import { title } from 'process';
export type Todolist = {
  id: string;
  title: string;
  addedDate: string;
  order: number;
};
type FieldError = {
  error: string;
  field: string;
};

type CreateTodolistResponse = {
  resultCode: number;
  messages: string[];
  fieldsErrors: FieldError[];
  data: {
    item: Todolist;
  };
};

type DeleteTodolistResponse = {
  data: {};
  fieldsErrors: FieldError[];
  messages: string[];
  resultCode: number;

};
type UpdateTodolistResponse = {
  data: {};
  fieldsErrors: FieldError[];
  messages: string[];
  resultCode: number;

};

export type DomainTask = {
  description: string;
  title: string;
  status: number;
  priority: number;
  startDate: string;
  deadline: string;
  id: string;
  todoListId: string;
  order: number;
  addedDate: string;
};

export type GetTasksResponse = {
  error: string | null;
  totalCount: number;
  items: DomainTask[];
};

type CreateTaskResponse = {

  resultCode: number;
  messages: string[];
  data: {
    item: DomainTask;
  };
};

type UpdateTaskModel = {

};

type UpdateTaskResponse = {
  fieldsErrors: FieldError[];
  resultCode: number;
  messages: string[],
  data: {
    item: DomainTask;
  };

};

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<Todolist[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[]; }>({});

  const instance = axios.create(
    {
      headers: {
        'API-KEY': '',
        Authorization: 'Bearer '
      }
    }
  );
  useEffect(() => {
    instance
      .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists'
      )
      .then(res => {
        const todolists = res.data;
        setTodolists(todolists);
        todolists.forEach(tl => {
          instance
            .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`)
            .then(res => {
              setTasks({ ...tasks, [tl.id]: res.data.items });
            });
        });
      });
  }, []);

  const createTodolistHandler = (title: string) => {
    instance
      .post<CreateTodolistResponse>(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        { title },
      )
      .then(res => {
        const newTodolist = res.data.data.item;
        setTodolists([newTodolist, ...todolists]);
        setTasks({ ...tasks, [newTodolist.id]: [] });
      });
  };

  const removeTodolistHandler = (id: string) => {
    instance
      .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`)
      .then(res => {
        setTodolists([...todolists.filter(tl => tl.id !== id)]);
      });
  };

  const updateTodolistHandler = (id: string, title: string) => {
    instance
      .put<UpdateTodolistResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`,
        { title }
      )
      .then(res => {
        const newTask = res.data.data;
        setTodolists([...todolists.map(tl => tl.id === id ? { ...tl, title } : tl)]);
      });
  };

  const createTaskHandler = (title: string, todolistId: string) => {
    instance.post<CreateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      { title })
      .then(res => {
        const newTask = res.data.data.item;
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
      });
  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    // remove task
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    let status = e.currentTarget.checked ? 2 : 0;

    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    };

    instance
      .put<UpdateTaskResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
        model)
      .then(res => {
        console.log(res.data);

        setTasks({ ...tasks, [task.todoListId]: [...tasks[task.todoListId].map(t => t.id === task.id ? { ...t, ...model } : t)] });
      });
  };

  const changeTaskTitleHandler = (title: string, task: any) => {
    // update task title
  };

  return (
    <div style={{ margin: '20px' }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl: Todolist) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan
                value={tl.title}
                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
              />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === 2 ? true : false}
                      onChange={e => changeTaskStatusHandler(e, task)}
                    />
                    <EditableSpan
                      value={task.title}
                      onChange={title => changeTaskTitleHandler(title, task)}
                    />
                    <button onClick={() => removeTaskHandler(task.id, tl.id)}>x</button>
                  </div>
                );
              })}
          </div>
        );
      })}
    </div>
  );
};

// Styles
const todolist: React.CSSProperties = {
  border: '1px solid black',
  margin: '20px 0',
  padding: '10px',
  width: '300px',
  display: 'flex',
  justifyContent: 'space-between',
  flexDirection: 'column',
};