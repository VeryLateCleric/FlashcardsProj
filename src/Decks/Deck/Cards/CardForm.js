import React from "react";

function CardForm({ front, back, handleFrontChange, handleBackChange, handleSubmit }) {
  return (
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
  );
}

export default CardForm;