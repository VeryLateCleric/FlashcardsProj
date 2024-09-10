import React, { useEffect, useState } from "react";
import StudyCard from "./StudyCard";
import { useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import Breadcrumb from "../../chompponents/Breadcrumb";
import NotEnoughCards from "./NotEnoughCards";

function StudyDeck() {
  const { deckId } = useParams();
  const [deck, setDeck] = useState({});
  const cards = deck.cards;

  // Fetch the deck
  useEffect(() => {
    const controller = new AbortController();
    async function loadDeck() {
      readDeck(deckId, controller.signal)
        .then(setDeck) //Pulls deckId from readDeck
        .catch((error) => {
          if (error.name !== "AbortError") throw error;
        });
    }

    if (!cards) {
      loadDeck();
    }
    return () => controller.abort();
  }, [deckId, cards]);

  //We need to show a loading state while the deck is fetched.
  if (!deck || !cards) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <Breadcrumb navTitles={[deck.name || "Unknown Deck", "Study"]} />
      <h1 className="h1">Study : {deck.name}</h1>
      {cards.length < 3 ? (
        <NotEnoughCards cards={cards} />
      ) : (
        <StudyCard cards={deck.cards} />
      )}
    </>
  );
}

export default StudyDeck;
