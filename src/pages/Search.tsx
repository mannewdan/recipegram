import React from "react";
import useSearch from "../hooks/useSearch";

export default function Search() {
  const { search, isGathering, recipes } = useSearch();
  const [query, setQuery] = React.useState("");

  console.log(recipes);

  const recipeEls = recipes.map((r) => {
    return (
      <div key={r.id} className="recipe">
        <div className="recipe__title">
          <h3>{r.name}</h3>
        </div>

        <img src={r.imageURL}></img>

        <div className="recipe__details">
          <div className="recipe__details--ingredients">
            <h4>Ingredients</h4>
            <ul>
              {r.ingredients.map((item) => (
                <li>{item}</li>
              ))}
            </ul>
          </div>

          <div className="recipe__details--instructions">
            <h4>Instructions</h4>
            {r.instructions && (
              <ol>
                {r.instructions.map((item) => (
                  <li>{item.step}</li>
                ))}
              </ol>
            )}

            {!r.instructions && (
              <p>No instructions provided. Figure it out yourself!</p>
            )}
          </div>
        </div>
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
      {!isGathering && <div className="recipe-container">{recipeEls}</div>}
    </div>
  );
}
