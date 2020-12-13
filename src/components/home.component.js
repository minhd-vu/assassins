import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import axios from "axios";

export default class Home extends Component {
    constructor(props) {
        super(props);

        this.onJoinParty = this.onJoinParty.bind(this);
        this.onChangePartyCode = this.onChangePartyCode.bind(this);
        this.onCreateParty = this.onCreateParty.bind(this);

        this.state = {
            partyCode: ""
        }
    }

    componentDidUpdate() {
        if (!this.props.isAuthenticated) this.setState({ redirectTo: "/login" });
    }

    onJoinParty(e) {
        e.preventDefault();

        axios.get("/api/party/" + this.state.partyCode, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                } else if (res.status === 401) {
                    this.setState({ redirectTo: "/login" });
                }
            });
    }

    onChangePartyCode(e) {
        this.setState({
            partyCode: e.target.value
        })
    }

    onCreateParty(e) {
        e.preventDefault();

        axios.get("/api/create", { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    console.log(res.data);
                } else if (res.status === 401) {
                    this.setState({ redirectTo: "/login" });
                }
            });
    }

    render() {
        if (this.state.redirectTo) return <Redirect to={{ pathname: this.state.redirectTo }} />;
        return (
            <div className="text-center">
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
                <br />
            </div>
        );
    }
}