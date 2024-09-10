import React from "react";
import { useLocation } from "react-router-dom";
import CreateCardButton from "../../chompponents/Buttons/CreateCardButton";

function NotEnoughCards({ cards }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <>
      <h2 className="h2">Not enough cards.</h2>
      <p className="tg-text-light">
        You need at least 3 cards to study. There are only {cards.length} cards
        in your deck. Please add more cards and try again.
      </p>
      <CreateCardButton path={currentPath} />
    </>
  );
}

export default NotEnoughCards;
