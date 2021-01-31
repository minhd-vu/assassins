import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";
import getKDRatio from "../helpers/getKDRatio";

export default function Profile(props) {
    const { username } = props.match.params;
    const [user, setUser] = useState({});
    const [error, setError] = useState(false);

    useEffect(() => {
        axios.get("/api/user/" + username, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setUser(res.data);
                    setError(false);
                } else if (res.status === 204) {
                    setError(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [username]);

    return (
        <React.Fragment>
            <h3>Profile</h3>
            {
                error ?
                    <Alert key="danger" variant="danger">No user found with username <b>{username}</b>.</Alert> :
                    <table className="table">
                        <thead className="thead-light">
                            <tr>
                                <th scope="col">Rank</th>
                                <th scope="col">Name</th>
                                <th scope="col">Wins</th>
                                <th scope="col">Kills</th>
                                <th scope="col">Deaths</th>
                                <th scope="col">K/D</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{user.rank}</td>
                                <td>{username}</td>
                                <td>{user.wins}</td>
                                <td>{user.elims}</td>
                                <td>{user.deaths}</td>
                                <td>{getKDRatio(user.elims, user.deaths)}</td>
                            </tr>
                        </tbody>
                    </table>
            }
        </React.Fragment>
    );
}