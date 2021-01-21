import React from "react";
import Confirm from "./confirm";
import Deny from "./deny";

export default function Pending() {
    return (
        <React.Fragment>
            <br />
            <p>You have been assassinated.</p>
            <Confirm/>
            <Deny/>
        </React.Fragment>
    );
}