import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/Breadcrumb";
import LoadingMessage from "../../../Components/LoadingMessage";

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

    // Create a new card
    const newCard = {
      id: setDecks.card.length + 1, //
      front,
      back,
    };

    // Add the new card to the deck
    const updatedDeck = {
      ...deck,
      cards: [...deck.cards, newCard],
    };

    // Update the state with the modified deck
    setDecks((prevDecks) =>
      prevDecks.map((d) => (d.id === updatedDeck.id ? updatedDeck : d))
    );

    // Redirect to the deck view or another relevant page
    navigate(`/decks/${deck.id}`);
  };

  return deck ? (
    <>
      <Breadcrumb navTitles={[deck.name, "New Card"]} />
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