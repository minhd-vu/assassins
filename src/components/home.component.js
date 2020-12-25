import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import axios from "axios";
import Party from "./party.component"
import io from "socket.io-client";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.onJoinParty = this.onJoinParty.bind(this);
        this.onChangePartyCode = this.onChangePartyCode.bind(this);
        this.onCreateParty = this.onCreateParty.bind(this);

        this.state = {
            partyCode: "",
            error: false
        }
    }

    onSocketEvent() {
        // const socket = io();
        // socket.on("message", data => {
        //     console.log(data);
        // });
    }

    componentDidMount() {
        this.onSocketEvent();
    }

    componentDidUpdate() {
        this.onSocketEvent();
    }

    onJoinParty(e) {
        e.preventDefault();

        axios.get("/api/join/" + this.state.partyCode, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                    this.props.setUser({
                        partyCode: res.data
                    });
                } else if (res.status === 204) {
                    this.setState({ error: true });
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    this.setState({ redirectTo: "/login" });
                }
            });
    }

    onChangePartyCode(e) {
        this.setState({
            partyCode: e.target.value
        });
    }

    onCreateParty(e) {
        e.preventDefault();

        axios.get("/api/create", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    this.setState({ redirectTo: "/login" });
                }
            });
    }

    render() {
        if (this.state.redirectTo) return <Redirect to={{ pathname: this.state.redirectTo }} />;
        return (
            this.props.partyCode ?
                <Party />
                :
                <div className="text-center">
                    {
                        this.state.error &&
                        <div className="alert alert-danger" role="alert">
                            Cannot find party with code <b>{this.state.partyCode}</b>.
                        </div>
                    }
                    <form className="form-inline justify-content-center mb-3" onSubmit={this.onJoinParty}>
                        <div className="form-group mx-sm-3">
                            <input
                                type="text"
                                className="form-control"
                                value={this.state.partyCode}
                                onChange={this.onChangePartyCode}
                                id="partyCode"
                                placeholder="Party Code"
                            />
                        </div>
                        <div className="form-group">
                            <input type="submit" value="Join Party" className="btn btn-primary" disabled={this.state.partyCode.length === 0} />
                        </div>
                    </form>
                    <form onSubmit={this.onCreateParty}>
                        <div className="form-group">
                            <input type="submit" value="Create Party" className="btn btn-primary" />
                        </div>
                    </form>
                </div>
        );
    }
}