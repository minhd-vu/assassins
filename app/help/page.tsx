import Link from "next/link";

export default function Help() {
  return (
    <div className="prose m-6">
      <h1 id="how-to-play">How to Play</h1>
      <p>
        Assassins is a live action game that can be played almost anywhere, but
        best done in semi-crowded environments. The goal of the game is to be
        the last remaining person alive and to assassinate whomever you are
        assigned.
      </p>
      <h2 id="login">Login</h2>
      <p>
        Before doing anything, you should create a user. It will keep track of
        your statistics as well as identifying who you are in a party. You can
        register yourself by heading to the register link in the navbar. Once
        you create a user, you will no longer be able to change the username or
        password.
      </p>
      <p>
        If you already have a user, you can login by heading to the login link
        in the navbar.
      </p>
      <h2 id="party-system">Party System</h2>
      <p>
        Once you have logged in you have the option of joining or creating a
        party. A party is an instance of the assassins game; it is how you
        connect with your friends.
      </p>
      <h3 id="join-a-party">Join a Party</h3>
      <p>
        To join a party, type in the party code in the input field on the{" "}
        <Link href="/">home page</Link> then click the{" "}
        <strong>Join Party</strong> button. Once a party has started you can no
        longer join it.
      </p>
      <h3 id="create-a-party">Create a Party</h3>
      <p>
        To create a party, click the <strong>Create Party</strong> button on the
        home page. Once you have created it, the app will display the party code
        in bold. Give this code to your friends so that they can join.
      </p>
      <h3 id="leave-a-party">Leave a Party</h3>
      <p>
        Once you join a party, you have the option of leaving it. You can leave
        it anytime, and the app will handle the reshuffling of players.
      </p>
      <h3 id="start-a-party">Start a Party</h3>
      <p>
        Only the party leader can start the party. Once started everyone is
        assigned a target.
      </p>
      <h2 id="eliminate-targets">Eliminate Targets</h2>
      <p>
        You will be assigned a target to assassinate, hence the name{" "}
        <em>assassins</em>. Once you assassinated your target, either by means
        of dart blasters, tag, projectile launchers, or any other method, click
        the <strong>Kill Target</strong> button.
      </p>
      <p>
        A notification will be send to the target just eliminated, the target
        will have option of confirming or denying the assassination attempt. If
        the attempt is denied, the game continues; this is in place to prevent
        accidental clicks. If the attempt is successful, you will be assigned a
        new target depending on the game mode.
      </p>
      <h2 id="game-modes">Game Modes</h2>
      <h3 id="classic">Classic</h3>
      <p>
        When you assassinate a target, your next target will be the target your
        target had.
      </p>
      <h3 id="shuffle">Shuffle</h3>
      <p>
        When a player assassinates a target, all players will receive a new
        target from the remaining players alive.
      </p>
    </div>
  );
}
