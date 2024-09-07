import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/Breadcrumb";
import LoadingMessage from "../../../Components/LoadingMessage";
import { createCard, listDecks } from "../../../utils/api";

function NewCard({ deck, setDecks }) {
  const navigate = useNavigate();
  const [front, setFront] = useState("");
  const [back, setBack] = useState("");

  const handleFrontChange = (event) => {
    setFront(event.target.value);
  };

  const handleBackChange = (event) => {
    setBack(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const controller = new AbortController();

    async function makeNewCard() {
      const newCard = {
        front,
        back
      };
      await createCard(deck.id, newCard, controller.signal);
      await updateDecks(controller);
      navigate(`/decks/${deck.id}`);
    }
    makeNewCard();
    return () => controller.abort();
  };

  function updateDecks({ signal }) {
    listDecks(signal)
      .then(setDecks)
      .catch((error) => {
        if (error.name !== "AbortError") throw error;
      });
  }


  // // Create a new card (deckId, card, signal)
  // async function addCard(deckId, card, signal) {
  // const newCard = {
  //   deckId,
  //   front,
  //   back
  // };
  // await createCard();
  
  return deck ? (
    <>
      <Breadcrumb navTitles={[deck.name, "Add Card"]} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            value={front}
            onChange={handleFrontChange}
            required
          />
        </div>
        <div>
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            value={back}
            onChange={handleBackChange}
            required
          />
        </div>
        <button type="submit">Create Card</button>
      </form>
    </>
  ) : (
    <LoadingMessage />
  );
}
  
  export default NewCard;