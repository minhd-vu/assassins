import Form from "react-bootstrap/Form";
import axios from "axios";
import React, { useState } from "react";
import Row from "react-bootstrap/Row";

export default function PartyAdmin(props) {
    const [gameMode, setGameMode] = useState("Classic");
    const [showPlayers, setShowPlayers] = useState(true);

    function onStartParty(e) {
        e.preventDefault();

        axios.post("/api/start", { gameMode: gameMode }, { withCredentials: true })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
                props.setError(err.response.data);
            });
    }

    return (
        <React.Fragment>
            <br />
            <form onSubmit={onStartParty}>
                {/* <Form.Group as={Row} className="justify-content-center"> */}
                    <Form.Label className="mx-1">Game Mode:</Form.Label>
                    <Form.Control className="mx-1" as="select" defaultValue={gameMode} onChange={e => setGameMode(e.target.value)}>
                        <option>Classic</option>
                        <option>Shuffle</option>
                    </Form.Control>
                {/* </Form.Group> */}
                <Form.Check type="checkbox" label="Show Players" defaultValue={showPlayers} onChange={e => setShowPlayers(e.target.value)} />
                <div className="form-group my-2">
                    <input type="submit" value="Start Party" className="btn btn-primary" />
                </div>
            </form>
        </React.Fragment>
    );
}