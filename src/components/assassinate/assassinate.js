
import React from "react";
import axios from "axios";

export default function Assassinate(props) {
    function onAssassinate(e) {
        e.preventDefault();

        axios.get("/api/assassinate", { withCredentials: true })
            .then(res => {
                console.log(res);
            })
            .catch(err => {
                console.log(err);
            });
    }

    return (
        <React.Fragment>
            <br />
            <form onSubmit={onAssassinate}>
                <div className="form-group">
                    {
                        props.target.isPending ?
                            <button className="btn btn-primary" type="button" disabled>
                                <span className="spinner-border spinner-border-sm mx-1" role="status" aria-hidden="true"></span>
                                <span className="mx-1">Pending...</span>
                            </button> :
                            <input type="submit" value="Assassinate" className="btn btn-primary" />
                    }
                </div>
            </form>
        </React.Fragment>
    );
}