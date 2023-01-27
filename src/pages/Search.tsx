import React from "react";
import useSearch from "../hooks/useSearch";
import useStickyScroll from "../hooks/useStickyScroll";
import Recipe from "../components/Recipe";

export default function Search() {
  const { search, isGathering, recipes } = useSearch();
  const [query, setQuery] = React.useState("");
  const [sortSelection, setSortSelection] = React.useState("popularity");
  const { positionMode, positionOffset, transitionSpeed } =
    useStickyScroll(135);

  const recipeEls = recipes.map((r) => {
    return <Recipe key={r.id} recipe={r} />;
  });
  return (
    <div>
      <div className="search-container">
        <div
          style={{
            position: positionMode === "fixed" ? "fixed" : "unset",
            transform: `translateY(${positionOffset}px)`,
            transition: `transform ${transitionSpeed}ms`,
          }}
          className={"search"}
        >
          <h1>Find Recipes</h1>
          <div className="search__bar">
            <input
              type="text"
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key == "Enter") search(query, sortSelection);
              }}
              placeholder="What are you hungry for?"
            ></input>
            <button onClick={() => search(query, sortSelection)}>Search</button>
          </div>
          <form className="search__sort">
            <div>
              <input
                type="radio"
                id="popularity"
                name="sort"
                value="popularity"
                onClick={() => setSortSelection("popularity")}
                defaultChecked={sortSelection === "popularity"}
              ></input>
              <label htmlFor="popularity">Most Popular</label>
            </div>
            <div>
              <input
                type="radio"
                id="time"
                name="sort"
                value="time"
                onClick={() => setSortSelection("time")}
                defaultChecked={sortSelection === "time"}
              ></input>
              <label htmlFor="time">Most Recent</label>
            </div>
            <div>
              <input
                type="radio"
                id="random"
                name="sort"
                value="random"
                onClick={() => setSortSelection("random")}
                defaultChecked={sortSelection === "random"}
              ></input>
              <label htmlFor="random">Random</label>
            </div>
          </form>
        </div>
      </div>

      {isGathering && <span>Searching...</span>}
      {!isGathering && <div className="recipe-container">{recipeEls}</div>}
    </div>
  );
}
