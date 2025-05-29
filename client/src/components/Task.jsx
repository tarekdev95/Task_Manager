import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function Task({ title, onDelete }) {
  return (
    <Card variant="outlined" sx={{ mb: 1 }}>
      <CardContent sx={{ display: "flex", justifyContent: "space-between" }}>
        <Typography>{title}</Typography>
        <IconButton onClick={onDelete} size="small">
          <DeleteIcon fontSize="small" />
        </IconButton>
      </CardContent>
    </Card>
  );
}
