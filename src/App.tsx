import { Routes, Route } from "react-router-dom";
import Search from "./pages/Search";

function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Search />}></Route>
      </Routes>
    </div>
  );
}

export default App;
