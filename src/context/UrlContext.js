import { createContext, useContext } from "react";
export const UrlContext = createContext(null);
export const useUrl = () => useContext(UrlContext);

