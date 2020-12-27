import React, { Component } from "react";
import { Redirect } from "react-router-dom";
import axios from "axios";
import { UserContext } from "../../contexts/user.context";
import PartyCreate from "./party.create";

export default class PartyForm extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.onJoinParty = this.onJoinParty.bind(this);
        this.onChangePartyCode = this.onChangePartyCode.bind(this);

        this.state = {
            partyCode: "",
            error: ""
        };
    }

    onJoinParty(e) {
        e.preventDefault();

        axios.get("/api/join/" + this.state.partyCode, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    this.context.setPartyCode(res.data.code);
                    this.context.setIsAdmin(false);
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    this.setState({ redirectTo: "/login" });
                } else {
                    this.setState({ error: err.response.data });
                }
            });
    }

    onChangePartyCode(e) {
        this.setState({
            partyCode: e.target.value
        });
    }


    render() {
        if (this.state.redirectTo) return <Redirect to={{ pathname: this.state.redirectTo }} />;
        return (
            <div className="text-center">
                {
                    this.state.error &&
                    <div className="alert alert-danger" role="alert">{this.state.error}</div>
                }
                <PartyCreate/>
            </div>
        );
    }
}