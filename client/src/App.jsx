// src/App.jsx
import React from "react";
import Board from "./components/Board";
import { CssBaseline, Container, Typography } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Typography variant="h4" gutterBottom>
          📝TaskManager
        </Typography>
        <Board />
      </Container>
    </>
  );
}

export default App;
