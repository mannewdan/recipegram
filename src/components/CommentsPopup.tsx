import { RecipeT } from "./Recipe";
import Comment from "./Comment";
import RecipeSimplified from "./RecipeSimplified";
import CommentBar from "./CommentBar";

type CommentsPopupProps = {
  recipe: RecipeT;
  closeComments: () => void;
};

export default function CommentsPopup({
  recipe,
  closeComments,
}: CommentsPopupProps) {
  return (
    <div className="comments-container">
      {/* Background */}
      <div
        onClick={() => {
          closeComments();
        }}
        className="comments-background"
      ></div>
      <button
        onClick={() => {
          closeComments();
        }}
        className="comments-x-button"
      >
        X
      </button>

      {/* Popup */}
      <div className="comments">
        <h3 className="comments__title">{recipe.name}</h3>

        <div className="comments__main-container">
          <div className="comments__recipe-section">
            <RecipeSimplified recipe={recipe} />
          </div>

          <div className="comments__posts-section">
            <div className="comments__posts-container">
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
              <Comment />
            </div>

            <CommentBar recipeID={recipe.id} />
          </div>
        </div>
      </div>
    </div>
  );
}
