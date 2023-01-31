import React from "react";
import Recipe from "../components/Recipe";
import { useDataContext } from "../context/DataContext";

type FavoritesProps = {
  search: (query: string, sort?: string) => void;
};

export default function Favorites({ search }: FavoritesProps) {
  const [recipes, setRecipes] = React.useState(
    useDataContext().getFavoriteRecipes()
  );

  return (
    <>
      <div className="favorites__title">
        <h3>Revisit your favorite recipes</h3>
      </div>

      {recipes.length > 0 && (
        <div className="recipe-container">
          {recipes.map((r) => {
            return <Recipe key={r.id} recipe={r} />;
          })}
        </div>
      )}
    </>
  );
}
