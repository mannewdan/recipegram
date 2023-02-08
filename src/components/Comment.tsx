import React from "react";
import { CommentDataT } from "../context/DataContext";
import ReactTimeAgo from "react-time-ago";
import { useDataContext } from "../context/DataContext";

type CommentProps = {
  commentData: CommentDataT;
};

export default function Comment({ commentData }: CommentProps) {
  const [showReplies, setShowReplies] = React.useState(false);
  const [isEditing, setIsEditing] = React.useState(false);
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { deleteComment } = useDataContext();

  const isUser = commentData.userID === "user";

  //rendering
  const likesLabel =
    commentData.likeCount > 0
      ? commentData.likeCount + (commentData.likeCount > 1 ? " likes" : " like")
      : "";

  return (
    <div className="comment-container">
      <div className="comment-content">
        {/* Username & Comment */}
        <div>
          <strong className="comment-content__username">
            {commentData.userID}
          </strong>
          <span className="comment-content__comment">
            {commentData.content}
          </span>
        </div>

        <div className="comment-content__buttons">
          {/* Reply, Edit, Delete, Likes, Time */}
          <div className="comment-content__interactions">
            <button className="comment-content__interactions--button">
              Reply
            </button>
            {isUser && (
              <>
                <button className="comment-content__interactions--button">
                  Edit
                </button>
                {!isDeleting && (
                  <button
                    onClick={() => setIsDeleting(true)}
                    className="comment-content__interactions--button delete"
                  >
                    Delete
                  </button>
                )}
                {isDeleting && (
                  <>
                    <span>You sure?</span>
                    <button
                      onClick={() => setIsDeleting(false)}
                      className="comment-content__interactions--button"
                    >
                      No
                    </button>
                    <button
                      onClick={() => {
                        deleteComment(commentData.recipeID, commentData.id);
                      }}
                      className="comment-content__interactions--button delete"
                    >
                      Yes
                    </button>
                  </>
                )}
              </>
            )}

            {commentData.likeCount > 0 && (
              <span className="comment-content__interactions--likes">
                {likesLabel}
              </span>
            )}

            <span className="comment-content__interactions--time">
              {
                <ReactTimeAgo
                  date={new Date(commentData.time)}
                  timeStyle={"round"}
                />
              }
            </span>
          </div>

          {/* View Replies */}
          <div>
            <button className="comment-content__interactions--button replies-toggle">
              — View replies (1)
            </button>
          </div>
        </div>
      </div>

      {/* Like Button */}
      <div className="comment-like">{"<3"}</div>
    </div>
  );
}
