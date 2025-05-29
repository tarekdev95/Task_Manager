import { useEffect, useState } from "react";
import { fetchTasks } from "../api/tasks";
import Column from "./Column";
import { Grid } from "@mui/material";

const COLUMNS = [
  { key: "todo", title: "À faire" },
  { key: "doing", title: "En cours" },
  { key: "done", title: "Terminé" },
];

export default function Board() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    fetchTasks().then((res) => setTasks(res.data));
  }, []);

  const handleAddTask = (column, title) => {
    const newTask = {
      id: Date.now(),
      column,
      title,
    };
    setTasks([...tasks, newTask]);
  };

  const handleDeleteTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  return (
    <Grid container spacing={3}>
      {COLUMNS.map((col) => (
        <Grid item key={col.key}>
          <Column
            title={col.title}
            tasks={tasks.filter((task) => task.column === col.key)}
            onAddTask={(title) => handleAddTask(col.key, title)}
            onDeleteTask={handleDeleteTask}
          />
        </Grid>
      ))}
    </Grid>
  );
}
