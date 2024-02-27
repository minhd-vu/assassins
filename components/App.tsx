"use client";

import { Dispatch, SetStateAction, createContext, useState } from "react";
import Party from "./Party";
import Alert from "./Alert";

type ErrorContextProps = {
  error?: string;
  setError: Dispatch<SetStateAction<string | undefined>>;
};

export const ErrorContext = createContext<ErrorContextProps>(undefined!);

export default function App() {
  const [error, setError] = useState<string>();

  return (
    <ErrorContext.Provider value={{ error, setError }}>
      <div className="flex flex-col items-center">
        <div className="h-20 flex items-center justfy-center">
          {error && <Alert>{error}</Alert>}
        </div>
        <Party />
      </div>
    </ErrorContext.Provider>
  );
}
