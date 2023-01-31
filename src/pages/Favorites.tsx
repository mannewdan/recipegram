import React from "react";
import Recipe from "../components/Recipe";
import { useDataContext } from "../context/DataContext";

export default function Favorites() {
  const { getRecipeMetaData, getFavoriteRecipes } = useDataContext();
  const [recipes, setRecipes] = React.useState(getFavoriteRecipes());

  //scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  //show most recent at the top
  const recipeEls = [];
  let previousDate = undefined;
  for (let i = recipes.length - 1; i >= 0; i--) {
    const metaData = getRecipeMetaData(recipes[i].id);
    const newDate = metaData
      ? new Date(metaData.lastInteraction).toDateString()
      : undefined;
    recipeEls.push(
      <section key={recipes[i].id} className="favorites__item">
        {newDate && newDate !== previousDate && (
          <span className="favorites__item--time">{newDate}</span>
        )}
        <Recipe recipe={recipes[i]} />
      </section>
    );
    previousDate = newDate;
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
