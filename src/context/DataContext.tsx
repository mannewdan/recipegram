import React from "react";
import { RecipeT } from "../components/Recipe";
import { v4 as uuid } from "uuid";

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
  comments: { [key: string]: CommentDataT };
  lastInteraction: Date;
};
export type CommentDataT = {
  id: string;
  recipeID: string;
  userID: string;
  content: string;
  time: Date;
  likeCount: number;
  replies: { [key: string]: ReplyDataT };
};
type ReplyDataT = {
  id: string;
  recipeID: string;
  commentID: string;
  userID: string;
  content: string;
  time: Date;
  likeCount: number;
};
type DataContextT = {
  toggleUserRecipeStatus: (id: string, whichStatus: UserDataStatus) => boolean;
  isUserRecipeStatusPositive: (
    id: string,
    whichStatus: UserDataStatus
  ) => boolean;
  addRecipeData: (recipe: RecipeT, liked?: boolean) => boolean;
  updateRecipeLikes: (recipe: RecipeT, change: number) => void;
  getFavoriteRecipes: () => Array<RecipeT>;
  getRecipeMetaData: (id: string) => RecipeDataT;
  postComment: (
    userID: string,
    recipeID: string,
    comment: string,
    commentID?: string
  ) => void;
  updateComment: (
    recipeID: string,
    commentID: string,
    comment: string,
    replyID?: string
  ) => void;
  deleteComment: (
    recipeID: string,
    commentID: string,
    replyID?: string
  ) => void;
  getComments: (
    recipeID: string
  ) => { [key: string]: CommentDataT } | undefined;
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
  const [recipeData, setRecipeData] = React.useState<{
    [key: string]: RecipeDataT;
  }>(() => {
    const data = localStorage.getItem("recipe-data");
    return data ? JSON.parse(data) : {};
  });

  console.log(recipeData);

  //recipe functions
  function toggleUserRecipeStatus(
    id: string,
    whichStatus: UserDataStatus
  ): boolean {
    if (userData[whichStatus][id]) {
      setUserData((prev: UserDataT) => {
        const newData = { ...prev };
        delete newData[whichStatus][id];
        return newData;
      });

      return false;
    } else {
      setUserData((prev: UserDataT) => {
        return { ...prev, [whichStatus]: { ...prev[whichStatus], [id]: true } };
      });

      return true;
    }
  }
  function isUserRecipeStatusPositive(
    id: string,
    whichStatus: UserDataStatus
  ): boolean {
    return !!userData[whichStatus][id];
  }
  function addRecipeData(recipe: RecipeT, liked: boolean = false): boolean {
    if (recipeData[recipe.id]) return false;

    setRecipeData((prev) => {
      return {
        ...prev,
        [recipe.id]: {
          id: recipe.id,
          recipe,
          likeCount: liked ? 1 : 0,
          comments: {},
          lastInteraction: new Date(),
        },
      };
    });

    return true;
  }
  function getFavoriteRecipes(): Array<RecipeT> {
    return Object.keys(userData.favorites).map((id) => {
      return recipeData[id].recipe;
    }) as RecipeT[];
  }
  function getRecipeMetaData(id: string): RecipeDataT {
    return recipeData[id];
  }
  function updateRecipeLikes(recipe: RecipeT, change: number) {
    if (!recipeData[recipe.id]) return;

    setRecipeData((prev) => {
      return {
        ...prev,
        [recipe.id]: {
          ...prev[recipe.id],
          likeCount: prev[recipe.id].likeCount + change,
        },
      };
    });
  }

  //comment functions
  function postComment(
    userID: string,
    recipeID: string,
    comment: string,
    commentID?: string
  ) {
    if (commentID && false) {
      //if commentID is defined and exists within the recipe, post this as a reply
    } else {
      //create comment
      const newComment = {
        id: uuid(),
        recipeID,
        userID,
        content: comment,
        time: new Date(),
        likeCount: 0,
        replies: {},
      };

      //save comment
      setRecipeData((prev) => {
        return {
          ...prev,
          [recipeID]: {
            ...prev[recipeID],
            comments: {
              ...prev[recipeID].comments,
              [newComment.id]: newComment,
            },
          },
        };
      });
    }
  }
  function updateComment(
    recipeID: string,
    commentID: string,
    comment: string,
    replyID?: string
  ) {}
  function deleteComment(
    recipeID: string,
    commentID: string,
    replyID?: string
  ) {
    if (replyID && false) {
      //if replyID is defined, then only delete the reply with that ID
    } else {
      //delete the comment, including all replies
      setRecipeData((prev) => {
        return {
          ...prev,
          [recipeID]: {
            ...prev[recipeID],
            comments: (function () {
              const newComments = { ...prev[recipeID].comments };
              delete newComments[commentID];
              return newComments;
            })(),
          },
        };
      });
    }
  }
  function getComments(
    recipeID: string
  ): { [key: string]: CommentDataT } | undefined {
    const recipeMetaData = getRecipeMetaData(recipeID);
    return recipeMetaData?.comments;
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
        addRecipeData,
        getRecipeMetaData,
        updateRecipeLikes,
        getFavoriteRecipes,
        postComment,
        updateComment,
        deleteComment,
        getComments,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
