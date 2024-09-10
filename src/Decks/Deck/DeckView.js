import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import CreateCardButton from "../../chompponents/Buttons/CreateCardButton";
import DeleteButton from "../../chompponents/Buttons/DeleteButton";
import EditButton from "../../chompponents/Buttons/EditButton";
import StudyButton from "../../chompponents/Buttons/StudyButton";
import Breadcrumb from "../../chompponents/Breadcrumb";
import LoadingMessage from "../../chompponents/LoadingMessage";
import CardList from "./CardList";

function DeckView({ deck, setDecks }) {
  const location = useLocation(); //Grab the url for the for each button's path
  const currentPath = location.pathname;

  return deck?.name ? (
    <>
      <Breadcrumb navTitles={[deck.name]} />

      <h2 className="h2">{deck.name}</h2>
      <p className="tg-text-light">{deck.description}</p>

      <div className="row justify-content-between mb-5 px-3">
        <div>
          <EditButton path={currentPath} />
          <StudyButton path={currentPath} deck={deck} />
          <CreateCardButton />
        </div>
        <div>
          <DeleteButton objToDelete={deck} objType="deck" setDecks={setDecks} />
        </div>
      </div>

      <h2 className="h2">Cards</h2>

      <CardList cards={deck?.cards} setDecks={setDecks} />
    </>
  ) : (
    <LoadingMessage />
  );
}

export default DeckView;
