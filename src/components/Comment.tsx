import React from "react";
import { CommentDataT } from "../context/DataContext";

type CommentProps = {
  commentData: CommentDataT;
};

export default function Comment({ commentData }: CommentProps) {
  const [showReplies, setShowReplies] = React.useState(false);

  const likesLabel =
    commentData.likeCount > 0
      ? commentData.likeCount + (commentData.likeCount > 1 ? " Likes" : " Like")
      : "";

  return (
    <div className="comment-container">
      <div className="comment-content">
        <div>
          <strong className="comment-content__username">
            {commentData.userID}
          </strong>
          <span className="comment-content__comment">
            {commentData.content}
          </span>
        </div>
        <div className="comment-content__interactions">
          <div>
            <span className="comment-content__interactions--time">12d</span>
            <span className="comment-content__interactions--like-count">
              {likesLabel}
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
