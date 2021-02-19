import { Link } from "react-router-dom";

export default function Help() {
    return (
        <div>
            <h3>How to Play</h3>
            <p>Assassins is a live action game that can be played almost anywhere, but best done in semi-crowded environments. The goal of the game is to be the last remaining person alive and to assassinate whomever you are assigned.</p>

            <h4>Create a User</h4>
            <p>Before doing anything, you should create a user. It will keep track of your statistics as well as identifying who you are in a party. You can register yourself by heading to the <Link to="/register">register</Link> link in the navbar. Once you create a user, you will no longer be able to change the username or password.</p>
            <p>If you already have a user, you can login by heading to the <Link to="/login">login</Link> link in the navbar.</p>

            <h4>Party System</h4>
            <p>Once you have logged in you have the option of joining or creating a party. A party is an instance of the assassins game; it is how you connect with your friends.</p>

            <div className="row">
                <div className="col-sm">
                    <h5>Join a Party</h5>
                    <p>To join a party, type in the party code in the input field on the <Link to="/">home page</Link> then click the <strong>Join Party</strong> button. Once a party has started you can no longer join it.</p>
                </div>
                <div className="col-sm">
                    <h5>Create a Party</h5>
                    <p>To create a party, click the <strong>Create Party</strong> button on the <Link to="/">home page</Link>. Once you have created it, the app will display the party code in <strong>bold</strong>. Give this code to your friends so that they can join.</p>
                </div>
            </div>
            <div className="row">
                <div className="col-sm">
                    <h5>Leave a Party</h5>
                    <p>Once you join a party, you have the option of leaving it. You can leave it anytime, and the app will handle the reshuffling of players.</p>
                </div>
                <div className="col-sm">
                    <h5>Start a Party</h5>
                    <p>Only the party leader can start the party. Once started everyone is assigned a target.</p>
                </div>
            </div>

            <h4>Eliminate Targets</h4>
            <p>You will be assigned a target to assassinate, hence the name <i>assassins</i>. Once you assassinated your target, either by means of dart blasters, tag, projectile launchers, or any other method, click the <b>Assassinate</b> button.</p>
            <p>A notification will be send to the target just eliminated, the target will have option of confirming or denying the assassination attempt. If the attempt is denied, the game continues; this is inplace to prevent accidental misclicks. If the attempt is successful, you will be assigned a new target depending on the game mode.</p>

            <h4>Game Modes</h4>
            <dl className="row">
                <dt className="col-sm-3">Classic</dt>
                <dd className="col-sm-9">When you assassinate a target, your next target will be the target your target had.</dd>

                <dt className="col-sm-3">Shuffle</dt>
                <dd className="col-sm-9">When a player assassinates a target, all players will recieve a new target from the remaining players alive.</dd>
            </dl>
        </div>
    );
}