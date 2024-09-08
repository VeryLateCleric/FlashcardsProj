import React, { useEffect, useState } from "react";
import CardListItem from "./CardListItem";

//useState variable to store array of CardList components
function CardList({ cards, setDecks }) {
  const cardList = cards?.map((card, key) => (
    <CardListItem key={key} card={card} setDecks={setDecks} />
  ));

  return <div className="list-group">{cardList}</div>;
}

export default CardList;
