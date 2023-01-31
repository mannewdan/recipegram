import React from "react";
import Recipe from "../components/Recipe";
import { useDataContext } from "../context/DataContext";

export default function Favorites() {
  const [recipes, setRecipes] = React.useState(
    useDataContext().getFavoriteRecipes()
  );

  //scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //show most recent at the top
  const recipeEls = [];
  for (let i = recipes.length - 1; i >= 0; i--) {
    recipeEls.push(<Recipe key={recipes[i].id} recipe={recipes[i]} />);
  }

  return (
    <div className="favorites">
      <div className="favorites__title">
        <h3>Revisit your favorite recipes</h3>
      </div>

      {recipes.length > 0 && (
        <div className="recipe-container">{recipeEls}</div>
      )}
      {recipes.length === 0 && (
        <div className="favorites__empty">
          <span>You haven't saved any recipes yet</span>
        </div>
      )}
    </div>
  );
}
