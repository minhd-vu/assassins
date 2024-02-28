import { ReactNode, useContext } from "react";
import { ErrorContext } from "./App";

export default function Alert({ children }: { children: ReactNode }) {
  const { setError } = useContext(ErrorContext);

  function onClick() {
    setError(undefined);
  }

  return (
    <div role="alert" className="alert alert-error text-sm py-2">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="stroke-current shrink-0 h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
        />
      </svg>
      <span>{toSentence(children)}</span>
      <button
        className="btn btn-square btn-xs btn-ghost"
        onClick={() => onClick()}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="stroke-current shrink-0 h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>
    </div>
  );
}

export function toSentence(children: ReactNode) {
  if (!children) {
    return;
  }

  let text = children.toString().trim();
  text = text.charAt(0).toUpperCase() + text.slice(1);
  if (text.charAt(text.length - 1) !== ".") {
    text += ".";
  }

  return text;
}
