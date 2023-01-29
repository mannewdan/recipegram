import React from "react";

type DataContextType = {
  value: string;
};

const Context = React.createContext({} as DataContextType);
export function useDataContext() {
  return React.useContext(Context);
}

export function DataContextProvider(props: { children: React.ReactNode }) {
  return (
    <Context.Provider value={{ value: "hey" }}>
      {props.children}
    </Context.Provider>
  );
}
