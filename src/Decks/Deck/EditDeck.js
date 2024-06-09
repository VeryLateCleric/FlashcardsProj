import React from "react";
import Breadcrumb from "../../Components/Breadcrumb";
import FormTemplate from "../../Components/Forms/FormTemplate";
import LoadingMessage from "../../Components/LoadingMessage";

function EditDeck({ deck, setDecks }) {
  return deck?.id ? (
    <>
      <Breadcrumb navTitles={[deck.name, "Edit Deck"]} />
      <FormTemplate
        objToModify={deck}
        objType="Deck"
        modifyType="Edit"
        setDecks={setDecks}
      />
    </>
  ) : (
    <LoadingMessage />
  );
}
export default EditDeck;
