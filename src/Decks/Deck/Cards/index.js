import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import NewCard from "./NewCard";
import EditCard from "./EditCard";

function Cards({ deck, setDecks }) {
  const match = useMatch("/decks/:deckId/cards/*");

  return (
    <>
      <Routes>
        <Route
          path={`${match.pathnameBase}/:cardId/edit`}
          element={<EditCard deck={deck} setDecks={setDecks} />}
        />
        <Route
          path={`${match.pathnameBase}/new`}
          element={<NewCard deck={deck} setDecks={setDecks} />}
        />
        <Route path="*" element={<h1>Not a valid URL!</h1>} />
      </Routes>
    </>
  );
}

export default Cards;
