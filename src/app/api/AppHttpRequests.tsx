import React, { ChangeEvent, useEffect, useState } from "react";

import { AddItemForm } from "@/common/components";
import { EditableSpan } from "@/common/components";
import Checkbox from "@mui/material/Checkbox";

import axios from "axios";

import { GetTasksResponse, tasksApi, todolistsApi } from "@/fetures/Todolists";
import { DomainTask, TodolistType, UpdateTaskModel } from "@/fetures/Todolists";

import { TaskStatus } from "@/common/enums/enums";
import { BaseResponse } from "@/common/types/types";

const BASE_URL = "https://social-network.samuraijs.com/api/1.1";
const configs = {
  headers: {
    Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
    "API-KEY": `${process.env.REACT_APP_API_KEY}`,
  }
};

export const AppHttpRequests = () => {
  const [todolists, setTodolists] = useState<TodolistType[]>([]);
  const [tasks, setTasks] = useState<{ [key: string]: DomainTask[]; }>({});

  useEffect(() => {
    axios.get<TodolistType[]>(`${BASE_URL}/todo-lists`, configs).then(res => {
      const todolistsRes = res.data;
      setTodolists(todolistsRes);

      todolistsRes.forEach(tl => {
        axios.get<GetTasksResponse>(`${BASE_URL}/todo-lists/${tl.id}/tasks`, {
          headers: {
            Authorization: `${process.env.REACT_APP_AUTH_TOKEN}`,
          }
        }).then(res => {
          setTasks((prevState) => ({ ...prevState, [tl.id]: res.data.items }));
        }

        );
      }
      );
    }
    );

  }, []);


  const createTodolistHandler = (title: string) => {
    axios.post<BaseResponse<{ item: TodolistType; }>>(`${BASE_URL}/todo-lists`, { title }, configs).then(res => setTodolists([
      res.data.data.item,
      ...todolists
    ])
    );
  };

  const removeTodolistHandler = (todolistId: string) => {
    axios.delete<BaseResponse>(`${BASE_URL}/todo-lists/${todolistId}`, configs).then(res => {
      console.log(res.data);
      setTodolists([
        ...todolists.filter(tl => tl.id !== todolistId)
      ]);
    }
    );
  };

  const updateTodolistHandler = (todolistId: string, title: string) => {
    todolistsApi.updateTodolist({ todolistId, title }).then((res) => {
      setTodolists([...todolists.map((tl) => (tl.id !== todolistId ? tl : { ...tl, title: title }))]);
    });
  };

  const createTaskHandler = (title: string, todolistId: string) => {
    axios.post<any>(`${BASE_URL}/todo-lists/${todolistId}/tasks`, { title }, configs).then((res) => {
      console.log(res.data);
      setTasks({
        ...tasks,
        [todolistId]: [...tasks[todolistId], { ...res.data.data.item }],
      });
    }
    );

  };

  const removeTaskHandler = (taskId: string, todolistId: string) => {
    tasksApi.removeTask({ taskId, todolistId }).then((res) => {
      setTasks({
        ...tasks,
        [todolistId]: [...tasks[todolistId].filter((t) => t.id !== taskId)]
      });
    });
  };

  const changeTaskStatusHandler = (e: ChangeEvent<HTMLInputElement>, task: DomainTask) => {
    let status = e.currentTarget.checked ? TaskStatus.Completed : TaskStatus.New;

    const model: UpdateTaskModel = {
      status,
      title: task.title,
      deadline: task.deadline,
      description: task.description,
      priority: task.priority,
      startDate: task.startDate,
    };

    tasksApi.changeTaskStatus({ taskId: task.id, todolistId: task.todoListId, model }).then((res) => {
      const newTasks = tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, ...model } : t));
      setTasks({ ...tasks, [task.todoListId]: newTasks });
    });
  };

  const changeTaskTitleHandler = (title: string, task: DomainTask) => {
    tasksApi.changeTaskTitle({ title, taskId: task.id, todolistId: task.todoListId }).then((res) => {
      setTasks({
        ...tasks,
        [task.todoListId]: [...tasks[task.todoListId].map((t) => (t.id === task.id ? { ...t, title } : t))],
      });
    });
  };

  return (
    <div style={{ margin: "20px" }}>
      <AddItemForm addItem={createTodolistHandler} />

      {/* Todolists */}
      {todolists.map((tl: TodolistType) => {
        return (
          <div key={tl.id} style={todolist}>
            <div>
              <EditableSpan title={tl.title} onChange={(title: string) => updateTodolistHandler(tl.id, title)} />
              <button onClick={() => removeTodolistHandler(tl.id)}>x</button>
            </div>
            <AddItemForm addItem={(title) => createTaskHandler(title, tl.id)} />

            {/* Tasks */}
            {!!tasks[tl.id] &&
              tasks[tl.id].map((task: DomainTask) => {
                return (
                  <div key={task.id}>
                    <Checkbox
                      checked={task.status === 2 ? true : false}
                      onChange={(e) => changeTaskStatusHandler(e, task)}
                    />
                    <EditableSpan title={task.title} onChange={(title) => changeTaskTitleHandler(title, task)} />
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
  border: "1px solid black",
  margin: "20px 0",
  padding: "10px",
  width: "300px",
  display: "flex",
  justifyContent: "space-between",
  flexDirection: "column",
};
