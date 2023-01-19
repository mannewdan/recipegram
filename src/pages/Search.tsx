import React from "react";
import useSearch from "../hooks/useSearch";

export default function Search() {
  const { search, isGathering, recipes } = useSearch();
  const [query, setQuery] = React.useState("");

  console.log(recipes);

  const recipeEls = recipes.map((r) => {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: "400px",
          marginBottom: "20px",
        }}
      >
        <h3>{r.name}</h3>
        <span>From {r.sourceName}</span>
        <img src={r.imageURL}></img>
      </div>
    );
  });

  return (
    <div>
      <h1>Find Recipes</h1>
      <input
        type="text"
        onChange={(e) => setQuery(e.target.value)}
        onKeyDown={(e) => {
          if (e.key == "Enter") search(query);
        }}
        placeholder="What are you hungry for?"
      ></input>
      <button onClick={() => search(query)}>Search</button>
      <hr></hr>
      <span>Search Results: </span>
      <br></br>

      {isGathering && <span>Searching...</span>}
      {!isGathering && recipeEls}
    </div>
  );
}
