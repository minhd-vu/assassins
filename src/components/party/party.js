import React, { useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import PlayerTarget from "../player/player.target";
import PartyLeave from "./party.leave";
import Player from "../player/player";
import PlayerList from "../player/player.list";
import PartyAdmin from "./party.admin";
import useInterval from "../../hooks/useInterval";

export default function Party() {
    const user = useContext(UserContext);
    const [party, setParty] = useState({});
    const [players, setPlayers] = useState([]);
    const [winner, setWinner] = useState("");
    const [error, setError] = useState("");

    function getParty() {
        axios.get("/api/party", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setParty(res.data);
                    if (res.data && res.data.players) {
                        setPlayers(res.data.players.map((player) =>
                            <Player
                                key={player.username}
                                player={player}
                                isStarted={res.data.isStarted}
                            />
                        ));

                        const alivePlayers = res.data.players.filter(player => player.isAlive);
                        if (alivePlayers.length === 1) {
                            setWinner(alivePlayers[0].username);
                        }
                    }
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    useInterval(() => {
        getParty();
    }, 1000);

    return (
        <div className="text-center">
            {
                error && <div className="alert alert-danger" role="alert">{error}</div>
            }
            {
                winner && party.isStarted && <div className="alert alert-success" role="alert">{winner} was the winner!</div>
            }
            <h4>Party Code: <b>{user.partyCode}</b></h4>
            {
                party.isStarted && <PlayerTarget />
            }
            {
                party.isStarted ? party.showPlayers && <PlayerList players={players} /> : <PlayerList players={players} />
            }
            {
                !party.isStarted && user.isAdmin && <PartyAdmin setError={setError} />
            }
            <PartyLeave />
        </div>
    );
}