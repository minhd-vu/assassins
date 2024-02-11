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

async function confirmKill() {
  const res = await fetch(`/api/kill/confirm`, {
    method: "POST",
  });

  console.log(res.status);
}

async function denyKill() {
  const res = await fetch(`/api/kill/deny`, {
    method: "POST",
  });

  console.log(res.status, await res.json());
}

async function requestKill() {
  const res = await fetch(`/api/kill`, {
    method: "POST",
  });

  console.log(res.status);
}

async function getKill() {
  const res = await fetch(`/api/kill`);

  console.log(res.status, await res.json());
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
      <div>
        <button onClick={() => confirmKill()}>Confirm kill</button>
      </div>
      <div>
        <button onClick={() => denyKill()}>Deny kill</button>
      </div>
      <div>
        <button onClick={() => requestKill()}>Request kill</button>
      </div>
      <div>
        <button onClick={() => getKill()}>Get kill</button>
      </div>
    </>
  );
}
