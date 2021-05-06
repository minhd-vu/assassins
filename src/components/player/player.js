import React, { useContext } from "react";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { UserContext } from "../../contexts/user.context";

export default function Player(props) {
    const user = useContext(UserContext);

    function renderLifeStatus() {
        return props.player.isAlive ?
            <span className="mx-1 badge badge-success">Alive</span> :
            <span className="mx-1 badge badge-danger">Dead</span>
    }

    const onKickPlayer = () => {
        console.log("Kick Player");
    }

    const onMakeAdmin = () => {
        console.log("Make Admin");
    }

    const popover = (
        <Popover id="popover-basic">
            <Popover.Content>
                <div className="text-center">
                    <div>
                        <button className="mx-1 badge btn-danger" onClick={onKickPlayer}>Kick Player</button>
                    </div>
                    <div>
                        <button className="mx-1 badge btn-warning">Make Admin</button>
                    </div>
                </div>
            </Popover.Content>
        </Popover>
    );

    const player = (
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
    );

    return (
        <div className="mr-2 mb-2 justify-content-between">
            {
                user.isAdmin ?
                    <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                        {player}
                    </OverlayTrigger> :
                    player
            }
        </div>
    );
}