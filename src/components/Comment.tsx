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
  const [edit, setEdit] = React.useState("");
  const [isDeleting, setIsDeleting] = React.useState(false);
  const { updateComment, deleteComment } = useDataContext();

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
          {!isEditing && (
            <>
              <strong className="comment-content__username">
                {commentData.userID}
              </strong>
              <span className="comment-content__comment">
                {commentData.content}
              </span>
            </>
          )}
          {isEditing && (
            <textarea onChange={(e) => setEdit(e.target.value)} value={edit} />
          )}
        </div>

        <div className="comment-content__buttons">
          {isUser && (
            <div className="comment-content__user-control">
              {/* Edit */}
              {!isEditing && (
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setIsDeleting(false);
                    setEdit(commentData.content);
                  }}
                  className="comment-content__interactions--button"
                >
                  Edit
                </button>
              )}
              {isEditing && (
                <>
                  <button
                    onClick={() => {
                      updateComment(commentData.recipeID, commentData.id, edit);
                      setIsEditing(false);
                    }}
                    className="comment-content__interactions--button"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="comment-content__interactions--button cancel"
                  >
                    Cancel
                  </button>
                </>
              )}

              {/* Delete */}
              {!isEditing && !isDeleting && (
                <button
                  onClick={() => setIsDeleting(true)}
                  className="comment-content__interactions--button delete"
                >
                  Delete
                </button>
              )}
              {!isEditing && isDeleting && (
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
                    className="comment-content__interactions--button red"
                  >
                    Yes
                  </button>
                </>
              )}
            </div>
          )}

          {!isEditing && (
            <div className="comment-content__interactions">
              {/* Reply */}
              <button className="comment-content__interactions--button">
                Reply
              </button>

              {/* Likes */}
              {commentData.likeCount > 0 && (
                <span className="comment-content__interactions--likes">
                  {likesLabel}
                </span>
              )}

              {/* Time */}
              <span className="comment-content__interactions--time">
                {
                  <ReactTimeAgo
                    date={new Date(commentData.time)}
                    timeStyle={"round"}
                  />
                }
                {commentData.edited && " (edited)"}
              </span>
            </div>
          )}

          {/* View Replies */}
          <div>
            <button className="comment-content__interactions--button replies-toggle">
              — View replies (1)
            </button>
          </div>
        </div>
      </div>

      {/* Like Button */}
      {!isEditing && <div className="comment-like">{"<3"}</div>}
    </div>
  );
}
