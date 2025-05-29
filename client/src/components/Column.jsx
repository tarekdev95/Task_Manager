import { useState } from "react";
import { Paper, Typography, TextField, Button, Box } from "@mui/material";
import Task from "./Task";

export default function Column({ title, tasks, onAddTask, onDeleteTask }) {
  const [newTask, setNewTask] = useState("");

  const handleAdd = () => {
    if (newTask.trim()) {
      onAddTask(newTask);
      setNewTask("");
    }
  };

  return (
    <Paper elevation={3} sx={{ p: 2, minHeight: 300, width: 300 }}>
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      {tasks.map((task) => (
        <Task
          key={task.id}
          title={task.title}
          onDelete={() => onDeleteTask(task.id)}
        />
      ))}
      <Box mt={2} display="flex" gap={1}>
        <TextField
          size="small"
          variant="outlined"
          label="Nouvelle tâche"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          fullWidth
        />
        <Button variant="contained" onClick={handleAdd}>
          Ajouter
        </Button>
      </Box>
    </Paper>
  );
}
