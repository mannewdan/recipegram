import React from "react";
import { useDataContext } from "../context/DataContext";
import { RecipeT } from "./Recipe";

type CommentBarProps = {
  recipeID: string;
  recipeData: RecipeT;
  replyingTo?: { id: string; user: string };
  clearReplyingTo?: () => void;
};

export default function CommentBar({
  recipeID,
  recipeData,
  replyingTo,
  clearReplyingTo,
}: CommentBarProps) {
  const [text, setText] = React.useState("");
  const { addRecipeData, postComment } = useDataContext();
  const inputRef = React.useRef<HTMLInputElement>(null);

  function resetField() {
    setText("");
    if (inputRef.current) inputRef.current.value = "";
  }
  React.useEffect(() => {
    if (replyingTo && inputRef.current) inputRef.current.focus();
  }, [replyingTo]);

  return (
    <form className="comment-bar">
      {replyingTo && (
        <span className="reply-tag unselectable">{`@${replyingTo.user}`}</span>
      )}
      <input
        ref={inputRef}
        onChange={(e) => {
          const value = e.target.value;
          setText(value);
        }}
        onKeyDown={(e) => {
          const key = e.key;
          if (!inputRef.current?.value && key === "Backspace") {
            if (clearReplyingTo) clearReplyingTo();
          }
        }}
        type="text"
        placeholder={!replyingTo ? "Add a comment..." : ""}
      ></input>
      <button
        className={text ? "clickable" : ""}
        onClick={(e) => {
          e.preventDefault();
          if (!text) return;

          addRecipeData(recipeData);
          postComment("user", recipeID, text, replyingTo);
          resetField();
          if (clearReplyingTo) clearReplyingTo();
        }}
      >
        Post
      </button>
    </form>
  );
}
