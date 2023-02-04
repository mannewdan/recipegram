import { RecipeT } from "./Recipe";

type RecipeSimplifiedProps = {
  recipe: RecipeT;
};

export default function RecipeSimplified({ recipe }: RecipeSimplifiedProps) {
  return (
    <div className="recipe-simplified">
      <img src={recipe.imageURL}></img>

      <div className="recipe-simplified__scroll-section">
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
  );
}
