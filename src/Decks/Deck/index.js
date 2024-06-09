import React, { useEffect, useState } from "react";
import { Routes, Route, useParams, useMatch } from "react-router-dom";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck";
import StudyDeck from "./StudyDeck";
import Cards from "./Cards";
import { readDeck } from "../../utils/api";

function Deck({ decks, setDecks }) {
    const match = useMatch("/decks/:deckId/*");
    const { deckId } = useParams();
  
    const [deck, setDeck] = useState([]);
  
    useEffect(() => {
      const controller = new AbortController(); // To abort old requests
  
      async function loadDeck() {
        readDeck(deckId, controller.signal)
          .then(setDeck)
          .catch((error) => {
            if (error.name !== "AbortError") throw error;
          });
      }
  
      loadDeck();
      return () => controller.abort(); // Cleanup
    }, [deckId, decks]);
  
    return (
      <>
        <Routes>
          <Route path={`${match.pathnameBase}/study`} element={<StudyDeck />} />
          <Route
            path={`${match.pathnameBase}/edit`}
            element={<EditDeck deck={deck} setDecks={setDecks} />}
          />
          <Route
            path={`${match.pathnameBase}/cards`}
            element={<Cards deck={deck} setDecks={setDecks} />}
          />
          <Route
            path={match.pathnameBase}
            element={<DeckView deck={deck} setDecks={setDecks} />}
          />
          <Route path="*" element={<h1>Not a valid URL!</h1>} />
        </Routes>
      </>
    );
  }
  
  export default Deck;