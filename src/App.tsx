import React from "react";
import useSearch from "./hooks/useSearch";

function App() {
  const { search, isGathering, recipes } = useSearch();

  React.useEffect(() => {
    search("apple");
  }, []);

  console.log(recipes);

  return (
    <div>
      <h1>{"" + isGathering}</h1>
    </div>
  );
}

export default App;
