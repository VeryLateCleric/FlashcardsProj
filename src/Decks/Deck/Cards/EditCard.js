import React from "react";
import { useParams } from "react-router-dom";
import Breadcrumb from "../../../Components/Breadcrumb";
import FormTemplate from "../../../Components/Forms/FormTemplate";
import LoadingMessage from "../../../Components/LoadingMessage";

function EditCard({ deck, setDecks }) {
  const { cardId } = useParams();
  const card = deck?.cards?.find((card) => card.id === Number(cardId));

  return card ? (
    <>
      <Breadcrumb navTitles={[deck.name, `Edit Card ${card.id}`]} />
      <FormTemplate
        objToModify={card}
        objType="Card"
        modifyType="Edit"
        setDecks={setDecks}
      />
    </>
  ) : (
    <LoadingMessage />
  );
}
export default EditCard;
