import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { readDeck } from "../../utils/api";
import NotEnoughCards from "./NotEnoughCards";
import Breadcrumb from "../../Components/Breadcrumb";

function StudyCard({ cards }) {
  const [flipped, setFlipped] = useState(false);
  const [card, setCard] = useState(cards[0]);
  const navigate = useNavigate();

  const flipHandler = () => setFlipped(!flipped);

  const nextHandler = () => {
    const cardIndex = cards.indexOf(card);
    // set card index to control cyling through all cards
    if (cardIndex < cards.length - 1) {
      setFlipped(false); // Show front on start
      setCard(cards[cardIndex + 1]);
    } else {
      if (
        window.confirm(
          "Restart cards? Click 'cancel' to return to the home page."
        )
      ) {
        setCard(cards[0]); //set back to first card
        setFlipped(false); //reset flipped status
      } else {
        navigate("/"); //Return to home page if 'cancel' pressed
      }
    }
  };

  return (
    <div className="card">
        <div className="card-body">
          <h5 className="card-title">
            Card {cards.indexOf(card) + 1} of {cards.length}
          </h5>
          <p className="card-text">
            {flipped ? card.back : card.front}
          </p>
          <button onClick={flipHandler} className="btn btn-secondary">
            Flip
          </button>
          {flipped && (
            <button className="btn btn-primary" onClick={nextHandler}>
              Next
            </button>
          )}
        </div>
      </div>
  );
}

export default StudyCard;
