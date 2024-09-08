import React, { useState } from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import LoadingMessage from "../../Components/LoadingMessage";
import { updateDeck } from "../../utils/api";
import { useNavigate } from "react-router-dom";

function EditDeck({ deck, setDecks }) {
  const [name, setName] = useState(deck?.name || "");
  const [description, setDescription] = useState(deck?.description || "");
  const navigate = useNavigate();

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

    updateDeck(updatedDeck)
      .then(() => {
        setDecks((prevDecks) =>
          prevDecks.map((d) => (d.id === updatedDeck.id ? updatedDeck : d))
        );
      })
      .then(() => {
        // Navigate to the deck, which now shows our update.
        navigate(`/decks/${deck.id}`);
      });
  };

  return deck?.id ? (
    <>
      <Breadcrumb navTitles={[deck.name, "Edit Deck"]} />
      <h1 className="h1">Edit deck</h1>
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
