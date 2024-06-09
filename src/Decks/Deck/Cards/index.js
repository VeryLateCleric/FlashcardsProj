import React from "react";
import { Routes, Route, useResolvedPath} from "react-router-dom";
import NewCard from "./NewCard";
import EditCard from "./EditCard";

function Cards({ deck, setDecks }) {
    const resolvedPath = useResolvedPath("");
    const currentPath = resolvedPath.pathname;

    return (
      <>
        <Routes>
            <Route path={`${path}/:cardId/edit`} element={<EditCard deck={deck} setDecks={setDecks} />} />
            <Route path={`${path}/new`} element={<NewCard deck={deck} setDecks={setDecks} />} />
            <Route path="*" element={<h1>Not a valid URL!</h1>} />
        </Routes>
      </>
    );
}

export default Cards;