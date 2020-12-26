import React from "react";

export default function Players(props) {
    let players;
    if (props.players) props.players.map((player) => <li class="list-group-item">{player.username}</li>);

    return (
        <ul className="list-group">
            {players}
        </ul>
    );
}