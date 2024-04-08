import React, { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { List } from "./List";
import { TaskForm } from "./TaskForm";

type Task = {
  readonly id: string | null;
  title: string;
  complete: boolean;
};
export const Tasklist = () => {
  const [task, setTask] = useState<Task>({
    id: null,
    title: "",
    complete: false,
  });
  const [completedTasks, setCompletedTasks] = useState<Task[]>([]);
  const [tasksList, setTasksList] = useState<Task[]>([]);

  //form handlers
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasksList((prevTasks) => {
      const newTasks = [...prevTasks, task];
      const jsonTask = JSON.stringify(newTasks);
      localStorage.setItem("tasks", jsonTask);
      return newTasks;
    });
    setTask({ id: null, title: "", complete: false });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ title: e.target.value, complete: false, id: uuidv4() });
  };

  //complete management
  const handleComplete = (id: string | null) => {
    // Main array
    const localData = localStorage.getItem("tasks");
    const parsedLocalData = JSON.parse(localData ?? "[]");

    const filteredData = parsedLocalData.filter((task: Task) => task.id !== id);
    const parsedFilteredData = JSON.stringify(filteredData);
    localStorage.removeItem("tasks");
    localStorage.setItem("tasks", parsedFilteredData);

    // Completed tasks array
    const localCompletedData = localStorage.getItem("completed_tasks");
    let parsedLocalCompleted = JSON.parse(localCompletedData ?? "null");

    if (parsedLocalCompleted === null) {
        const completedTask = parsedLocalData.find((task: Task) => task.id === id);
        if (completedTask) {
            const stringCompleted = JSON.stringify([completedTask]);
            localStorage.setItem("completed_tasks", stringCompleted);
        }
    } else {
        const completedTask = parsedLocalData.find((task: Task) => task.id === id);
        if (completedTask) {
            const newCompletedTasks = [...parsedLocalCompleted, completedTask];
            const stringCompleted = JSON.stringify(newCompletedTasks);
            localStorage.setItem("completed_tasks", stringCompleted);
        }
    }

    window.location.reload()
};


  //delete management
  const handleDelete = (id: string | null) => {
    const localData = localStorage.getItem("tasks");
    const parsedLocalData = JSON.parse(localData ?? "[]");
    const filteredData = parsedLocalData.filter((task: Task) => task.id !== id);
    const parsedFiltered = JSON.stringify(filteredData);
    localStorage.setItem("tasks", parsedFiltered);
    window.location.reload()
  };
  const handleCompletedDelete = (id: string | null) => {
    const filteredData = completedTasks.filter((task) => task.id !== id);
    setCompletedTasks(filteredData);
  };
  return (
    <div className="flex flex-col justify-center mt-10">
      <TaskForm
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        task={task}
      ></TaskForm>
      <List
        handleComplete={handleComplete}
        handleDelete={handleDelete}
        context="create"
      ></List>
      <h3 className="text-center text-2xl">
        Completed <strong className="text-green-700">tasks!</strong>
      </h3>
      <List handleDelete={handleCompletedDelete} context="complete"></List>
    </div>
  );
};
