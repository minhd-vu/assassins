import React from "react";
import Confirm from "./confirm";
import Deny from "./deny";

export default function Pending() {
    return (
        <React.Fragment>
            <br />
            <p>You have been assassinated.</p>
            <form>
                <div className="form-group">
                    <Confirm />
                    <Deny />
                </div>
            </form>
        </React.Fragment>
    );
}