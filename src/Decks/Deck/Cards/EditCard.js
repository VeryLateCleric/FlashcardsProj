import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../chompponents/Breadcrumb";
import LoadingMessage from "../../../chompponents/LoadingMessage";
import { eventWrapper } from "@testing-library/user-event/dist/utils";
import { listDecks, readCard, updateCard } from "../../../utils/api";

function EditCard({ deck, setDecks }) {
  const { cardId } = useParams();
  const navigate = useNavigate();
  // const card = deck?.cards?.find((card) => card.id === Number(cardId));

  // Set the initial state with details of existing cards
  // const [front, setFront] = useState(card?.front || "");
  // const [back, setBack] = useState(card?.back || "");
  const [card, setCard] = useState({});
  console.log("card", card);
  useEffect(() => {
    // fetch card
    readCard(cardId).then(setCard);
  }, [cardId]);

  const handleFrontChange = (event) => {
    // setFront(event.target.value);
    setCard({ ...card, front: event.target.value });
  };

  const handleBackChange = (event) => {
    setCard({ ...card, back: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const controller = new AbortController();

    const updatedCard = { ...card };

    //Update state with modified deck
    updateCard(updatedCard, controller.signal)
      .then(() => {
        listDecks(controller.signal)
          .then(setDecks)
          .catch((error) => {
            if (error.name !== "AbortError") throw error;
          });
      })
      .then(() => {
        // Redirect to deck view
        navigate(`/decks/${deck.id}`);
      })
      .catch((error) => {
        if (error.name !== "AbortError") throw error;
      });
  };

  return card ? (
    <>
      <Breadcrumb navTitles={[deck.name, `Edit Card ${card.id}`]} />
      <h1 className="h1">Edit card</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="front">Front</label>
          <textarea
            id="front"
            value={card.front}
            onChange={handleFrontChange}
            required
          />
        </div>
        <div>
          <label htmlFor="back">Back</label>
          <textarea
            id="back"
            value={card.back}
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
