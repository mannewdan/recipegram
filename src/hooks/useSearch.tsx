import React from "react";
import { RecipeT, InstructionT } from "../components/Recipe";

const apiKey = "d8b1a12242b6478da2b4e77b09ca165c";
const resultsCount = 20;

export default function useSearch() {
  const [isGathering, setIsGathering] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("popularity"); //'time', 'random'
  const [recipes, setRecipes] = React.useState<RecipeT[]>([]);

  function search(query: string, sort: string = "popularity") {
    setQuery(query);
    setSort(sort);
    setIsGathering(true);

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&number=${resultsCount}&sort=${sort}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsGathering(false);

        if (data.code === 402) {
          //daily limit reached
          console.log("Failed to retrieve data from API: " + data.message);
        } else {
          console.log(data);

          //convert data array into an array of recipes
          setRecipes(buildRecipes(data.results));
        }
      })
      .catch((error) => {
        setIsGathering(false);
        console.log("Failed to retrieve data from API: " + error);
      });
  }
  function buildRecipes(results: any[]): Array<RecipeT> {
    return results.map((result) => {
      //get ingredients
      const ingredients = result.extendedIngredients.map((item: any) => {
        return item.original;
      }) as string[];

      //get instructions
      let instructions = undefined;
      if (
        result.analyzedInstructions &&
        result.analyzedInstructions.length > 0
      ) {
        instructions = result.analyzedInstructions[0].steps.map((step: any) => {
          return {
            number: step.number,
            step: step.step,
          } as InstructionT;
        }) as InstructionT[];
      }

      //build recipe
      return {
        id: "r" + result.id,
        name: result.title,
        description: result.summary,
        ingredients: ingredients,
        instructions: instructions,

        imageURL: result.image,
        sourceName: result.sourceName,
        sourceURL: result.sourceUrl,

        prepMinutes:
          result.preparationMinutes > 0 ? result.preparationMinutes : undefined,
        cookMinutes:
          result.cookingMinutes > 0 ? result.cookingMinutes : undefined,
        totalMinutes:
          result.readyInMinutes > 0 ? result.readyInMinutes : undefined,
      } as RecipeT;
    }) as RecipeT[];
  }

  return { search, isGathering, query, sort, recipes };
}
