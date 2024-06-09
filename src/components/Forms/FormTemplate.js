import React, { useState } from "react";
import { useNavigate, useMatch, useParams } from "react-router-dom";
import {
  createCard,
  createDeck,
  listDecks,
  updateCard,
  updateDeck,
} from "../../utils/api";
import FormField from "./FormField";

function FormTemplate({
  objToModify,
  objType,
  modifyType,
  deckName,
  decks,
  setDecks,
}) {
  //For the event handlers to navigate
  const navigate = useNavigate();
  const match = useMatch("/decks/:deckId/*");
  const { deckId } = useParams();

  //deckView is a match to valid URL path. Check if match is defined and has pnB property. Else default to empty string
  const deckViewURL = match?.pathnameBase || ("");

  //If component is given deckName as prop then add as deckName
  const deckHeading = deckName ? `${deckName}: ` : null;

  //"Done" when adding, but "Cancel" when editing
  const cancelType = modifyType === "Add" ? "Done" : "Cancel";
  //"Save" when adding, but "Submit" when editing
  const submitType = modifyType === "Add" ? "Save" : "Submit";

  //Deck and Card have unique placeholders for each form
  const firstPlaceholder =
    objType === "Deck" ? "Deck Name" : "Front side of card";
  const secondPlaceholder =
    objType === "Deck" ? "Brief description of the deck" : "Back side of card";

  //Default state is empty when adding, but is the current data when editing.
  const defaultFormState =
    modifyType === "Add"
      ? //When Adding...
        objType === "Deck"
        ? { name: "", description: "" } //Add Empty Deck for Deck
        : { front: "", back: "" } //Add Empty Card for Card
      : //When Editing...
      objType === "Deck"
      ? { name: objToModify.name, description: objToModify.description } //Deck name & Description for Deck
      : { front: objToModify.front, back: objToModify.back }; //Card front & back for Card

  //State control Object that holds key value pair corresponding to each forms input variables
  const [formData, setFormData] = useState(defaultFormState);

  //Changes the formData Object to be a copy of the existing object, but overrides the name key to be the value user inputted
  const formChangeHandler = ({ target: { name, value } }) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  //   Add cancel handler. When add new deck, return home. When edit deck, return to DeckView.
  // When add new card, return to DeckView. When Edit Old Card, return to DeckView.

  const cancelHandler = () => {
    setFormData(defaultFormState);
    if (objType === "Deck" && modifyType === "Add") navigate("/");
    else navigate(deckViewURL);
  };

  // Submit Type Handler
  // First submission type will be editing.
  const editSubmitHandler = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    //objType determines if we are editing a Deck or a Card
    objType === "Deck" ? editDeck(controller) : editCard(controller);
  };

  // When we edit Deckwe require name and description keys
  function editDeck({ signal }) {
    const newDeck = {
      ...objToModify,
      name: formData.name,
      description: formData.description,
    };
    updateDeck(newDeck, signal).then(() => updateDecks(signal));
  }

  //Editing Card requires front and back key, as well as the updateCard utility API call
  function editCard({ signal }) {
    const newCard = {
      ...objToModify,
      front: formData.front,
      back: formData.back,
    };
    updateCard(newCard, signal).then(() => updateDecks(signal));
  }
  // Call in all Submit Handlers. Whenever objects are modified, the root deck variable will need to be modified
  // This means we will be able to re-render all objects after each req is sent through handler.
  function updateDecks(signal) {
    listDecks(signal)
      .then(setDecks)
      .catch((error) => {
        if (error.name !== "AbortError") throw error;
      })
      .then(() => {
        //Reset the forms
        setFormData(defaultFormState);

        //Adding new card goes nowhere
        if (objType === "Card" && modifyType === "Add") return null;

        //All other formTypes send the user to deckView
        if (!deckId)
          //if there is no deckId param, it's because we are adding a deck: {BASE_UR:}/decks/new
          //so we can just grab the id of the last deck in decks in the place of the deckId param
          navigate(
            deckViewURL
              .split("/")
              .slice(0, 2)
              .join("/")
              .concat(`/${decks[decks.length - 1].id + 1}`)
          );
        else navigate(deckViewURL);
      });
  }

  //   Adding Decks and Cards
  // We adding, we need to determine if we are adding a deck or card with ObjType
  const addSubmitHandler = (event) => {
    event.preventDefault();
    const controller = new AbortController();
    objType === "Deck" ? addDeck(controller) : addCard(controller);
  };

  // require same as editDeck, need name and description keys
  function addDeck({ signal }) {
    const newDeck = { name: formData.name, description: formData.description };
    createDeck(newDeck, signal).then(() => updateDecks(signal));
  }

  //   Just like editCard, require front and back keys and util api call
  function addCard({ signal }) {
    const newCard = {
      front: formData.front,
      back: formData.back,
    };
    createCard(deckId, newCard, signal).then(() => updateDecks(signal));
  }

  return (
    <>
      <h1 className="h1">
        {deckHeading}
        {modifyType} {objType}
      </h1>
      <form
        onSubmit={modifyType === "Add" ? addSubmitHandler : editSubmitHandler}
      >
        <FormField
          inputType={objType === "Deck" ? "text" : "textarea"}
          name={objType === "Deck" ? "name" : "front"}
          placeholder={firstPlaceholder}
          value={objType === "Deck" ? formData.name : formData.front}
          formChangeHandler={formChangeHandler}
        />
        <FormField
          inputType="textarea"
          name={objType === "Deck" ? "description" : "back"}
          placeholder={secondPlaceholder}
          value={objType === "Deck" ? formData.description : formData.back}
          formChangeHandler={formChangeHandler}
        />
        <div>
          <button
            className="btn btn-secondary mr-2"
            type="button"
            onClick={cancelHandler}
          >
            {cancelType}
          </button>
          <button className="btn btn-primary mr-2" type="submit">
            {submitType}
          </button>
        </div>
      </form>
    </>
  );
}
export default FormTemplate;
