import React from "react";
import { Router, Routes, Route } from "react-router-dom";
import Header from "./Header";
import NotFound from "./NotFound";
import CreateCard from "../components/CreateCard";
import DeckList from "../components/DeckList";
import DeckView from "../components/DeckView";
import EditCard from "../components/EditCard";

function Layout() {
  return (
    <Router>
      <Header />
      <div className="container">
        <Routes>
          <Route path="/" Component={DeckList} />
          <Route path="/decks/:deckId" Component={DeckView} />
          <Route path="/decks/:deckId/edit" Component={EditCard} />
          <Route path="/decks/:deckId/cards/new" Component={CreateCard} />
          <Route Component={NotFound} />
        </Routes>
        {/* TODO: Implement the screen starting here STATUS: STARTED
        Added Routes and Route for new components from insturctions*/}
        <NotFound />
      </div>
    </Router>
  );
}

export default Layout;
