import React from "react";
import { useDataContext } from "../context/DataContext";
import Recipe from "../components/Recipe";

export default function History() {
  const { getUserHistoryRecipes } = useDataContext();
  const [data] = React.useState(getUserHistoryRecipes());

  //scroll to top
  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const recipeEls = Object.values(data)
    .reverse()
    .map((item) => {
      let description = "";
      if (item.interactions.liked && item.interactions.comments > 0) {
        description = "You liked and commented on a recipe";
      } else if (item.interactions.liked) {
        description = "You liked a recipe";
      } else {
        description = "You left a comment";
      }

      return (
        <section className="history__item" key={item.recipe.id}>
          <span className="history__description">{description}</span>
          <Recipe recipe={item.recipe} />
        </section>
      );
    });

  return (
    <div className="history">
      <header className="general__header">
        <h3>See what you've been up to</h3>
      </header>

      {recipeEls.length > 0 && (
        <div className="recipe-container">{recipeEls}</div>
      )}
      {recipeEls.length === 0 && (
        <div className="general__empty">
          <span>You haven't done anything yet</span>
        </div>
      )}
    </div>
  );
}
