import React, { useState } from "react";
import { DndContext, closestCenter } from "@dnd-kit/core";
import {
  SortableContext,
  horizontalListSortingStrategy,
} from "@dnd-kit/sortable";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  Typography,
  Button,
  TextField,
  Grid,
} from "@mui/material";
import Column from "./Column";

let columnIdCounter = 3;

export default function Board() {
  const [columns, setColumns] = useState([
    {
      id: "1",
      title: "À faire",
      cards: [
        {
          id: "c1",
          text: "Créer le Board",
          author: "Alice",
          createdAt: "2024-06-01T10:00:00",
        },
      ],
    },
    {
      id: "2",
      title: "En cours",
      cards: [
        {
          id: "c2",
          text: "Configurer MUI",
          author: "Bob",
          createdAt: "2024-06-02T15:30:00",
        },
      ],
    },
  ]);

  const [newColumnTitle, setNewColumnTitle] = useState("");
  const [selectedCard, setSelectedCard] = useState(null);

  const handleDragEnd = (event) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const updated = [...columns];
    let fromCol, toCol;
    updated.forEach((col) => {
      if (col.cards.find((c) => c.id === active.id)) fromCol = col;
      if (col.cards.find((c) => c.id === over.id)) toCol = col;
    });

    if (!fromCol || !toCol) return;

    const card = fromCol.cards.find((c) => c.id === active.id);
    fromCol.cards = fromCol.cards.filter((c) => c.id !== active.id);
    const overIndex = toCol.cards.findIndex((c) => c.id === over.id);
    toCol.cards.splice(overIndex, 0, card);

    setColumns(updated);
  };

  const handleAddColumn = () => {
    if (!newColumnTitle.trim()) return;

    const newCol = {
      id: `col-${columnIdCounter++}`,
      title: newColumnTitle,
      cards: [],
    };

    setColumns((prev) => [...prev, newCol]);
    setNewColumnTitle("");
  };

  const handleCardClick = (card) => {
    setSelectedCard(card);
  };

  const handleCloseDialog = () => {
    setSelectedCard(null);
  };

  const formatDate = (iso) => {
    const date = new Date(iso);
    return date.toLocaleString("fr-FR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" sx={{ mb: 2 }}>
        <Grid item xs={8}>
          <TextField
            fullWidth
            label="Nouvelle colonne"
            value={newColumnTitle}
            onChange={(e) => setNewColumnTitle(e.target.value)}
          />
        </Grid>
        <Grid item xs={4}>
          <Button fullWidth variant="contained" onClick={handleAddColumn}>
            Ajouter une colonne
          </Button>
        </Grid>
      </Grid>

      <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
        <SortableContext
          items={columns.map((col) => col.id)}
          strategy={horizontalListSortingStrategy}
        >
          <Grid container spacing={2}>
            {columns.map((column) => (
              <Grid item key={column.id}>
                <Column column={column} onCardClick={handleCardClick} />
              </Grid>
            ))}
          </Grid>
        </SortableContext>
      </DndContext>

      <Dialog open={!!selectedCard} onClose={handleCloseDialog}>
        <DialogTitle>Détails de la carte</DialogTitle>
        <DialogContent>
          <Typography variant="h6" gutterBottom>
            {selectedCard?.text}
          </Typography>
          <Typography variant="body2">
            🧑 Auteur : {selectedCard?.author}
          </Typography>
          <Typography variant="body2">
            📅 Créée le :{" "}
            {selectedCard ? formatDate(selectedCard.createdAt) : ""}
          </Typography>
        </DialogContent>
      </Dialog>
    </>
  );
}
