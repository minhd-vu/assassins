import React from "react";

export default function PlayerList(props) {
    return (
        <React.Fragment>
            <br />
            <div>
                <h6>Players:</h6>
                <div className="d-flex flex-wrap justify-content-center align-items-top">
                    {props.players}
                </div>
            </div>
        </React.Fragment>
    );
}