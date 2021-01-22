
import React, { useState, useEffect } from "react";
import axios from "axios";
import Assassinate from "../assassinate/assassinate";
import Pending from "../assassinate/pending";

export default function PlayerTarget() {
    const [isPending, setIsPending] = useState(false);
    const [target, setTarget] = useState({});

    function getIsPending() {
        axios.get("/api/pending", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    setIsPending(res.data);
                }

                setTimeout(getIsPending, 1000);
            })
            .catch(err => {
                console.log(err);
            });
    }

    function getTarget() {
        axios.get("/api/target", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    setTarget(res.data);
                }

                setTimeout(getTarget, 1000);
            })
            .catch(err => {
                console.log(err);
            });
    }

    useEffect(() => {
        getTarget();
        getIsPending();
    }, []);

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