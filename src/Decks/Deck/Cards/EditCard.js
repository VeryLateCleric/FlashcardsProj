import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/Breadcrumb";
import LoadingMessage from "../../../Components/LoadingMessage";
import { eventWrapper } from "@testing-library/user-event/dist/utils";

function EditCard({ deck, setDecks }) {
  const { cardId } = useParams();
  const navigate = useNavigate();
  const card = deck?.cards?.find((card) => card.id === Number(cardId));

  // Set the initial state with details of existing cards
  const [front, setFront] = useState(card?.front || "");
  const [back, setBack] = useState(card?.back || "");

  const handleFrontChange = (event) => {
    setFront(event.target.value)
  }

  const handleBackChange = (event) => {
    setBack(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault();

    const updatedCard = { ...card, front, back };

    //Update state with modified deck
    setDecks((prevDecks) =>
      prevDecks.map((deck) => (deck.id === updatedCard.deckId ? updatedCard : card))
    );

    // Redirect to deck view
    navigate(`/decks/${deck.id}`);
  }

  return card ? (
    <>
      <Breadcrumb navTitles={[deck.name, `Edit Card ${card.id}`]} />
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
        <button type="submit">Save</button>
      </form>
    </>
  ) : (
    <LoadingMessage />
  );
}
export default EditCard;
