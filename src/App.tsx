import { Routes, Route } from "react-router-dom";
import SideBar from "./components/SideBar";
import Feed from "./pages/Feed";
import Search from "./pages/Search";
import Favorites from "./pages/Favorites";
import History from "./pages/History";
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
              <Route path="/" element={<Feed />}></Route>
              <Route
                path="/search"
                element={
                  <Search
                    search={search}
                    isGathering={isGathering}
                    recipes={recipes}
                  />
                }
              ></Route>
              <Route path="/favorites" element={<Favorites />}></Route>
              <Route path="/history" element={<History />}></Route>
            </Routes>
          </main>

          <Footer />
        </div>
      </div>
    </>
  );
}

export default App;
