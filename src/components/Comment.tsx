import React from "react";

export default function Comment() {
  const [showReplies, setShowReplies] = React.useState(false);

  return (
    <div className="comment-container">
      <div className="comment-content">
        <div>
          <strong className="comment-content__username">username</strong>
          <span className="comment-content__comment">
            Sample Comment Sample Comment Sample Comment Sample Comment Sample
            Comment Sample Comment Sample Comment Sample Comment Sample Comment
            Sample Comment
          </span>
        </div>
        <div className="comment-content__interactions">
          <div>
            <span className="comment-content__interactions--time">12d</span>
            <span className="comment-content__interactions--like-count">
              1 like
            </span>
            <button className="comment-content__interactions--reply-button">
              Reply
            </button>
          </div>
          <div>
            <button className="comment-content__interactions--replies-toggle">
              — View replies
            </button>
          </div>
        </div>
      </div>
      <div className="comment-like">{"<3"}</div>
    </div>
  );
}
