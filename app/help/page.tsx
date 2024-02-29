import Link from "next/link";

export default function Help() {
  return (
    <div className="flex justify-center m-6">
      <div className="prose md:w-full lg:w-1/2">
        <h1 id="how-to-play">How to Play</h1>
        <h2 id="about">About</h2>
        <p>
          Welcome to Assassins, a thrilling live-action game designed for play
          in semi-crowded environments. The ultimate objective is to emerge as
          the last surviving player while successfully assassinating your
          assigned targets. Here&apos;s a step-by-step guide to get you started:
        </p>
        <h2 id="login">Login</h2>
        <p>
          Before diving into the action, create a user account to track your
          statistics and establish your identity within the game. Click on the{" "}
          <Link href="/api/auth/signin">Login</Link> button in the navbar to
          regsister an account. Note that once your user is created, changes to
          the username are no longer possible. If you already have a user,
          simply sign in by clicking on the login button.
        </p>
        <h2 id="party-system">Party System</h2>
        <p>
          Upon logging in, you have the option to either join an existing party
          or create a new one. A party serves as an instance of the Assassins
          game and is how you connect with friends.
        </p>
        <h3 id="join-a-party">Join a Party</h3>
        <p>
          Type the party code into the input field on the{" "}
          <Link href="/">home page</Link> and click the{" "}
          <strong>Join Party</strong> button. Once a party has started, joining
          is no longer possible.
        </p>
        <h3 id="create-a-party">Create a Party</h3>
        <p>
          Click the <strong>Create Party</strong> button on the{" "}
          <Link href="/">home page</Link>. The app will display the
          six-character party code at the top; share this code with your friends
          for them to join.
        </p>
        <h3 id="leave-a-party">Leave a Party</h3>
        <p>
          You can leave a party at any time, and the app will handle player
          reshuffling.
        </p>
        <h3 id="start-a-party">Start a Party</h3>
        <p>
          Only the party leader can initiate the party. Once started, everyone
          is assigned a target.
        </p>
        <h2 id="eliminate-targets">Eliminate Targets</h2>
        <p>
          Your objective is to assassinate the assigned targets, utilizing
          methods such as dart blasters, tag, projectile launchers, or any
          approved means. Click the <strong>Kill Target</strong> button after
          eliminating your target.
        </p>
        <p>
          A notification is sent to the eliminated target, who can choose to
          confirm or deny the assassination attempt. If denied, the game
          continues to avoid accidental clicks. If successful, you are assigned
          a new target based on the selected game mode.
        </p>
        <h2 id="game-modes">Game Modes</h2>
        <p>Choose from different game modes to spice up the gameplay:</p>
        <h3 id="classic">Classic</h3>
        <p>
          After assassinating a target, your next target will be the one your
          previous target had.
        </p>
        <h3 id="shuffle">Shuffle</h3>
        <p>
          When a player eliminates a target, all players receive new targets
          from the remaining participants.
        </p>
        <h2>Good Luck!</h2>
        <p className="italic">
          Embark on the adrenaline-pumping journey of Assassins, where strategy
          and stealth determine your survival and success!
        </p>
      </div>
    </div>
  );
}
