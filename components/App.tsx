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
      {error && <Alert>{error}</Alert>}
      <Party />
    </ErrorContext.Provider>
  );
}
