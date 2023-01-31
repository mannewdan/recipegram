import React from "react";
import Recipe, { RecipeT } from "../components/Recipe";
import SearchBar from "../components/SearchBar";

type SearchProps = {
  search: (query: string, sort?: string) => void;
  isGathering: boolean;
  recipes: Array<RecipeT>;
};

export default function Search({ search, isGathering, recipes }: SearchProps) {
  //scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      <SearchBar search={search} />

      {isGathering && (
        <div className="search-indicator">
          <span>Searching...</span>
        </div>
      )}

      {!isGathering && recipes.length === 0 && (
        <div className="search-indicator">
          <span>Discover new recipes</span>
        </div>
      )}

      {!isGathering && recipes.length > 0 && (
        <div className="recipe-container">
          {recipes.map((r) => {
            return <Recipe key={r.id} recipe={r} />;
          })}
        </div>
      )}
    </>
  );
}
