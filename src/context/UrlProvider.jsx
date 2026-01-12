import { useState } from "react";
import { UrlContext } from "./UrlContext.js";

export const UrlProvider = ({ children }) => {
  const [shortUrls, setShortUrls] = useState(["http://localhost:5173/","http://localhost:5173/"]);

  return (
    <UrlContext.Provider value={{ shortUrls, setShortUrls }}>
      {children}
    </UrlContext.Provider>
  );
};


