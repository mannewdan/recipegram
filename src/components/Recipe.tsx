import React from "react";
import { useDataContext } from "../context/DataContext";
import { UserDataStatus } from "../context/DataContext";
import timeText from "../utils/timeText";
import CommentsPopup from "./CommentsPopup";

export type RecipeT = {
  id: string;
  name: string;
  description: string;
  ingredients: string[];
  instructions?: InstructionT[];

  imageURL: string;

  prepMinutes?: number;
  cookMinutes?: number;
  totalMinutes?: number;
};
export type InstructionT = {
  number: number;
  step: string;
};
type RecipeProps = {
  recipe: RecipeT;
};

export default function Recipe({ recipe }: RecipeProps) {
  const {
    toggleUserRecipeStatus,
    isUserRecipeStatusPositive,
    addRecipeData,
    getRecipeMetaData,
    updateRecipeLikes,
  } = useDataContext();
  const [commentsOpen, setCommentsOpen] = React.useState(false);

  const cookText = recipe.cookMinutes ? timeText(recipe.cookMinutes) : null;
  const prepText = recipe.prepMinutes ? timeText(recipe.prepMinutes) : null;
  const totalText = recipe.totalMinutes ? timeText(recipe.totalMinutes) : null;
  const liked = isUserRecipeStatusPositive(recipe.id, UserDataStatus.Like);
  const favorited = isUserRecipeStatusPositive(
    recipe.id,
    UserDataStatus.Favorite
  );
  const metaData = getRecipeMetaData(recipe.id);
  const likes = metaData ? metaData.likeCount : 0;

  return (
    <div key={recipe.id} className="recipe">
      {commentsOpen && (
        <CommentsPopup closeComments={() => setCommentsOpen(false)} />
      )}

      <div className="recipe__title">
        <h3>{recipe.name}</h3>
      </div>

      <div className="img-container">
        <img src={recipe.imageURL}></img>

        {cookText && prepText && (
          <div>
            <span className="recipe__prep-time unselectable">
              {"Prep Time: " + prepText}
              <br></br>
              {"Cook Time: " + cookText}
            </span>
          </div>
        )}

        {(!cookText || !prepText) && totalText && (
          <div>
            <span className="recipe__prep-time unselectable">{totalText}</span>
          </div>
        )}
      </div>

      <div className="recipe__details">
        <div>
          <div className="recipe__details--top">
            <h4>Ingredients</h4>
            <div className="recipe__buttons">
              <button
                onClick={() => {
                  toggleUserRecipeStatus(recipe.id, UserDataStatus.Favorite);
                  addRecipeData(recipe);
                }}
                className="icon-button"
              >
                <i
                  className={`icon fa-regular fa-star ${
                    !favorited ? "instant" : ""
                  }`}
                ></i>
                <i
                  className={`icon fa-solid fa-star ${
                    favorited ? "pulse" : ""
                  }`}
                ></i>
              </button>
              <button
                onClick={() => {
                  setCommentsOpen(true);
                }}
                className="icon-button"
              >
                <i className={`icon fa-regular fa-comment instant`}></i>
              </button>
              <button
                onClick={() => {
                  const liked = toggleUserRecipeStatus(
                    recipe.id,
                    UserDataStatus.Like
                  );
                  const added = addRecipeData(recipe, liked);
                  if (!added) updateRecipeLikes(recipe, liked ? 1 : -1);
                }}
                className="icon-button"
              >
                <i
                  className={`icon fa-regular fa-heart ${
                    !liked ? "instant" : ""
                  }`}
                ></i>
                <i
                  className={`icon fa-solid fa-heart ${liked ? "pulse" : ""}`}
                ></i>
              </button>
              <span className="unselectable">
                {Intl.NumberFormat("en-US", {
                  notation: "compact",
                  maximumFractionDigits: 1,
                }).format(likes)}
              </span>
            </div>
          </div>

          <ul>
            {recipe.ingredients.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Instructions</h4>
          {recipe.instructions && (
            <ol>
              {recipe.instructions.map((item, index) => (
                <li key={index}>{item.step}</li>
              ))}
            </ol>
          )}

          {!recipe.instructions && (
            <p>No instructions provided. Figure it out yourself!</p>
          )}
        </div>
      </div>

      <div className="recipe__comments">
        <button className="recipe__comments--view-comments">
          View 1 comment
        </button>
        <form className="recipe__comments--reply-bar">
          <input type="text" placeholder="Add a comment..."></input>
          <button>Post</button>
        </form>
      </div>
    </div>
  );
}
