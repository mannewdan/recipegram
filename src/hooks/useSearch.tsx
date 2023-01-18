import React from "react";

const apiKey = "d8b1a12242b6478da2b4e77b09ca165c";

type Recipe = {
  name: string;
  description: string;
  ingredients: Ingredient[];
  instructions: Instruction[];

  prepMinutes?: number;
  cookMinutes?: number;
  totalMinutes?: number;
};
type Instruction = {
  number: number;
  step: string;
};
type Ingredient = {
  count: number;
  name: string;
};

export default function useSearch() {
  const [isGathering, setIsGathering] = React.useState(false);
  const [query, setQuery] = React.useState("");
  const [sort, setSort] = React.useState("popularity"); //'time', 'random'
  const [recipes, setRecipes] = React.useState<Recipe[]>([]);

  function search(query: string, sort: string = "popularity") {
    setQuery(query);
    setSort(sort);
    setIsGathering(true);

    fetch(
      `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}&query=${query}&instructionsRequired=true&addRecipeInformation=true&fillIngredients=true&number=3&sort=${sort}`
    )
      .then((res) => res.json())
      .then((data) => {
        setIsGathering(false);

        if (data.code === 402) {
          //daily limit reached
          console.log("Failed to retrieve data from API: " + data.message);
        } else {
          //convert data array into an array of recipes
          console.log(data);
        }
      })
      .catch((error) => {
        setIsGathering(false);
        console.log("Failed to retrieve data from API: " + error);
      });
  }

  return { search, isGathering, recipes };
}
