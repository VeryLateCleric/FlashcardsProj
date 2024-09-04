import React, { useEffect, useState } from "react";
import StudyCard from "./StudyCard";

function StudyDeck({ deck }) {
  return (
    <div>
      <h1 className="blockquote">Study: {deck.name}</h1>
      <StudyCard cards={deck.cards} />
    </div>
  );
}

export default StudyDeck;
