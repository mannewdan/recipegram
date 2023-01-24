import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <main>
        <Routes>
          <Route path="/" element={<Search />}></Route>
        </Routes>
      </main>

      <Footer />
    </>
  );
}

export default App;
