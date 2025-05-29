import React, { useState } from "react";
import { Plus, Trash2, Move } from "lucide-react";
import "./index.css";

const initialData = [
  {
    id: 1,
    title: "À faire",
    tasks: [
      { id: "task-1", content: "Acheter du lait" },
      { id: "task-2", content: "Répondre aux emails" },
    ],
  },
  {
    id: 2,
    title: "En cours",
    tasks: [{ id: "task-3", content: "Développer l'interface" }],
  },
  {
    id: 3,
    title: "Terminé",
    tasks: [{ id: "task-4", content: "Configurer le projet React" }],
  },
];

export default function TaskManager() {
  const [columns, setColumns] = useState(initialData);
  const [newTask, setNewTask] = useState("");

  const addTask = (columnId) => {
    if (!newTask.trim()) return;
    const newTaskObj = { id: `task-${Date.now()}`, content: newTask };
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: [...col.tasks, newTaskObj] }
          : col
      )
    );
    setNewTask("");
  };

  const removeTask = (columnId, taskId) => {
    setColumns(
      columns.map((col) =>
        col.id === columnId
          ? { ...col, tasks: col.tasks.filter((task) => task.id !== taskId) }
          : col
      )
    );
  };

  const moveTask = (fromColId, toColId, taskId) => {
    let movedTask;
    const updatedColumns = columns
      .map((col) => {
        if (col.id === fromColId) {
          const newTasks = col.tasks.filter((task) => {
            if (task.id === taskId) movedTask = task;
            return task.id !== taskId;
          });
          return { ...col, tasks: newTasks };
        }
        return col;
      })
      .map((col) => {
        if (col.id === toColId && movedTask) {
          return { ...col, tasks: [...col.tasks, movedTask] };
        }
        return col;
      });
    setColumns(updatedColumns);
  };

  return (
    <div className="taskmanager-grid">
      {columns.map((column) => (
        <div key={column.id} className="taskmanager-column">
          <h2 className="column-title">{column.title}</h2>
          <ul className="task-list">
            {column.tasks.map((task) => (
              <li key={task.id} className="task-item">
                <span>{task.content}</span>
                <div className="task-actions">
                  {columns.map(
                    (col) =>
                      col.id !== column.id && (
                        <button
                          key={col.id}
                          onClick={() => moveTask(column.id, col.id, task.id)}
                          title={`Déplacer vers ${col.title}`}
                          className="move-btn"
                        >
                          <Move size={14} />
                        </button>
                      )
                  )}
                  <button
                    onClick={() => removeTask(column.id, task.id)}
                    className="delete-btn"
                  >
                    <Trash2 size={14} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="task-form">
            <input
              className="task-input"
              placeholder="Nouvelle tâche"
              value={newTask}
              onChange={(e) => setNewTask(e.target.value)}
            />
            <button onClick={() => addTask(column.id)} className="add-btn">
              <Plus size={16} />
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
