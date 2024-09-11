import React from "react";
import { Routes, Route } from "react-router-dom";
import CardForm from "./CardForm";
import NewCard from "./NewCard";
import EditCard from "./EditCard";

function Cards({ deck, setDecks }) {
  return (
    <Routes>
      <Route path=":cardId/edit" element={<EditCard deck={deck} setDecks={setDecks} />} />
      <Route path="new" element={<NewCard deck={deck} setDecks={setDecks} />} />
      <Route path="*" element={<h1>Not a valid URL!</h1>} />
    </Routes>
  );
}

export default Cards;
