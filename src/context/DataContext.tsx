import React from "react";
import { RecipeT } from "../components/Recipe";

type UserDataT = {
  likes: { [key: string]: boolean };
  favorites: { [key: string]: boolean };
};
export enum UserDataStatus {
  Like = "likes",
  Favorite = "favorites",
}
type RecipeDataT = {
  id: string;
  recipe: RecipeT;
  likeCount: number;
  comments: Array<CommentDataT>;
  lastInteraction: Date;
};
type CommentDataT = {
  userID: string;
  content: string;
  time: Date;
  likeCount: number;
  replies: Array<ReplyDataT>;
};
type ReplyDataT = {
  userID: string;
  content: string;
  time: Date;
  likeCount: number;
};
type DataContextT = {
  toggleUserRecipeStatus: (id: string, whichStatus: UserDataStatus) => void;
  isUserRecipeStatusPositive: (
    id: string,
    whichStatus: UserDataStatus
  ) => boolean;
};

const Context = React.createContext({} as DataContextT);
export function useDataContext() {
  return React.useContext(Context);
}

export function DataContextProvider(props: { children: React.ReactNode }) {
  const [userData, setUserData] = React.useState(() => {
    const data = localStorage.getItem("user-data");
    return data
      ? JSON.parse(data)
      : ({ likes: {}, favorites: {} } as UserDataT);
  });
  const [recipeData, setRecipeData] = React.useState(() => {
    const data = localStorage.getItem("recipe-data");
    return data ? JSON.parse(data) : {};
  });

  console.log(userData);
  console.log(recipeData);

  //functions
  function toggleUserRecipeStatus(id: string, whichStatus: UserDataStatus) {
    if (userData[whichStatus][id]) {
      setUserData((prev: UserDataT) => {
        const newData = { ...prev };
        delete newData[whichStatus][id];
        return newData;
      });
    } else {
      setUserData((prev: UserDataT) => {
        return { ...prev, [whichStatus]: { ...prev[whichStatus], [id]: true } };
      });
    }
  }
  function isUserRecipeStatusPositive(
    id: string,
    whichStatus: UserDataStatus
  ): boolean {
    return !!userData[whichStatus][id];
  }

  //save
  React.useEffect(() => {
    localStorage.setItem("user-data", JSON.stringify(userData));
  }, [userData]);
  React.useEffect(() => {
    localStorage.setItem("recipe-data", JSON.stringify(recipeData));
  }, [recipeData]);

  return (
    <Context.Provider
      value={{
        toggleUserRecipeStatus,
        isUserRecipeStatusPositive,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
