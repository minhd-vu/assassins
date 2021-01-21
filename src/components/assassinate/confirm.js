import { UserContext } from "../../contexts/user.context";
import React, { useContext } from "react";
import axios from "axios";

export default function Confirm() {
    const user = useContext(UserContext);

    function onClick(e) {
        e.preventDefault();

        axios.get("/api/confirm", { withCredentials: true })
            .then(res => {
                console.log(res);
                user.setIsAlive(false);
                user.setTarget("");
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <button onClick={onClick} className="btn btn-success">Confirm</button>
    );
}