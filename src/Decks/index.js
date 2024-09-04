import React from "react";
import { Routes, Route } from "react-router-dom";
import Deck from "./Deck";
import AddDeck from "./AddDeck";

function Decks({ decks, setDecks }) {

  return (
    <>
      <Routes>
        <Route path={"new"} element={<AddDeck setDecks={setDecks} />} />
        <Route path={":deckId/*"} element={<Deck decks={decks} setDecks={setDecks} />} />
        <Route path="*" element={<h1>Not a valid URL!</h1>} />
      </Routes>
    </>
  );
}

export default Decks;