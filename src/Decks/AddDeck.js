import React, { useState } from "react";
import Breadcrumb from "../Components/Breadcrumb";

function AddDeck({ decks, setDecks }) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const newDeck = {
      id: decks.length + 1,
      name,
      description,
      cards: [],
    };
    setDecks([...decks, newDeck]);

    // Reset form
    setName("");
    setDescription("");
  };

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
