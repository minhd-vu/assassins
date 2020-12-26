import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../../contexts/user.context";
import { Redirect } from "react-router-dom";
import axios from "axios";

export default function Party() {
    const user = useContext(UserContext);
    const [redirectTo, setRedirectTo] = useState("");
    const [party, setParty] = useState({});
    const [players, setPlayers] = useState([]);

    useEffect(() => {
        const interval = setInterval(() => {
            user.partyCode && axios.get("/api/party", { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {
                        setParty(res.data);
                        if (res.data && res.data.players) {
                            setPlayers(res.data.players.map((player) =>
                                <li key={player.username} className="list-group-item">{player.username}</li>
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

    function onStartParty(e) {
        e.preventDefault();
    }

    function onLeaveParty(e) {
        e.preventDefault();

        axios.get("/api/leave", { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    user.setPartyCode("");
                    user.setIsAdmin(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    if (redirectTo) return <Redirect to={{ pathname: redirectTo }} />;
    return (
        <div className="text-center">
            <h4>Party Code: <b>{user.partyCode}</b></h4>
            <ul className="list-group">
                {players}
            </ul>
            <br />
            {
                !party.isStarted &&
                user.isAdmin &&
                <form onSubmit={onStartParty}>
                    <div className="form-group">
                        <input type="submit" value="Start Party" className="btn btn-primary" />
                    </div>
                </form>
            }
            <form onSubmit={onLeaveParty}>
                <div className="form-group">
                    <input type="submit" value="Leave Party" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}