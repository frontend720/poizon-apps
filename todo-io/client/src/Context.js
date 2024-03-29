import { createContext, useState } from 'react';

const Context = createContext();

export const ContextProvider = ({ children }) => {
  ;
  return <Context.Provider value={{ items: 1 }}>{children}</Context.Provider>;
};

export default Context;