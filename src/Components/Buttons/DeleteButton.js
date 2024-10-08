import React from "react";
import { useNavigate } from "react-router-dom";
import { deleteCard, deleteDeck, listDecks } from "../../utils/api";

function DeleteButton({ objToDelete, objType, setDecks }) {
  const navigate = useNavigate();
  //Event Handler to Delete specified object
  function handleDelete() {
    if (
      window.confirm(
        `Delete this ${objType}?\n\nYou will not be able to recover it.`
      )
    ) {
      const controller = new AbortController(); //to abort old requests
      async function deleteObject() {
        //Distinguish the type of delete
        objType === "deck"
          ? deleteDeck(objToDelete.id) //deleteDeck if it's a Deck
              .then(() => updateDecks(controller))
              .then(() => navigate("/"))
          : deleteCard(objToDelete.id) //deleteCard if it's a Card
              .then(() => updateDecks(controller));
      }
      deleteObject();
      return () => controller.abort(); //cleanup
    }
    //if we cancel, then go home without deleting
    else navigate("/");
  }

  function updateDecks({ signal }) {
    listDecks(signal)
      .then(setDecks)
      .catch((error) => {
        if (error.name !== "AbortError") throw error;
      });
  }

  return (
    <button className="btn btn-danger" onClick={() => handleDelete()}>
      <span
        className="oi oi-trash pr-1"
        title="w"
        aria-hidden="true"
      ></span>
      Delete
    </button>
  );
}

export default DeleteButton;
