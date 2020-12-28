import Form from "react-bootstrap/Form";
import axios from "axios";
import React, { useState } from "react";

export default function PartyAdmin(props) {
    const [gameMode, setGameMode] = useState("Classic");

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
                <Form inline className="justify-content-center">
                    <Form.Label className="mx-1">Game Mode:</Form.Label>
                    <Form.Control className="mx-1" as="select" defaultValue={gameMode} onChange={e => setGameMode(e.target.value)}>
                        <option>Classic</option>
                        <option>Shuffle</option>
                    </Form.Control>
                </Form>
                <Form.Check className="justify-content-center">
                    <Form.Label className="mx-1">Show Players </Form.Label>
                    <Form.Control className="mx-1" as="select" defaultValue={gameMode} onChange={e => setGameMode(e.target.value)}>
                        <option>Classic</option>
                        <option>Shuffle</option>
                    </Form.Control>
                </Form.Check>
                <div className="form-group my-2">
                    <input type="submit" value="Start Party" className="btn btn-primary" />
                </div>
            </form>
        </React.Fragment>
    );
}