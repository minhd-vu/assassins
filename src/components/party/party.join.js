import axios from "axios";
import { useState, useContext } from "react";
import { useHistory } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";

export default function PartyJoin(props) {
    const user = useContext(UserContext);
    const [partyCode, setPartyCode] = useState("");
    const history = useHistory();

    function onJoinParty(e) {
        e.preventDefault();

        axios.get("/api/join/" + partyCode, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    user.setPartyCode(res.data.code);
                    user.setIsAdmin(false);
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
                    required
                    value={partyCode}
                    onChange={e => setPartyCode(e.target.value)}
                    placeholder="Party Code"
                />
            </div>
            <div className="form-group">
                <input type="submit" value="Join Party" className="btn btn-primary" />
            </div>
        </form>
    );
}