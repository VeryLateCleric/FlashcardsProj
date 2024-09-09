import React from "react";
import { Link } from "react-router-dom";

function CreateDeckButton() {
  return (
    <Link to="/decks/new">
      <button type="button" className="btn btn-secondary mb-3 btn-sm">
        <span className="oi oi-plus" /> Create Deck
      </button>
    </Link>
  );
}

export default CreateDeckButton;
