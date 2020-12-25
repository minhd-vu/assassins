import { useEffect, useState } from "react";
import axios from "axios";
import Alert from "react-bootstrap/Alert";

export default function Profile(props) {
    const { username } = props.match.params;
    const [elims, setElims] = useState(0);
    const [deaths, setDeaths] = useState(0);
    const [createdAt, setCreatedAt] = useState(Date.now);
    const [updatedAt, setUpdatedAt] = useState(Date.now);
    const [error, setError] = useState(false);
    const options = { year: "numeric", month: "short", day: "numeric" };

    useEffect(() => {
        console.log("username" + username);
        axios.get("/api/user/" + username, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setElims(res.data.elims);
                    setDeaths(res.data.deaths);
                    setCreatedAt(new Date(res.data.createdAt).toLocaleDateString("en-US", options));
                    setUpdatedAt(new Date(res.data.updatedAt).toLocaleDateString("en-US", options));
                    setError(false);
                } else if (res.status === 204) {
                    setError(true);
                }
            })
            .catch(err => {
                console.log(err);
            });
    });

    return (
        error ?
            <Alert key="danger" variant="danger">No user found with username <b>{username}</b>.</Alert> :
            <div className="text-center">
                <h5>{username}</h5>
                <p>Kills: <b>{elims}</b></p>
                <p>Deaths: <b>{deaths}</b></p>
                <p>K/D: <b>{(elims / deaths).toFixed(2)}</b></p>
                <p>Account Created: <b>{createdAt}</b></p>
                <p>Last Login: <b>{updatedAt}</b></p>
            </div>
    );
}