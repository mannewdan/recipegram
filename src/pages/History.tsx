import React from "react";
import { useDataContext, RecipeDataT } from "../context/DataContext";
import Recipe from "../components/Recipe";

export default function History() {
  const { getUserHistoryRecipes } = useDataContext();
  const [recipes] = React.useState(getUserHistoryRecipes().reverse());

  //scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recipeEls = recipes.map((recipe) => {
    return (
      <section className="history__item" key={recipe.id}>
        <span className="history__description">You liked a recipe</span>
        <Recipe recipe={recipe} />
      </section>
    );
  });

  return (
    <div className="history">
      <header className="general__header">
        <h3>See what you've been up to</h3>
      </header>

      {recipes.length > 0 && (
        <div className="recipe-container">{recipeEls}</div>
      )}
      {recipes.length === 0 && (
        <div className="general__empty">
          <span>You haven't done anything yet</span>
        </div>
      )}
    </div>
  );
}
