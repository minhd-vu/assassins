import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import PlayerTarget from "../player/player.target";
import PartyLeave from "./party.leave";
import Player from "../player/player";
import PlayerList from "../player/player.list";
import PartyAdmin from "./party.admin";

export default function Party() {
    const user = useContext(UserContext);
    const [party, setParty] = useState({});
    const [players, setPlayers] = useState([]);
    const [error, setError] = useState("");

    useEffect(() => {
        const interval = setInterval(() => {
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
                        }
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="text-center">
            {
                error && <div className="alert alert-danger" role="alert">{error}</div>
            }
            <h4>Party Code: <b>{user.partyCode}</b></h4>
            {
                party.isStarted && <PlayerTarget />
            }
            <PlayerList players={players} />
            {
                !party.isStarted && user.isAdmin && <PartyAdmin setError={setError} />
            }
            <PartyLeave />
        </div>
    );
}