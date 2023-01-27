import { Recipe as RecipeT } from "../hooks/useSearch";

type RecipeProps = {
  recipe: RecipeT;
};

export default function Recipe({ recipe }: RecipeProps) {
  return (
    <div key={recipe.id} className="recipe">
      <div className="recipe__title">
        <h3>{recipe.name}</h3>
      </div>

      <img src={recipe.imageURL}></img>

      <div className="recipe__details">
        <div>
          <div className="recipe__details--top">
            <h4>Ingredients</h4>
            <div className="recipe__buttons">
              <button className="icon-button">
                <i
                  className={`icon fa-regular fa-star ${
                    false ? "instant" : ""
                  }`}
                ></i>
                <i
                  className={`icon fa-solid fa-star ${true ? "pulse" : ""}`}
                ></i>
              </button>
              <button className="icon-button">
                <i className={`icon fa-regular fa-comment instant`}></i>
              </button>
              <button className="icon-button">
                <i
                  className={`icon fa-regular fa-heart ${
                    false ? "instant" : ""
                  }`}
                ></i>
                <i
                  className={`icon fa-solid fa-heart ${true ? "pulse" : ""}`}
                ></i>
              </button>
              <span className="unselectable">3.1k</span>
            </div>
          </div>

          <ul>
            {recipe.ingredients.map((item) => (
              <li>{item}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4>Instructions</h4>
          {recipe.instructions && (
            <ol>
              {recipe.instructions.map((item) => (
                <li>{item.step}</li>
              ))}
            </ol>
          )}

          {!recipe.instructions && (
            <p>No instructions provided. Figure it out yourself!</p>
          )}
        </div>
      </div>

      <div className="recipe__comments">
        <button className="recipe__comments--view-comments">
          View 1 comment
        </button>
        <form className="recipe__comments--reply-bar">
          <input type="text" placeholder="Add a comment..."></input>
          <button>Post</button>
        </form>
      </div>
    </div>
  );
}
