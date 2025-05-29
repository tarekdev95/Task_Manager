import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  Button,
  TextField,
  Stack,
} from "@mui/material";
import CardItem from "./CardItem";

export default function Column({ column }) {
  const [cards, setCards] = useState(column.cards);
  const [newCardText, setNewCardText] = useState("");

  const handleAdd = () => {
    if (!newCardText.trim()) return;

    const newCard = {
      id: `card-${Date.now()}`,
      text: newCardText,
    };

    setCards((prev) => [...prev, newCard]);
    setNewCardText("");
  };

  return (
    <Card sx={{ width: 300, p: 2 }}>
      <CardContent>
        <Typography variant="h6" gutterBottom>
          {column.title}
        </Typography>

        <Stack spacing={2}>
          {cards.map((card) => (
            <CardItem key={card.id} card={card} />
          ))}

          <TextField
            label="Nouvelle carte"
            value={newCardText}
            onChange={(e) => setNewCardText(e.target.value)}
            fullWidth
          />

          <Button onClick={handleAdd} variant="outlined">
            ➕ Ajouter une carte
          </Button>
        </Stack>
      </CardContent>
    </Card>
  );
}
