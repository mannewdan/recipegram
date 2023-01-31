import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import Footer from "./components/Footer";
import useSearch from "./hooks/useSearch";

function App() {
  const { search, isGathering, recipes } = useSearch();

  return (
    <>
      <div className="root-container">
        <SideBar />

        <div className="main-container">
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
        </div>
      </div>
    </>
  );
}

export default App;
