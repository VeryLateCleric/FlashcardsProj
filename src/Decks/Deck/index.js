import React, { useEffect, useState } from "react";
import { Routes, Route, useParams } from "react-router-dom";
import DeckView from "./DeckView";
import EditDeck from "./EditDeck";
import StudyDeck from "./StudyDeck";
import Cards from "./Cards";
import { readDeck } from "../../utils/api";

function Deck({ decks, setDecks }) {
    const { deckId } = useParams();
  
    const [deck, setDeck] = useState([]);
  
    // Used to load current deck from our API
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
      return () => controller.abort(); // used for cleanup
    }, [deckId, decks]);
  
    return (
      <Routes>
        <Route path="study" element={<StudyDeck deck={deck} />} />
        <Route path="edit" element={<EditDeck deck={deck} setDecks={setDecks} />} />
        <Route path="cards/*" element={<Cards deck={deck} setDecks={setDecks} />} />
        <Route path="/" element={<DeckView deck={deck} setDecks={setDecks} />} />
        <Route path="*" element={<h1>Not a valid URL!</h1>} />
      </Routes>
    );
  }
  
  export default Deck;