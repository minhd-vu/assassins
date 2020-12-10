import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.onChangePartyCode = this.onChangePartyCode.bind(this);
        this.onJoinParty = this.onJoinParty.bind(this);
        this.onCreateParty = this.onCreateParty.bind(this);

        this.state = {
            partyCode: ''
        }
    }

    onJoinParty(e) {
        e.preventDefault();

        const party = {
            partyCode: this.state.partyCode
        }

        console.log(party);

        axios.post('http://localhost:5000/join', party, { withCredentials: true })
            .then(res => console.log(res.data));
    }

    onChangePartyCode(e) {
        this.setState({
            partyCode: e.target.value
        })
    }

    onCreateParty(e) {
        e.preventDefault();

        axios.get('/create', { withCredentials: true })
            .then(res => {
                console.log(res.data);
                if (res.status === 200) {
                } else if (res.status === 401) {
                    this.setState({ redirectTo: '/login' });
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
                        <input type="submit" value="Join Party" className="btn btn-primary" />
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