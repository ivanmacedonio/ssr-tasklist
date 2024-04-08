import React, { useState } from "react";

type Task = {
  readonly id: string | null;
  title: string;
  complete: boolean;
};

type Props = {
  tasksList: Task[];
  handleComplete?: any;
  handleDelete: any;
  context: string;
};

export const List: React.FC<Props> = ({
  tasksList,
  handleComplete,
  handleDelete,
  context,
}) => {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const itemsPerPage = 3;
  const initialIndex = currentPage * itemsPerPage;
  const endIndex = currentPage + itemsPerPage;
  const currentTasks = tasksList.slice(initialIndex, endIndex);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  return (
    <div className="flex justify-center">
      {tasksList.length === 0 ? (
        <div>
          <p className="text-gray-500 font-semibold my-12">
            Aun no hay tareas...
          </p>
        </div>
      ) : (
        <div>
          {context === "create" ? (
            <ul className="m-auto mt-12">
              {currentTasks.map((task) => (
                <li key={task.id} className="text-xl mb-2 px-8 py-2 flex gap-4">
                  📝 <h3>{task.title}</h3>
                  {task.complete === true ? (
                    <h5>Completada ✅</h5>
                  ) : (
                    <h5>Pendiente 🧨</h5>
                  )}
                  <button
                    className="text-lg rounded bg-black font-semibold px-8 py-1"
                    onClick={() => {
                      handleComplete(task.id);
                    }}
                  >
                    Completar
                  </button>
                  <button
                    className="text-lg rounded bg-red-500 font-semibold px-8 py-1"
                    onClick={() => {
                      handleDelete(task.id);
                    }}
                  >
                    Eliminar
                  </button>
                </li>
              ))}
              <div className="flex gap-4 my-8">
                {currentPage > 0 ? (
                  <button
                    className="bg-orange-800 px-4 py-1 rounded font-semibold"
                    onClick={() => {
                      handlePageChange(currentPage - 1);
                    }}
                  >
                    Anterior
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="bg-green-800 px-4 py-1 rounded font-semibold"
                  onClick={() => {
                    handlePageChange(currentPage + 1);
                  }}
                >
                  Siguiente
                </button>
              </div>
            </ul>
          ) : (
            <div>
              <ul className="m-auto mt-12">
                {currentTasks.map((task) => (
                  <div className="flex gap-2 mb-4 justify-center">
                    <li
                      key={task.id}
                      className="text-xl mb-2 px-8 py-2 flex gap-4"
                    >
                      📝 <h3>{task.title}</h3>
                    </li>
                    <button
                      className="text-sm rounded bg-red-500 font-semibold px-8 py-1"
                      onClick={() => {
                        handleDelete(task.id);
                      }}
                    >
                      Eliminar
                    </button>
                  </div>
                ))}
              </ul>
              <div className="flex gap-4 my-8">
                {currentPage > 0 ? (
                  <button
                    className="bg-orange-800 px-4 py-1 rounded font-semibold"
                    onClick={() => {
                      handlePageChange(currentPage - 1);
                    }}
                  >
                    Anterior
                  </button>
                ) : (
                  ""
                )}
                <button
                  className="bg-green-800 px-4 py-1 rounded font-semibold"
                  onClick={() => {
                    handlePageChange(currentPage + 1);
                  }}
                >
                  Siguiente
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};
