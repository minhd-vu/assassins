import { Link } from "react-router-dom";

export default function Help() {
    return (
        <div>
            <h3 id="how-to-play">How to Play</h3>
            <p>Assassins is a game that can be played almost anywhere, but best done in semi-crowded environments. The goal of the game is to be the last remaining person alive and to assassinate whomever you are assigned.</p>
            <h4 id="create-a-user">Create a User</h4>
            <p>Before doing anything, you should create a user. It will keep track of your statistics as well as identifying who you are in a party. You can register yourself by heading to the <Link to="/register">register</Link> link in the navbar. Once you create a user, you will no longer be able to change the username or password.</p>
            <p>If you already have a user, you can login by heading to the <Link to="/login">login</Link> link in the navbar.</p>
            <h4 id="party-system">Party System</h4>
            <p>Once you have logged in you have the option of joining or creating a party. A party is an instance of the assassins game; it is how you connect with your friends.</p>
            <h5 id="create-a-party">Create a Party</h5>
            <p>To create a party, click the <strong>Create Party</strong> button on the <Link to="/">home page</Link>. Once you have created it, the app will display the party code in <strong>bold</strong>. Give this code to your friends so that you they can join. When you create a party, you are given administrative rights. You are given the ability to kick players from the party and to start the party.</p>
            <h5 id="join-a-party">Join a Party</h5>
            <p>To join a party, type in the party code in the input field on the <Link to="/">home page</Link> then click the <strong>Join Party</strong> button. Once a party has started you can no longer join it.</p>
            <h5 id="leave-a-party">Leave a Party</h5>
            <p>Once you join a party, you have the option of leaving it. You can leave it anytime, and the app will handle the reshuffling of players.</p>
        </div>
    );
}