
import React, { useState, useEffect } from "react";
import axios from "axios";

export default function PlayerTarget() {
    const [target, setTarget] = useState({});
    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("/api/target", { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {
                        console.log(res.data);
                        setTarget(res.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    return (
        target &&
        <React.Fragment>
            <br />
            <div>
                <h6>Target: </h6>
                <button type="button" className="btn btn-light">{target.username}</button>
            </div>
        </React.Fragment>
    );
}