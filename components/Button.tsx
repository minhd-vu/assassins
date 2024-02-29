import { MouseEvent, ReactNode, useContext, useState } from "react";
import { useSWRConfig } from "swr";
import { ErrorContext } from "./App";

export function Button({
  route,
  children,
  className,
  body,
  spinnerSize = "sm",
  tooltip,
}: {
  route: string;
  children: ReactNode;
  className?: string;
  body?: string;
  spinnerSize?: string;
  tooltip?: string;
}) {
  "use client";

  const [isLoading, setLoading] = useState(false);
  const { mutate } = useSWRConfig();
  const { setError } = useContext(ErrorContext);

  async function onClick(
    e: MouseEvent<HTMLButtonElement, globalThis.MouseEvent>,
  ) {
    e.stopPropagation();
    e.preventDefault();

    setLoading(true);

    const res = await fetch(route, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body,
    });

    if (!res.ok) {
      setError(await res.json());
      setLoading(false);
      return;
    }

    mutate("/api/user");
  }

  return (
    <div className="tooltip" data-tip={tooltip}>
      <button className={`btn ${className}`} onClick={(e) => onClick(e)}>
        <span className={isLoading ? "invisible" : "visible"}>{children}</span>
        {isLoading && (
          <span
            className={`loading loading-spinner loading-${spinnerSize} absolute`}
          />
        )}
      </button>
    </div>
  );
}

export function ConfirmKill() {
  return (
    <Button className="btn-success" route="/api/kill/confirm">
      Confirm Kill
    </Button>
  );
}

export function CreateParty() {
  return (
    <Button className="btn-primary" route="/api/party">
      Create Party
    </Button>
  );
}

export function DenyKill() {
  return (
    <Button className="btn-error" route="/api/kill/deny">
      Deny Kill
    </Button>
  );
}

export function KillTarget({ pending }: { pending: boolean }) {
  if (pending) {
    return (
      <button className="btn btn-accent">
        Pending
        <span className="loading loading-dots loading-sm" />
      </button>
    );
  }

  return (
    <Button route="/api/kill" className="btn-accent">
      Kill Target
    </Button>
  );
}

export function LeaveParty() {
  return (
    <Button route="/api/party/leave" className="btn-error">
      Leave Party
    </Button>
  );
}

export function StartGame() {
  return (
    <Button route="/api/party/start" className="btn-success">
      Start Game
    </Button>
  );
}

export function StopGame() {
  return (
    <Button route="/api/party/stop" className="btn-warning">
      Stop Game
    </Button>
  );
}
