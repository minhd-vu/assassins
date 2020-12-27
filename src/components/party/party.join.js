import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";

export default function PartyJoin(props) {
    const [partyCode, setPartyCode] = useState("");
    const history = useHistory();

    function onJoinParty(e) {
        e.preventDefault();

        axios.get("/api/join/" + this.state.partyCode, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    this.context.setPartyCode(res.data.code);
                    this.context.setIsAdmin(false);
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    history.push("/login");
                } else {
                    props.setError(err.response.data);
                }
            });
    }

    return (
        <form onSubmit={onJoinParty}>
            <div className="form-group">
                <input
                    type="text"
                    className="form-control"
                    value={partyCode}
                    onChange={e => setPartyCode(e.target.value)}
                    placeholder="Party Code"
                />
            </div>
            <div className="form-group">
                <input type="submit" value="Join Party" className="btn btn-primary" disabled={partyCode.length === 0} />
            </div>
        </form>
    );
}