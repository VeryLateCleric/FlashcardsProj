import React from "react";
import { useMatch } from "react-router-dom";
import DeleteButton from "../../Components/Buttons/DeleteButton";
import EditButton from "../../Components/Buttons/EditButton";

function CardListItem({ card, setDecks }) {
  const { url } = useMatch();
  return (
    <div className="list-group-item">
      <div className="row">
        <div className="col">
          <h4 className="h4">Front</h4>
          <p className="">{card.front}</p>
        </div>
        <div className="col">
          <h4 className="h4">Back</h4>
          <p className="">{card.back}</p>
        </div>
      </div>

      <div className="row justify-content-end">
        <EditButton path={`${url}/cards/${card.id}`} />
        <DeleteButton objToDelete={card} objType="card" setDecks={setDecks} />
      </div>
    </div>
  );
}

export default CardListItem;
