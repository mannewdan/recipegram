import React from "react";
import { useDataContext, RecipeDataT } from "../context/DataContext";
import Recipe from "../components/Recipe";
import SearchBar from "../components/SearchBar";

type FeedProps = {
  search: (query: string, sort?: string) => void;
};
enum SortMode {
  Likes = "likes",
  Comments = "comments",
  Newest = "newest",
}

export default function Feed({ search }: FeedProps) {
  const { getAllRecipes, getRecipeMetaData } = useDataContext();
  const [recipes, setRecipes] = React.useState<Array<RecipeDataT>>(
    refreshRecipes(SortMode.Likes)
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
          return x.likeCount < y.likeCount ? 1 : -1;
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

          return xCount < yCount ? 1 : -1;
        });
      case SortMode.Newest:
        return r.reverse();
    }
  }

  const recipeEls = recipes.map((recipe) => {
    return <Recipe key={recipe.id} recipe={recipe.recipe} />;
  });

  return (
    <>
      <SearchBar search={search} />

      <div className="feed">
        <div className="feed__sort-mode">
          <label htmlFor="sort-mode">Sort by</label>
          <select
            onChange={(e) => {
              console.log(e.target.value);
              setRecipes(refreshRecipes(e.target.value as SortMode));
            }}
            name="sort-mode"
          >
            <option value={SortMode.Likes}>Most Likes</option>
            <option value={SortMode.Comments}>Most Comments</option>
            <option value={SortMode.Newest}>Newest</option>
          </select>
        </div>

        {recipes.length > 0 && (
          <div className="recipe-container">{recipeEls}</div>
        )}
      </div>
    </>
  );
}
