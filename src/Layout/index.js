import React, { useEffect, useState } from "react";
import { Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import { listDecks } from "../utils/api"
import Home from "../Home"
import Decks from "../Decks";

function Layout() {
  // useState of decks as variable array for each of the decks
  const [decks, setDecks] = useState([]);

  // Load list of all decks from API
  useEffect(() => {
    const controller = new AbortController();

    async function loadDecks() {
      listDecks(controller.signal)
        .then(setDecks)
        .catch((error) => {
        if (error.name !== "AbortError") throw error;
      })
    }
    loadDecks();
    return () => controller.abort();
  }, []);

  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" element={<Home decks={decks} setDecks={setDecks} />} />
          <Route path="/decks/*" element={<Decks decks={decks} setDecks={setDecks} />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default Layout;
