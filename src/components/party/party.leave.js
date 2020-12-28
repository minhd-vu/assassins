import { UserContext } from "../../contexts/user.context";
import React, { useContext } from "react";
import axios from "axios";

export default function PartyLeave() {
    const user = useContext(UserContext);

    function onLeaveParty(e) {
        e.preventDefault();

        axios.get("/api/leave", { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    user.setPartyCode("");
                    user.setIsAdmin(false);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <React.Fragment>
            <br />
            <form onSubmit={onLeaveParty}>
                <div className="form-group">
                    <input type="submit" value="Leave Party" className="btn btn-primary" />
                </div>
            </form>
        </React.Fragment>
    );
}