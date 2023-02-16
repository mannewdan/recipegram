import React from "react";
import { useDataContext, RecipeDataT } from "../context/DataContext";
import Recipe from "../components/Recipe";

enum SortMode {
  Likes = "likes",
  Comments = "comments",
  Newest = "newest",
}

export default function Feed() {
  const { getAllRecipes, getRecipeMetaData } = useDataContext();
  const [recipes] = React.useState<Array<RecipeDataT>>(
    refreshRecipes(SortMode.Comments)
  );

  function refreshRecipes(sortMode: SortMode): Array<RecipeDataT> {
    const r = getAllRecipes()
      .map((recipe) => {
        return getRecipeMetaData(recipe.id);
      })
      .filter((recipe) => {
        return (
          recipe.likeCount > 0 || Object.values(recipe.comments).length > 0
        );
      });

    switch (sortMode) {
      case SortMode.Likes:
        return r.sort((x, y) => {
          return x.likeCount > y.likeCount ? 1 : -1;
        });
      case SortMode.Comments:
        return r.sort((x, y) => {
          const xCount = Object.values(x.comments).reduce((acc, comment) => {
            return (
              acc +
              (1 +
                (comment.replies ? Object.values(comment.replies).length : 0))
            );
          }, 0);
          const yCount = Object.values(y.comments).reduce((acc, comment) => {
            return (
              acc +
              (1 +
                (comment.replies ? Object.values(comment.replies).length : 0))
            );
          }, 0);

          return xCount > yCount ? 1 : -1;
        });
      case SortMode.Newest:
        return r.reverse();
    }
  }

  const recipeEls = recipes
    .reverse()
    .filter((recipe) => {
      const data = getRecipeMetaData(recipe.id);
      return data.likeCount > 0 || Object.values(data.comments).length > 0;
    })
    .map((recipe) => {
      return <Recipe key={recipe.id} recipe={recipe.recipe} />;
    });

  return (
    <>
      {recipes.length > 0 && (
        <div className="recipe-container">{recipeEls}</div>
      )}
    </>
  );
}
