import React, { ChangeEvent, useEffect, useState } from 'react';

import { AddItemForm } from '@/common/components/AddItemForm';
import { EditableSpan } from '@/common/components/EditableSpan';
import Checkbox from '@mui/material/Checkbox';

import axios from 'axios';

import { tasksApi, todolistsApi } from '@/fetures/Todolists';

import {
  CreateTaskResponse, DeleteTaskResponse, DeleteTodolistResponse, DomainTask,
  GetTasksResponse, TodolistType, UpdateTaskModel, UpdateTaskResponse
} from '@/fetures/Todolists';
import { instance } from '@/common/common/instance/instance';



export const AppHttpRequests = () => {

  const [todolists, setTodolists] = useState<TodolistType[]>([]); const [tasks, setTasks] = useState<{ [key: string]: DomainTask[]; }>({});



  useEffect(() => {
    todolistsApi.getTodolists().then(res => {
      const todolists = res.data;
      setTodolists(todolists);
      todolists.forEach(tl => {
        tasksApi.getTasks(tl.id)
          .then(res => {
            console.log(res.data);
            setTasks({ ...tasks, [tl.id]: res.data.items });
          });
      });
    });
  }, []);


  const createTodolistHandler = (title: string) => {
    todolistsApi.createTodolist(title)
      .then(res => {
        const newTodolist = res.data.data.item;
        setTodolists([newTodolist, ...todolists]);
        setTasks({ ...tasks, [res.data.data.item.id]: [] });
      });
  };

  const removeTodolistHandler = (id: string) => {
    todolistsApi.removeTodolist(id)
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
    instance.post<CreateTaskResponse>(`todo-lists/${todolistId}/tasks`,
      { title })
      .then(res =>
        setTasks({
          ...tasks,
          [todolistId]: [
            ...tasks[todolistId],
            { ...res.data.data.item }]
        })
      );
  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.removeTask({ taskId, todolistId })
      .then(res => {
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

    tasksApi.changeTaskStatus({ taskId: task.id, todolistId: task.todoListId, model })
      .then(res => {
        const newTasks = tasks[task.todoListId].map(t => (t.id === task.id ? { ...t, ...model } : t));
        setTasks({ ...tasks, [task.todoListId]: newTasks });
      });
  };

  const changeTaskTitleHandler = (title: string, task: DomainTask) => {
    tasksApi.changeTaskTitle({ title, taskId: task.id, todolistId: task.todoListId })
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