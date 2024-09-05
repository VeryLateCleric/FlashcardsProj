import React, { useEffect, useState } from "react";
import CardListItem from "./CardListItem";

//useState variable to store array of CardList components
function CardList({ cards, setDecks }) {
  const [cardList, setCardList] = useState([]);

  //Update cardList whenever there is a change to cards
  useEffect(() => {
    setCardList(
      cards?.map((card, key) => (
        <CardListItem key={key} card={card} setDecks={setDecks} />
      ))
    );
  }, [cards, setDecks]);

  return <div className="list-group">{cardList}</div>;
}

export default CardList;
