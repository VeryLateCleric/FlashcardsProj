import React, { useEffect, useState } from "react";
import CreateCardButton from "../Components/Buttons/CreateCardButton"; 
import LoadingMessage from "../Components/LoadingMessage";
import DeckListItem from "./DeckListItem";

function DeckList({ decks, setDecks }) {
  //useState variable to store an array of components
  const [deckList, setDeckList] = useState([]);

  //Update deckList whenever there is a change to decks or setDecks
  useEffect(() => {
    //map through every deck in decks to create a DeckListItem for each.
    setDeckList(
      decks.map((deck, key) => (
        <DeckListItem key={key} deck={deck} setDecks={setDecks} />
      ))
    );
  }, [decks, setDecks]);

  //If deckList exists with non-zero length, render. Else show LoadingMessage
  return deckList?.length ? (
    <>
      <CreateCardButton />
      <div className="list-group">{deckList}</div>
    </>
  ) : (
    <LoadingMessage />
  );
}

export default DeckList;
