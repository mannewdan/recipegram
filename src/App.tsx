import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";
import useSearch from "./hooks/useSearch";

function App() {
  const { search, isGathering, recipes } = useSearch();

  return (
    <>
      <main>
        <Routes>
          <Route
            path="/"
            element={
              <Search
                search={search}
                isGathering={isGathering}
                recipes={recipes}
              />
            }
          ></Route>
          <Route
            path="/favorites"
            element={<Favorites search={search} />}
          ></Route>
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
