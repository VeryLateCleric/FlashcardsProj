import React, { useEffect, useState } from "react";
import StudyCard from "./StudyCard";
import { useParams } from "react-router-dom";
import { readCard, readDeck } from "../../utils/api";
import Breadcrumb from "../../Components/Breadcrumb";
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

    console.log(deck, cards);
    if (!cards) {
      loadDeck();
    }
    return () => controller.abort();
  }, [deckId, cards]);

  //We need to show a loading state while the deck is fetched.
  if (!deck || !cards) {
    return <p>Loading...</p>;
  }

  // Case for too few cards, handled by NotEnoughCards
  if (cards.length < 3) {
    return <NotEnoughCards cards={cards} />;
  }

  return (
    <>
      <Breadcrumb navTitles={[deck.name || "Unknown Deck", "Study"]} />
      <h5>Study : {deck.name}</h5>
      <StudyCard cards={deck.cards} />
    </>
  );
}

export default StudyDeck;
