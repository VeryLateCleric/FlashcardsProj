import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import LoadingMessage from "../../Components/LoadingMessage";

function EditDeck({ deck, setDecks }) {
  const [name, setName] = useState(deck?.name || "");
  const [description, setDescription] = useState(deck?.description || "");

  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const handleDescriptionChange = (event) => {
    setDescription(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    // Update the deck with the new details
    const updatedDeck = { ...deck, name, description };
    setDecks((prevDecks) =>
      prevDecks.map((d) => (d.id === updatedDeck.id ? updatedDeck : d))
    );
    
  };

  return deck?.id ? (
    <>
      <Breadcrumb navTitles={[deck.name, "Edit Deck"]} />
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="name">Deck Name</label>
          <input
            id="name"
            type="text"
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
        <button type="submit">Save</button>
      </form>
    </>
  ) : (
    <LoadingMessage />
  );
}

export default EditDeck;
