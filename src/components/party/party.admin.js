import Form from "react-bootstrap/Form";
import axios from "axios";
import React, { useState } from "react";
import Col from "react-bootstrap/Col";

export default function PartyAdmin(props) {
    const [gameMode, setGameMode] = useState("Classic");
    const [showPlayers, setShowPlayers] = useState(true);

    function onStartParty(e) {
        e.preventDefault();

        axios.post("/api/start", { gameMode: gameMode, showPlayers: showPlayers }, { withCredentials: true })
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
            <Form onSubmit={onStartParty}>
                <Form.Group>
                    <Form.Row className="justify-content-center align-items-center">
                        <Form.Label column xs="auto">Game Mode:</Form.Label>
                        <Col xs="auto">
                            <Form.Control as="select" defaultValue={gameMode} onChange={e => setGameMode(e.target.value)}>
                                <option>Classic</option>
                                <option>Shuffle</option>
                            </Form.Control>
                        </Col>
                    </Form.Row>
                </Form.Group>
                <Form.Group>
                    <Form.Check type="checkbox" label="Show Players" checked={showPlayers} onChange={e => setShowPlayers(!showPlayers)} />
                </Form.Group>
                <Form.Group>
                    <input type="submit" value="Start Party" className="btn btn-primary" />
                </Form.Group>
            </Form>
        </React.Fragment>
    );
}