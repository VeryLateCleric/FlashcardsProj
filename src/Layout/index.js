import React from "react";
import Header from "./Header";
import NotFound from "./NotFound";

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
    <Router>
      <Header />
      <div className="container">
        {/* TODO: Implement the screen starting here */}
        <NotFound />
      </div>
    </Router>
  );
}

export default Layout;
