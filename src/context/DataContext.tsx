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
  edited?: boolean;
  replies: { [key: string]: CommentDataT };
  replyingToUser?: string; //the name of the user being replied to
  replyingToComment?: string; //the ID of the comment this reply is nested under
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
    replyingTo?: { id: string; user: string }
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
    replyingTo?: { id: string; user: string }
  ) {
    if (replyingTo && recipeData[recipeID]?.comments[replyingTo.id]) {
      //create reply
      const newReply = {
        id: uuid(),
        recipeID,
        userID,
        content: comment,
        time: new Date(),
        likeCount: 0,
        replies: {},
        replyingToUser: replyingTo.user,
        replyingToComment: replyingTo.id,
      };

      //save reply
      setRecipeData((prev) => {
        try {
          const newData = { ...prev };

          newData[recipeID].comments[replyingTo.id].replies[newReply.id] =
            newReply;

          return newData;
        } catch {
          console.log(
            "Failed to post reply to: " + recipeID + " " + replyingTo.id
          );
          return prev;
        }
      });
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
        try {
          const newData = { ...prev };
          newData[recipeID].comments[newComment.id] = newComment;
          return newData;
        } catch {
          console.log("Failed to post comment to: " + recipeID);
          return prev;
        }
      });
    }
  }
  function updateComment(
    recipeID: string,
    commentID: string,
    comment: string,
    replyID?: string
  ) {
    if (replyID && false) {
      //if replyID is defined, then update the reply with that ID
    } else {
      //update the comment
      setRecipeData((prev) => {
        try {
          const newData = { ...prev };

          newData[recipeID].comments[commentID].edited =
            newData[recipeID].comments[commentID].content !== comment;

          newData[recipeID].comments[commentID].content = comment;
          return newData;
        } catch {
          console.log(
            "Failed to update comment: " + recipeID + ", " + commentID
          );
          return prev;
        }
      });
    }
  }
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
        try {
          const newData = { ...prev };
          delete newData[recipeID].comments[commentID];
          return newData;
        } catch {
          console.log(
            "Failed to delete comment: " + recipeID + ", " + commentID
          );
          return prev;
        }
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
