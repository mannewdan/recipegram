import React from "react";
import Recipe from "../components/Recipe";
import { useDataContext } from "../context/DataContext";

export default function Favorites() {
  const { getRecipeMetaData, getFavoriteRecipes } = useDataContext();
  const [recipes] = React.useState(getFavoriteRecipes().reverse());

  //scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  let previousDate = undefined as string | undefined;
  const recipeEls = recipes.map((recipe) => {
    const metaData = getRecipeMetaData(recipe.id);
    const newDate = metaData
      ? new Date(metaData.lastInteraction).toDateString()
      : undefined;

    const el = (
      <section key={recipe.id} className="favorites__item">
        {newDate && newDate !== previousDate && (
          <span className="favorites__item--time">{newDate}</span>
        )}
        <Recipe recipe={recipe} />
      </section>
    );

    previousDate = newDate;
    return el;
  });

  return (
    <div className="favorites">
      <div className="general__header">
        <h3>Revisit your favorite recipes</h3>
      </div>

      {recipes.length > 0 && (
        <div className="recipe-container">{recipeEls}</div>
      )}
      {recipes.length === 0 && (
        <div className="general__empty">
          <span>You haven't saved any recipes yet</span>
        </div>
      )}
    </div>
  );
}
