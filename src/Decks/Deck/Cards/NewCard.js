import React from "react";
import Breadcrumb from "../../../Components/Breadcrumb";
import FormTemplate from "../../../Components/Forms/FormTemplate";
import LoadingMessage from "../../../Components/LoadingMessage";

function NewCard({ deck, setDecks }) {
    return deck?.id ? (
      <>
        <Breadcrumb navTitles={[deck.name, "Add Card"]} />
        <FormTemplate
          objToModify={{}}
          objType="Card"
          modifyType="Add"
          deckName={deck.name}
          setDecks={setDecks}
        />
      </>
    ) : (
      <LoadingMessage />
    );
  }
  
  export default NewCard;