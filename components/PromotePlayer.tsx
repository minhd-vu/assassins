import { Button } from "./Button";

export default function PromotePlayer({ playerId }: { playerId: string }) {
  return (
    <Button
      route="/api/party/promote"
      className="btn-square btn-xs btn-warning"
      spinnerSize="xs"
      body={JSON.stringify({ playerId })}
      tooltip="Promote"
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-4 w-4"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        transform="translate(0,-1)"
      >
        <path />
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M18 13l-6-6-6 6M18 19l-6-6-6 6"
        />
      </svg>
    </Button>
  );
}
