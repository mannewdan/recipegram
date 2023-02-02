type CommentsPopupProps = {
  closeComments: () => void;
};

export default function CommentsPopup({ closeComments }: CommentsPopupProps) {
  return (
    <div className="comments-container">
      <div
        onClick={() => {
          closeComments();
        }}
        className="comments-background"
      ></div>
      <div className="comments">comments</div>
    </div>
  );
}
