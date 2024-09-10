import React from "react";
import { Link, useLocation } from "react-router-dom";

function CreateCardButton() {
  const location = useLocation();
  const currentPath = location.pathname;

  const path = currentPath.split("/").slice(0, 3).join("/");
  return (
    <>
      <Link className="mr-3" to={`${path}/cards/new`}>
        <button className="btn btn-info">
          <span
            className="oi oi-plus pr-2"
            title="plus"
            aria-hidden="true"
          ></span>
          Add Cards
        </button>
      </Link>
    </>
  );
}

export default CreateCardButton;
