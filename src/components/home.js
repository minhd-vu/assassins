import React, { useContext } from "react";
import Party from "./party/party"
import PartyForm from "./party/party.form"
import { UserContext } from "../contexts/user.context";

export default function Home() {
    const user = useContext(UserContext);

    return (
        user.partyCode ? <Party /> : <PartyForm />
    );
}