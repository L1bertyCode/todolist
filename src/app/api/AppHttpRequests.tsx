import { AddItemForm } from '@/common/components/AddItemForm';
import { EditableSpan } from '@/common/components/EditableSpan';
import Checkbox from '@mui/material/Checkbox';
import axios from 'axios';
import React, { ChangeEvent, useEffect, useState } from 'react';
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

export const AppHttpRequests = () => {

  const [todolists, setTodolists] = useState<Todolist[]>([]); const [tasks, setTasks] = useState<any>({});

  useEffect(() => {
    axios
      .get<Todolist[]>('https://social-network.samuraijs.com/api/1.1/todo-lists', {
        headers: {
          Authorization: 'Bearer fdc17612-0a2d-43d8-b434-a15591db5a85',
        },
      })
      .then(res => {
        console.log(res.data);
        setTodolists(res.data);
      });
  }, []);


  const createTodolistHandler = (title: string) => {
    axios
      .post<CreateTodolistResponse>(
        'https://social-network.samuraijs.com/api/1.1/todo-lists',
        { title },
        {
          headers: {
            Authorization: 'Bearer xxx',
            'API-KEY': 'xxx'
          },
        }
      )
      .then(res => {
        const newTodolist = res.data.data.item;
        setTodolists([newTodolist, ...todolists]);
      });
  };

  const removeTodolistHandler = (id: string) => {
    // remove todolist
  };

  const updateTodolistHandler = (id: string, title: string) => {
    // update todolist title
  };

  const createTaskHandler = (title: string, todolistId: string) => {
    // create task
  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    // remove task
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: any) => {
    // update task status
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
                title={tl.title}
                onChange={(title: string) => updateTodolistHandler(tl.id, title)}
              />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={title => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: any) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.isDone}
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