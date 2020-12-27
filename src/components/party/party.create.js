import { UserContext } from "../../contexts/user.context";
import { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

export default function PartyCreate() {
    const user = useContext(UserContext);
    const history = useHistory();

    function onCreateParty(e) {
        e.preventDefault();

        axios.get("/api/create", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    user.setPartyCode(res.data);
                    user.setIsAdmin(true);
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    history.push("/login");
                }
            });
    }

    return (
        <form onSubmit={onCreateParty}>
            <div className="form-group">
                <input type="submit" value="Create Party" className="btn btn-primary" />
            </div>
        </form>
    );
}