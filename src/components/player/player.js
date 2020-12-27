import React from "react";

export default function Player(props) {
    function renderLifeStatus() {
        return props.player.isAlive ?
            <span className="mx-1 badge badge-success">Alive</span> :
            <span className="mx-1 badge badge-danger">Dead</span>
    }

    return (
        <div className="mr-2 mb-2 justify-content-between">
            <button type="button" className="btn btn-light">
                <span className="mx-1">{props.player.username}</span>
                {
                    props.isStarted && renderLifeStatus()
                }
                {
                    props.player.isAdmin &&
                    <span className="mx-1 badge badge-primary">Admin</span>
                }
            </button>
        </div>
    );
}