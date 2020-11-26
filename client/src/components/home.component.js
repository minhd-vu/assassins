import React, { Component } from 'react';
import axios from 'axios';

export default class Home extends Component {

    constructor(props) {
        super(props);

        this.onChangePartyCode = this.onChangePartyCode.bind(this);
        this.onJoinParty = this.onJoinParty.bind(this);
        this.onCreateParty = this.onCreateParty.bind(this);

        this.state = {
            party_code: ''
        }
    }

    onJoinParty(e) {
        e.preventDefault();

        const party = {
            party_code: this.state.party_code
        }

        console.log(party);

        axios.post('http://localhost:5000/join', party)
            .then(res => console.log(res.data));

        // window.location = '/';
    }

    onChangePartyCode(e) {
        this.setState({
            party_code: e.target.value
        })
    }

    onCreateParty(e) {
        e.preventDefault();
    }

    render() {
        return (
            <div className="text-center">
                <form className="form-inline" onSubmit={this.onJoinParty}>
                    <div class="form-group mx-sm-3 mb-2">
                        <label for="partyCode" class="sr-only">Party Code</label>
                        <input
                            type="text"
                            className="form-control"
                            value={this.state.party_code}
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