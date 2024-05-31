import React from "react";
import { Routes, Route, useMatch } from "react-router-dom";
import Deck from "./Deck";
import AddDeck from "./AddDeck";

function Decks({ decks, setDecks }) {
  const { url } = useMatch();

  return (
    <>
      <Routes>
        <Route path={`${url}/new`} element={<AddDeck decks={decks} setDecks={setDecks} />} />
        <Route path={`${url}/:deckId`} element={<Deck decks={decks} setDecks={setDecks} />} />
        <Route path="*" element={<h1>Not a valid URL!</h1>} />
      </Routes>
    </>
  );
}

export default Decks;