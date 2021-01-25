import React, { useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

export default function Profile(props) {
    const { username } = props.match.params;
    const [elims, setElims] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [error, setError] = useState(false);
    const [rank, setRank] = useState(0);

    useEffect(() => {
        axios.get("/api/user/" + username, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setElims(res.data.elims);
                    setDeaths(res.data.deaths);
                    setRank(res.data.rank);
                    setError(false);
                } else if (res.status === 204) {
                    setError(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }, [elims, deaths, rank, error, username]);

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
                                <th scope="col">Kills</th>
                                <th scope="col">Deaths</th>
                                <th scope="col">K/D</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>{rank}</td>
                                <td>{username}</td>
                                <td>{elims}</td>
                                <td>{deaths}</td>
                                <td>{(elims / deaths).toFixed(2)}</td>
                            </tr>
                        </tbody>
                    </table>
            }
        </React.Fragment>
    );
}