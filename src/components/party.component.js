import React, { Component } from "react";

export default class Party extends Component {
    constructor(props) {
        super(props);

        this.onLeaveParty = this.onLeaveParty.bind(this);
        this.onStartParty = this.onStartParty.bind(this);
    }

    onStartParty() {
    }

    onLeaveParty() {
        this.props.setUser({
            partyCode: ""
        });
    }

    render() {
        return (
            <div className="text-center">
                <h4>Party Code: <b>{this.props.partyCode}</b></h4>
                <label className="col-sm-2 col-form-label">Target</label>

                {
                    this.props.isAdmin &&
                    <form onSubmit={this.onStartParty}>
                        <div className="form-group">
                            <input type="submit" value="Start Party" className="btn btn-primary" />
                        </div>
                    </form>
                }
                <form onSubmit={this.onLeaveParty}>
                    <div className="form-group">
                        <input type="submit" value="Leave Party" className="btn btn-primary" />
                    </div>
                </form>
            </div>
        );
    }
}