import React from "react";
import Breadcrumb from "../Components/Breadcrumb";
import FormTemplate from "../Components/Forms/FormTemplate";

function NewDeck({ decks, setDecks }) {
  return (
    <>
      <Breadcrumb navTitles={["Create Deck"]} />
      <FormTemplate
        objToModify={{}}
        objType="Deck"
        modifyType="Add"
        decks={decks}
        setDecks={setDecks}
      />
    </>
  );
}

export default NewDeck;
