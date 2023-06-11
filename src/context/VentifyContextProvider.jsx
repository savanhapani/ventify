import { createContext, useState } from "react";

const VentifyContext = createContext();

function VentifyContextProvider({ children }) {
  const [loggedInBatchYear, setLoggedInBatchYear] = useState(
    localStorage.getItem("loggedInBatchYear") || 0
  );

  return (
    <VentifyContext.Provider
      value={{ loggedInBatchYear, setLoggedInBatchYear }}
    >
      {children}
    </VentifyContext.Provider>
  );
}

export { VentifyContext, VentifyContextProvider };
