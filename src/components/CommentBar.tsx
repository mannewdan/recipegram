import React from "react";
import { useDataContext } from "../context/DataContext";

type CommentBarProps = {
  recipeID: string;
  replyingTo: { id: string; user: string } | undefined;
  clearReplyingTo: () => void;
};

export default function CommentBar({
  recipeID,
  replyingTo,
  clearReplyingTo,
}: CommentBarProps) {
  const [text, setText] = React.useState("");
  const { postComment } = useDataContext();
  const inputRef = React.useRef<HTMLInputElement>(null);

  function resetField() {
    setText("");
    if (inputRef.current) inputRef.current.value = "";
  }
  React.useEffect(() => {
    if (inputRef.current) inputRef.current.focus();
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
            clearReplyingTo();
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

          postComment("user", recipeID, text, replyingTo);
          resetField();
          clearReplyingTo();
        }}
      >
        Post
      </button>
    </form>
  );
}
