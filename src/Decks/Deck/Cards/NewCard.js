import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Breadcrumb from "../../../Components/Breadcrumb";
import LoadingMessage from "../../../Components/LoadingMessage";
import CardForm from "./CardForm";
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
        back,
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

  return deck ? (
    <>
      <Breadcrumb navTitles={[deck.name, "Add Card"]} />
      <CardForm
        front={front}
        back={back}
        handleFrontChange={handleFrontChange}
        handleBackChange={handleBackChange}
        handleSubmit={handleSubmit}
        buttonText="Create Card"
      />
    </>
  ) : (
    <LoadingMessage />
  );
}

export default NewCard;
