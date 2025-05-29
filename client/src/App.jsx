import { Container, Typography } from "@mui/material";
import Board from "./components/Board";

export default function App() {
  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom align="center">
        taskmanager avec React + MUI
      </Typography>
      <Board />
    </Container>
  );
}
