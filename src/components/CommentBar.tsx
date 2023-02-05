import React from "react";
import { useDataContext } from "../context/DataContext";

type CommentBarProps = {
  recipeID: string;
};

export default function CommentBar({ recipeID }: CommentBarProps) {
  const [text, setText] = React.useState("");
  const { postComment } = useDataContext();
  const inputRef = React.useRef<HTMLInputElement>(null);

  function resetField() {
    setText("");
    if (inputRef.current) inputRef.current.value = "";
  }

  return (
    <form className="comment-bar">
      <input
        ref={inputRef}
        onChange={(e) => {
          const value = e.target.value;
          setText(value);
        }}
        type="text"
        placeholder="Add a comment..."
      ></input>
      <button
        className={text ? "clickable" : ""}
        onClick={(e) => {
          e.preventDefault();
          if (!text) return;

          postComment("user", recipeID, text);
          resetField();
        }}
      >
        Post
      </button>
    </form>
  );
}
