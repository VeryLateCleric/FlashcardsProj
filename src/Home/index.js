import React from "react";
import DeckList from "./DeckList";

function Home({ decks, setDecks }) {
  return <DeckList decks={decks} setDecks={setDecks} />;
}

export default Home;
