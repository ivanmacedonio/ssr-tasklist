import React from "react";

type Task = {
  title: string;
  complete: boolean;
};

type Props = {
  handleSubmit: React.FormEventHandler<HTMLFormElement>;
  handleChange: React.ChangeEventHandler<HTMLInputElement>;
  task: Task;
};

export const TaskForm: React.FC<Props> = ({
  handleSubmit,
  handleChange,
  task,
}) => {
  return (
    <div className="w-full">
      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center gap-4 w-full"
      >
        <input
          value={task.title}
          onChange={handleChange}
          className="border-black outline-none text-xl px-6 py-2 rounded w-half"
          type="text"
          placeholder="Lavar la ropa, secar el patio, estudiar..."
        />
        <button className="bg-gray-500 px-8 py-2 rounded shadow-md cursor-pointer">
          Create
        </button>
      </form>
    </div>
  );
};
