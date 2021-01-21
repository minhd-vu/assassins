
import React from "react";
import axios from "axios";

export default function Deny() {
    function onClick(e) {
        e.preventDefault();

        axios.get("/api/deny", { withCredentials: true })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <button onClick={onClick} className="mx-1 btn btn-danger">Deny</button>
    );
}