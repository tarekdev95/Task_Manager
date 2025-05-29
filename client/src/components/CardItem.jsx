import React from "react";
import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Card, CardContent, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

export default function CardItem({ card, onDeleteCard }) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: card.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    marginBottom: "8px",
    cursor: "grab",
    position: "relative",
  };

  return (
    <div ref={setNodeRef} {...attributes} {...listeners} style={style}>
      <Card
        variant="outlined"
        sx={{ bgcolor: "#e3f2fd", position: "relative" }}
      >
        <CardContent>
          <Typography>{card.text}</Typography>
          <IconButton
            size="small"
            onClick={onDeleteCard}
            sx={{ position: "absolute", top: 4, right: 4 }}
          >
            <DeleteIcon fontSize="small" />
          </IconButton>
        </CardContent>
      </Card>
    </div>
  );
}
