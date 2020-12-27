import React, { useState } from "react";
import PartyCreate from "./party.create";
import PartyJoin from "./party.join";

export default function PartyForm() {
    const [error, setError] = useState("");

    return (
        <div className="text-center">
            {
                error && <div className="alert alert-danger" role="alert">{error}</div>
            }
            <PartyJoin setError={setError} />
            <PartyCreate/>
        </div>
    );
}