import Form from "react-bootstrap/Form";
import Col from "react-bootstrap/Row";
import axios from "axios";
import { useState } from "react";

export default function PartyAdmin(props) {
    const [gameMode, setGameMode] = useState("Classic");

    function onStartParty(e) {
        e.preventDefault();

        axios.post("/api/start", { gameMode: gameMode }, { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                }
            })
            .catch(err => {
                console.log(err);
                props.setError(err.response.data);
            });
    }

    return (
        <form onSubmit={onStartParty}>
            <Form.Group>
                <Form.Row>
                    <Form.Label column sm={4}>Game Mode:</Form.Label>
                    <Col sm={8}>
                        <Form.Control as="select" defaultValue={gameMode} onChange={e => setGameMode(e.target.value)}>
                            <option>Classic</option>
                            <option>Shuffle</option>
                        </Form.Control>
                    </Col>
                </Form.Row>
            </Form.Group>
            <div className="form-group">
                <input type="submit" value="Start Party" className="btn btn-primary" />
            </div>
        </form>
    );
}