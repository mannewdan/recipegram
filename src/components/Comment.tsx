import React from "react";
import { CommentDataT } from "../context/DataContext";
import ReactTimeAgo from "react-time-ago";

type CommentProps = {
  commentData: CommentDataT;
};

export default function Comment({ commentData }: CommentProps) {
  const [showReplies, setShowReplies] = React.useState(false);

  const likesLabel =
    commentData.likeCount > 0
      ? commentData.likeCount + (commentData.likeCount > 1 ? " likes" : " like")
      : "";
  const isUser = commentData.userID === "user";

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
        <div className="comment-content__buttons">
          <div className="comment-content__interactions">
            <button className="comment-content__interactions--button">
              Reply
            </button>
            {isUser && (
              <>
                <button className="comment-content__interactions--button">
                  Edit
                </button>
                <button className="comment-content__interactions--button delete">
                  Delete
                </button>
              </>
            )}

            {commentData.likeCount > 0 && (
              <span className="comment-content__interactions--likes">
                {likesLabel}
              </span>
            )}

            <span className="comment-content__interactions--time">
              {<ReactTimeAgo date={commentData.time} timeStyle={"round"} />}
            </span>
          </div>
          <div>
            <button className="comment-content__interactions--button replies-toggle">
              — View replies (1)
            </button>
          </div>
        </div>
      </div>
      <div className="comment-like">{"<3"}</div>
    </div>
  );
}
