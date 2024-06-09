import React, { useEffect, useState } from "react";
import { useMatch } from "react-router-dom";
import CreateCardButton from "../../Components/Buttons/CreateCardButton";
import DeleteButton from "../../Components/Buttons/DeleteButton";
import EditButton from "../../Components/Buttons/EditButton";
import StudyButton from "../../Components/Buttons/StudyButton";
import Breadcrumb from "../../Components/Breadcrumb";
import LoadingMessage from "../../Components/LoadingMessage";
import CardList from "./CardList";

function DeckView({ deck, setDecks }) {
  const { url } = useMatch(); //Grab the url for the for each button's path

  const [cards, setCards] = useState([]);

  //Update cards array whenever there is a change to it's parent component's deck object
  useEffect(() => {
    setCards(deck?.cards);
  }, [deck]);

  return deck?.name && cards ? (
    <>
      <Breadcrumb navTitles={[deck.name]} />

      <h2 className="h2">{deck.name}</h2>
      <p className="tg-text-light">{deck.description}</p>

      <div className="row justify-content-between mb-5 px-3">
        <div>
          <EditButton path={url} />
          <StudyButton path={url} />
          <CreateCardButton />
        </div>
        <div>
          <DeleteButton objToDelete={deck} objType="deck" setDecks={setDecks} />
        </div>
      </div>

      <h2 className="h2">Cards</h2>

      <CardList cards={cards} setDecks={setDecks} />
    </>
  ) : (
    <LoadingMessage />
  );
}

export default DeckView;
