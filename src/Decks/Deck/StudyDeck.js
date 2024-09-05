import React, { useEffect, useState } from "react";
import StudyCard from "./StudyCard";
import { useNavigate, useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";

function StudyDeck() {
  const { deckId } = useParams;
  const [deck, setDeck] = useState(null);
  const [currentCard, setCurrentCard] = useState(false);
  const [flipped, setFlipped] = useState(false);
  const navigate = useNavigate();

  // Fetch the deck
  useEffect(() => {
    const controller = new AbortController();
    async function loadDeck() {
      try {
        const loadedDeck = await readDeck(deckId, controller.signal);
        setDeck(loadedDeck);
        setCurrentCard(loadedDeck.cards[0]); //Sets to the first card
      } catch (error) {
        console.error("Failed to load deck:", error);
      }
    }

    loadDeck();
    return () => controller.abort();
  }, [deckId]);

  const flipHandler = () => setFlipped(!flipped);
  const nextHandler = () => {
    const cardIndex = deck.cards.indexOf(currentCard);

    if (cardIndex < deck.cards.length - 1) {
      setFlipped(false); // Show front on start
      setCurrentCard(deck.cards[cardIndex + 1]);
    } else {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page"
        )
      ) {
        setCurrentCard(deck.cards[0])
        setFlipped(false)
      } else {
        navigate("/"); //Return to home if 'cancel' pressed'
      }
    }
  };

  return (
    <div>
      <h1 className="blockquote">Study: {deck.name}</h1>
      <StudyCard cards={deck.cards} />
    </div>
  );
}

export default StudyDeck;
