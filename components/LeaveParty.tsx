"use client";

export default function LeaveParty() {
  async function leaveParty() {
    const res = await fetch("/api/party/leave", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }
  }

  return (
    <button className="btn btn-error" onClick={() => leaveParty()}>
      Leave Party
    </button>
  );
}
