import React from "react";
import { RecipeT } from "../components/Recipe";
import { v4 as uuid } from "uuid";
import dummyData from "../assets/dummyData.json";

const username = "bob";

type UserDataT = {
  likes: { [key: string]: boolean };
  comments: { [key: string]: string };
  favorites: { [key: string]: Date };
  commentLikes: { [key: string]: boolean };
};
type InteractionDataT = {
  liked: boolean;
  comments: number;
};
type HistoryDataT = {
  recipe: RecipeT;
  interactions: InteractionDataT;
};
export enum UserDataStatus {
  Like = "likes",
  Favorite = "favorites",
  CommentLikes = "commentLikes",
}
export type RecipeDataT = {
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
  getCurrentUser: () => string;
  toggleUserRecipeStatus: (id: string, whichStatus: UserDataStatus) => boolean;
  isUserRecipeStatusPositive: (
    id: string,
    whichStatus: UserDataStatus
  ) => boolean;
  addRecipeData: (recipe: RecipeT, liked?: boolean) => boolean;
  updateRecipeLikes: (recipe: RecipeT, change: number) => void;
  getFavoriteRecipes: () => Array<RecipeDataT>;
  getAllRecipes: () => Array<RecipeT>;
  getUserHistoryRecipes: () => {
    [key: string]: {
      recipe: RecipeT;
      interactions: { liked: boolean; comments: number };
    };
  };
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
  modifyCommentLikes: (
    recipeID: string,
    commentID: string,
    value: number,
    replyID?: string
  ) => void;
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
      : ({
          likes: {},
          comments: {},
          favorites: {},
          commentLikes: {},
        } as UserDataT);
  });
  const [recipeData, setRecipeData] = React.useState<{
    [key: string]: RecipeDataT;
  }>(() => {
    const data = localStorage.getItem("recipe-data");
    return data ? JSON.parse(data) : dummyData;
  });

  console.log(userData);

  //meta functions
  function getCurrentUser(): string {
    return username;
  }

  //recipe functions
  function toggleUserRecipeStatus(
    id: string,
    whichStatus: UserDataStatus
  ): boolean {
    if (!userData[whichStatus]) userData[whichStatus] = {};
    if (userData[whichStatus][id]) {
      setUserData((prev: UserDataT) => {
        const newData = { ...prev, [whichStatus]: { ...prev[whichStatus] } };
        delete newData[whichStatus][id];
        return newData;
      });

      return false;
    } else {
      setUserData((prev: UserDataT) => {
        return {
          ...prev,
          [whichStatus]: {
            ...prev[whichStatus],
            [id]: whichStatus === UserDataStatus.Favorite ? new Date() : true,
          },
        };
      });

      return true;
    }
  }
  function isUserRecipeStatusPositive(
    id: string,
    whichStatus: UserDataStatus
  ): boolean {
    return userData[whichStatus] && !!userData[whichStatus][id];
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
  function getFavoriteRecipes(): Array<RecipeDataT> {
    return Object.keys(userData.favorites).map((id) => {
      return {
        ...recipeData[id],
        lastInteraction: userData.favorites[id],
      };
    }) as RecipeDataT[];
  }
  function getAllRecipes(): Array<RecipeT> {
    return Object.values(recipeData).map((data) => data.recipe);
  }
  function getUserHistoryRecipes(): { [key: string]: HistoryDataT } {
    const data = {} as { [key: string]: HistoryDataT };
    const makeHistory = (recipeID: string): HistoryDataT => {
      const meta = getRecipeMetaData(recipeID);
      return {
        recipe: meta.recipe,
        interactions: { liked: false, comments: 0 },
      };
    };

    Object.keys(userData.likes).forEach((id) => {
      if (!data[id]) data[id] = makeHistory(id);
      data[id].interactions.liked = true;
    });
    Object.values<string>(userData.comments).forEach((id) => {
      if (!data[id]) data[id] = makeHistory(id);
      data[id].interactions.comments++;
    });

    return data;
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
    const id = uuid();
    //save to userdata
    setUserData((prev: UserDataT) => {
      return {
        ...prev,
        comments: {
          ...prev.comments,
          [id]: recipeID,
        },
      };
    });

    if (replyingTo && recipeData[recipeID]?.comments[replyingTo.id]) {
      //create reply
      const newReply = {
        id,
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
        return {
          ...prev,
          [recipeID]: {
            ...prev[recipeID],
            comments: {
              ...prev[recipeID].comments,
              [replyingTo.id]: {
                ...prev[recipeID].comments[replyingTo.id],
                replies: {
                  ...prev[recipeID].comments[replyingTo.id].replies,
                  [newReply.id]: newReply,
                },
              },
            },
          },
        };
      });
    } else {
      //create comment
      const newComment = {
        id,
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
  ) {
    if (
      replyID &&
      recipeData[recipeID]?.comments[commentID]?.replies[replyID]
    ) {
      //if replyID is defined, then update the reply with that ID
      setRecipeData((prev) => {
        const edited =
          prev[recipeID].comments[commentID].replies[replyID].content !==
          comment;

        return {
          ...prev,
          [recipeID]: {
            ...prev[recipeID],
            comments: {
              ...prev[recipeID].comments,
              [commentID]: {
                ...prev[recipeID].comments[commentID],
                replies: {
                  ...prev[recipeID].comments[commentID].replies,
                  [replyID]: {
                    ...prev[recipeID].comments[commentID].replies[replyID],
                    content: comment,
                    edited,
                  },
                },
              },
            },
          },
        };
      });
    } else {
      //update the comment
      setRecipeData((prev) => {
        const edited = prev[recipeID].comments[commentID].content !== comment;

        return {
          ...prev,
          [recipeID]: {
            ...prev[recipeID],
            comments: {
              ...prev[recipeID].comments,
              [commentID]: {
                ...prev[recipeID].comments[commentID],
                content: comment,
                edited,
              },
            },
          },
        };
      });
    }
  }
  function deleteComment(
    recipeID: string,
    commentID: string,
    replyID?: string
  ) {
    //remove from userdata
    setUserData((prev: UserDataT) => {
      const newData = { ...prev, comments: { ...prev.comments } };
      delete newData.comments[replyID ? replyID : commentID];
      return newData;
    });

    if (
      replyID &&
      recipeData[recipeID]?.comments[commentID]?.replies[replyID]
    ) {
      //if replyID is defined, then only delete the reply with that ID
      setRecipeData((prev) => {
        const newData = {
          ...prev,
          [recipeID]: {
            ...prev[recipeID],
            comments: {
              ...prev[recipeID].comments,
              [commentID]: {
                ...prev[recipeID].comments[commentID],
                replies: {
                  ...prev[recipeID].comments[commentID].replies,
                },
              },
            },
          },
        };
        delete newData[recipeID].comments[commentID].replies[replyID];
        return newData;
      });
    } else {
      //delete the comment, including all replies
      setRecipeData((prev) => {
        const newData = {
          ...prev,
          [recipeID]: {
            ...prev[recipeID],
            comments: {
              ...prev[recipeID].comments,
            },
          },
        };
        delete newData[recipeID].comments[commentID];
        return newData;
      });
    }
  }
  function getComments(
    recipeID: string
  ): { [key: string]: CommentDataT } | undefined {
    const recipeMetaData = getRecipeMetaData(recipeID);
    return recipeMetaData?.comments;
  }
  function modifyCommentLikes(
    recipeID: string,
    commentID: string,
    value: number,
    replyID?: string
  ) {
    if (
      replyID &&
      recipeData[recipeID]?.comments[commentID]?.replies[replyID]
    ) {
      //update the reply
      setRecipeData((prev) => {
        return {
          ...prev,
          [recipeID]: {
            ...prev[recipeID],
            comments: {
              ...prev[recipeID].comments,
              [commentID]: {
                ...prev[recipeID].comments[commentID],
                replies: {
                  ...prev[recipeID].comments[commentID].replies,
                  [replyID]: {
                    ...prev[recipeID].comments[commentID].replies[replyID],
                    likeCount:
                      prev[recipeID].comments[commentID].replies[replyID]
                        .likeCount + value,
                  },
                },
              },
            },
          },
        };
      });
    } else {
      //update the comment
      setRecipeData((prev) => {
        return {
          ...prev,
          [recipeID]: {
            ...prev[recipeID],
            comments: {
              ...prev[recipeID].comments,
              [commentID]: {
                ...prev[recipeID].comments[commentID],
                likeCount: prev[recipeID].comments[commentID].likeCount + value,
              },
            },
          },
        };
      });
    }
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
        getCurrentUser,
        toggleUserRecipeStatus,
        isUserRecipeStatusPositive,
        addRecipeData,
        getRecipeMetaData,
        updateRecipeLikes,
        getFavoriteRecipes,
        getAllRecipes,
        getUserHistoryRecipes,
        postComment,
        updateComment,
        deleteComment,
        getComments,
        modifyCommentLikes,
      }}
    >
      {props.children}
    </Context.Provider>
  );
}
