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

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setTasksList([...tasksList, task]);
    localStorage.setItem("tasks", tasksList)
    setTask({ id: null, title: "", complete: false });
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTask({ title: e.target.value, complete: false, id: uuidv4() });
  };
  const handleComplete = (id: string | null) => {
    const filteredData = tasksList.filter((task: Task) => task.id !== id);
    const completedTask = tasksList.filter((task: Task) => task.id === id);
    setTasksList(filteredData);
    setCompletedTasks([...completedTasks, completedTask[0]]);
  };
  const handleDelete = (id: string) => {
    const filteredData = tasksList.filter((task) => task.id !== id);
    setTasksList(filteredData);
  };
  const handleCompletedDelete = (id: string) => {
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
        tasksList={tasksList}
        handleComplete={handleComplete}
        handleDelete={handleDelete}
        context="create"
      ></List>
      <h3 className="text-center text-2xl">
        Completed <strong className="text-green-700">tasks!</strong>
      </h3>
      <List
        tasksList={completedTasks}
        handleDelete={handleCompletedDelete}
        context="complete"
      ></List>
    </div>
  );
};
