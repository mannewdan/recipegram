import useSearch from "../hooks/useSearch";
import Recipe from "../components/Recipe";
import SearchBar from "../components/SearchBar";

export default function Search() {
  const { search, isGathering, recipes } = useSearch();

  return (
    <>
      <SearchBar search={search} />

      {isGathering && <span>Searching...</span>}

      {!isGathering && (
        <div className="recipe-container">
          {recipes.map((r) => {
            return <Recipe key={r.id} recipe={r} />;
          })}
        </div>
      )}
    </>
  );
}
