
import React, { useState } from "react";
import axios from "axios";
import Assassinate from "../assassinate/assassinate";
import Pending from "../assassinate/pending";
import useInterval from "../../hooks/useInterval";

export default function PlayerTarget() {
    const [isPending, setIsPending] = useState(false);
    const [target, setTarget] = useState({});
    const [delay, setDelay] = useState(0);

    function getIsPending() {
        axios.get("/api/pending", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setIsPending(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    function getTarget() {
        axios.get("/api/target", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setTarget(res.data);
                }
            })
            .catch(err => {
                console.log(err);
            });
    }

    useInterval(() => {
        getTarget();
        getIsPending();
        if (delay === 0) setDelay(1000);
    }, delay);

    return (
        target &&
        <React.Fragment>
            <br />
            {
                target.username &&
                <div>
                    <h6>Target: </h6>
                    <button type="button" className="btn btn-light">{target.username}</button>
                </div>
            }
            {
                isPending ? <Pending /> : <Assassinate />
            }
        </React.Fragment>
    );
}