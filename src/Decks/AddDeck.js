import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { createDeck, listDecks } from "../utils/api";
import Breadcrumb from "../Components/Breadcrumb";

function AddDeck({ setDecks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const controller = new AbortController();

    async function makeNewDeck() {
      const newDeck = {
        name,
        description,
      };
      const { id } = await createDeck(newDeck, controller.signal);
      await updateDecks(controller);
      navigate(`/decks/${id}`);
    }
    makeNewDeck();
    return () => controller.abort();
  };

  function updateDecks({ signal }) {
    listDecks(signal)
      .then(setDecks)
      .catch((error) => {
        if (error.name !== "AbortError") throw error;
      });
  }

  return (
    <>
      <Breadcrumb navTitles={["Create Deck"]} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Deck Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={handleNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            value={description}
            onChange={handleDescriptionChange}
            required
          />
        </div>
        <button type="submit">Create Deck</button>
      </form>
    </>
  );
}

export default AddDeck;
