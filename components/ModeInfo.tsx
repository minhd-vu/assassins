export default function ModeInfo() {
  return (
    <div className="dropdown dropdown-hover dropdown-right">
      <svg
        tabIndex={0}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        className="stroke-info shrink-0 w-4 h-4"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
        ></path>
      </svg>
      <div
        tabIndex={0}
        className="dropdown-content z-[1] menu p-4 shadow bg-base-100 rounded-box w-96 space-y-1"
      >
        <h4 className="text-lg font-bold">Classic</h4>
        <p className="text-sm">
          When you successfully eliminate your target, your new target will
          become the former target of your victim.
        </p>
        <h4 className="text-lg font-bold">Shuffle</h4>
        <p className="text-sm">
          The stakes are higher. When you eliminate your target, the game takes
          an unexpected turn as all players&apos; targets are shuffled. Be the
          first to strike and disrupt others&apos; strategies.
        </p>
      </div>
    </div>
  );
}
