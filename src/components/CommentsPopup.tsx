import React from "react";
import { RecipeT } from "./Recipe";
import Comment from "./Comment";
import RecipeSimplified from "./RecipeSimplified";
import CommentBar from "./CommentBar";
import { useDataContext } from "../context/DataContext";

type CommentsPopupProps = {
  recipe: RecipeT;
  closeComments: () => void;
};

export default function CommentsPopup({
  recipe,
  closeComments,
}: CommentsPopupProps) {
  const comments = useDataContext().getComments(recipe.id);
  const [replyingTo, setReplyingTo] = React.useState<
    { id: string; user: string } | undefined
  >(undefined);

  //functions
  function clearReplyingTo() {
    setReplyingTo(undefined);
  }

  //rendering
  const commentEls = !comments ? (
    <></>
  ) : (
    (() => {
      const values = Object.values(comments);
      const els = [];
      for (let i = values.length - 1; i >= 0; i--) {
        els.push(
          <Comment
            key={values[i].id}
            commentData={values[i]}
            setReplyingTo={setReplyingTo}
          />
        );
      }
      return els;
    })()
  );

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
            <div className="comments__posts-container">{commentEls}</div>

            <CommentBar
              recipeID={recipe.id}
              replyingTo={replyingTo}
              clearReplyingTo={clearReplyingTo}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
