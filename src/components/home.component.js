import React, { Component } from "react";
import Party from "./party.component"
import PartyForm from "./party.form.component"
import { UserContext } from "../contexts/user.context";
import { useContext } from "react";

export default function Home() {
    const user = useContext(UserContext);
    
    return (
        user.partyCode ? <Party /> : <PartyForm />
    );
}