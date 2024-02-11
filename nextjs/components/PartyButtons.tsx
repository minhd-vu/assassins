"use client";

async function createParty() {
  const res = await fetch("/api/party", {
    method: "POST",
  });

  console.log(await res.json());
}

async function getParty() {
  const res = await fetch("/api/party");

  console.log(await res.json());
}

async function startParty() {
  const res = await fetch(`/api/party/start`, {
    method: "POST",
  });

  console.log(res.status);
}

async function stopParty() {
  const res = await fetch(`/api/party/stop`, {
    method: "POST",
  });

  console.log(res.status);
}

async function leaveParty() {
  const res = await fetch(`/api/party/leave`, {
    method: "POST",
  });

  console.log(res.status);
}

export default function PartyButtons() {
  return (
    <>
      <div>
        <button onClick={() => createParty()}>Create party</button>
      </div>
      <div>
        <button onClick={() => getParty()}>Get party</button>
      </div>
      <div>
        <button onClick={() => startParty()}>Start party</button>
      </div>
      <div>
        <button onClick={() => stopParty()}>Stop party</button>
      </div>
      <div>
        <button onClick={() => leaveParty()}>Leave party</button>
      </div>
    </>
  );
}
