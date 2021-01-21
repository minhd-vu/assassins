
import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import Assassinate from "../assassinate/assassinate";
import Pending from "../assassinate/pending";

export default function PlayerTarget() {
    const [isPending, setIsPending] = useState(false);
    const [target, setTarget] = useState({});

    useEffect(() => {
        const interval = setInterval(() => {
            axios.get("/api/pending", { withCredentials: true })
                .then(res => {
                    if (res.status === 200) {
                        setIsPending(res.data);
                    }
                })
                .catch(err => {
                    console.log(err);
                });

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
            {
                isPending ? <Pending /> : <Assassinate />
            }
        </React.Fragment>
    );
}