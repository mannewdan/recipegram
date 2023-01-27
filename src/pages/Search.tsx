import useSearch from "../hooks/useSearch";
import Recipe from "../components/Recipe";
import SearchBar from "../components/SearchBar";

export default function Search() {
  const { search, isGathering, recipes } = useSearch();

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
