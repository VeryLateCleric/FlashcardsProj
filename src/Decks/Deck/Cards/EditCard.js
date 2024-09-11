import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/Breadcrumb";
import LoadingMessage from "../../../Components/LoadingMessage";
import CardForm from "./CardForm";
import { listDecks, readCard, updateCard } from "../../../utils/api";

function EditCard({ deck, setDecks }) {
  const { cardId } = useParams();
  const navigate = useNavigate();
  
  // Set the initial state with details of existing cards
  const [card, setCard] = useState(null);
  // console.log("card", card);
  useEffect(() => {
    // fetch card
    readCard(cardId).then(setCard);
  }, [cardId]);

  const handleFrontChange = (event) => {
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
      <CardForm
        front={card.front}
        back={card.back}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        handleSubmit={handleSubmit}
        buttonText="Save"
      />
    </>
  ) : (
    <LoadingMessage />
  );
}
export default EditCard;
