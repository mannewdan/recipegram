import { RecipeT } from "./Recipe";

type CommentsPopupProps = {
  recipe: RecipeT;
  closeComments: () => void;
};

export default function CommentsPopup({
  recipe,
  closeComments,
}: CommentsPopupProps) {
  return (
    <div className="comments-container">
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

      <div className="comments">
        <h3 className="comments__title">{recipe.name}</h3>

        <div className="comments__content-container">
          <div className="comments__recipe">
            <img src={recipe.imageURL}></img>

            <div className="comments__recipe--scroll-section">
              <div className="recipe__details">
                <h4>Ingredients</h4>
                <ul>
                  {recipe.ingredients.map((item, index) => (
                    <li key={index}>{item}</li>
                  ))}
                </ul>
                <h4>Instructions</h4>
                {recipe.instructions && (
                  <ol>
                    {recipe.instructions.map((item, index) => (
                      <li key={index}>{item.step}</li>
                    ))}
                  </ol>
                )}
              </div>
            </div>
          </div>
          <div className="comments__posts">posts</div>
        </div>
      </div>
    </div>
  );
}
