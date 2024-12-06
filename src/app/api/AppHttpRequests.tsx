import React, { ChangeEvent, useEffect, useState } from 'react';

import { AddItemForm } from '@/common/components/AddItemForm';
import { EditableSpan } from '@/common/components/EditableSpan';
import Checkbox from '@mui/material/Checkbox';

import axios from 'axios';

import { todolistsApi } from '@/fetures/Todolists';
import {
  CreateTaskResponse, CreateTodolistResponse, DeleteTaskResponse, DeleteTodolistResponse, DomainTask,
  GetTasksResponse, TodolistType, UpdateTaskModel, UpdateTaskResponse, UpdateTodolistResponse
} from '@/fetures/Todolists';
import { todolistsReducer } from '@/fetures/Todolists/model/todolists-reducer/todolists-reducer';

const API_KEY = '';
const TOKEN = '';

export const AppHttpRequests = () => {

  const [todolists, setTodolists] = useState<TodolistType[]>([]); const [tasks, setTasks] = useState<{ [key: string]: DomainTask[]; }>({});



  useEffect(() => {
    todolistsApi.getTodolists().then(res => {
      const todolists = res.data;
      setTodolists(todolists);
      todolists.forEach(tl => {
        axios
          .get<GetTasksResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${tl.id}/tasks`, {
            headers: {
              Authorization: `${TOKEN}`,
              'API-KEY': `${API_KEY}`,
            },
          })
          .then(res => {
            console.log(res.data);

            setTasks({ ...tasks, [tl.id]: res.data.items });
          });
      });
    });
  }, []);


  const createTodolistHandler = (title: string) => {
    axios;
    todolistsApi.createTodolist(title)
      .then(res => {
        const newTodolist = res.data.data.item;
        setTodolists([newTodolist, ...todolists]);
        setTasks({ ...tasks, [res.data.data.item.id]: [] });
      });
  };

  const removeTodolistHandler = (id: string) => {
    axios
      .delete<DeleteTodolistResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${id}`, {
        headers: {
          Authorization: `${TOKEN}`,
          'API-KEY': `${API_KEY}`,
        },
      })
      .then(res => {
        setTodolists([...todolists.filter(tl => tl.id !== id)]);
      });
  };

  const updateTodolistHandler = (id: string, title: string) => {
    axios;
    todolistsApi.updateTodolist({ id, title })
      .then(res => {
        setTodolists([...todolists.map(tl => tl.id !== id ? tl : { ...tl, title: title })]);
      });
  };


  const createTaskHandler = (title: string, todolistId: string) => {
    axios.post<CreateTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks`,
      { title },
      {
        headers: {
          Authorization: `${TOKEN}`,
          'API-KEY': `${API_KEY}`
        },
      }).then(res => {
        const newTask = res.data.data.item;
        setTasks({ ...tasks, [todolistId]: [newTask, ...tasks[todolistId]] });
      });
  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    axios
      .delete<DeleteTaskResponse>(`https://social-network.samuraijs.com/api/1.1/todo-lists/${todolistId}/tasks/${taskId}`, {
        headers: {
          Authorization: `${TOKEN}`,
          'API-KEY': `${API_KEY}`,
        },
      })
      .then(res => {
        console.log(res.data);

        setTasks({ ...tasks, [todolistId]: [...tasks[todolistId].filter(t => t.id !== taskId)] });
      });
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

    axios
      .put<UpdateTaskResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
        model,
        {
          headers: {
            Authorization: `${TOKEN}`,
            'API-KEY': `${API_KEY}`,
          },
        }
      )
      .then(res => {
        const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? { ...t, ...model } : t));
        setTasks({ ...tasks, [task.todoListId]: newTasks });
      });
  };

  const changeTaskTitleHandler = (title: string, task: DomainTask) => {
    axios
      .put<UpdateTaskResponse>(
        `https://social-network.samuraijs.com/api/1.1/todo-lists/${task.todoListId}/tasks/${task.id}`,
        title,
        {
          headers: {
            Authorization: `${TOKEN}`,
            'API-KEY': `${API_KEY}`,
          },
        }
      )
      .then(res => {
        setTasks({ ...tasks, [task.todoListId]: [...tasks[task.todoListId].map(t => t.id === task.id ? { ...t, title } : t)] });
      });
  };

  return (
    <div style={{ margin: '20px' }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl: TodolistType) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan
                title={tl.title}
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
                      title={task.title}
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