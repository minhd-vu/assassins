"use client";

export default function StartGame({ visible }: { visible: boolean }) {
  if (!visible) {
    return;
  }

  async function startGame() {
    const res = await fetch("/api/party/start", {
      method: "POST",
    });

    if (!res.ok) {
      throw new Error(await res.json());
    }

    console.log(await res.json());
  }

  return (
    <button className="btn btn-success" onClick={() => startGame()}>
      Start Game
    </button>
  );
}
