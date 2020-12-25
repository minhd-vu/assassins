import React, { Component } from "react";
import { Redirect } from "react-router-dom"
import axios from "axios";
import { UserContext } from "../contexts/user.context";

export default class Register extends Component {
    static contextType = UserContext;

    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.canSubmit = this.canSubmit.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            username: "",
            password: "",
            confirmPassword: "",
            error: false
        }
    }

    onChange(e) {
        const { name, value } = e.target;
        this.setState({
            [name]: value
        });
    }

    onSubmit(e) {
        e.preventDefault();

        const user = {
            username: this.state.username,
            password: this.state.password
        }

        console.log(user);

        axios.post("/api/register", user, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    this.context.setUsername(user.username);
                    this.context.setIsAuth(true);
                    this.setState({ redirectTo: "/" });
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    this.setState({ error: true });
                }
            });
    }

    canSubmit() {
        return this.state.username.length > 0 && this.state.password.length > 0 && this.state.password === this.state.confirmPassword;
    }

    render() {
        if (this.state.redirectTo) return <Redirect to={{ pathname: this.state.redirectTo }} />;
        return (
            <div>
                <h3>Register</h3>
                {
                    this.state.error &&
                    <div className="alert alert-danger" role="alert">
                        Username is already in use.
                    </div>
                }
                <form onSubmit={this.onSubmit}>
                    <div className="form-group">
                        <label>Username: </label>
                        <input type="text"
                            name="username"
                            required
                            className="form-control"
                            value={this.state.username}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Password: </label>
                        <input
                            type="password"
                            name="password"
                            className="form-control"
                            value={this.state.password}
                            onChange={this.onChange}
                        />
                    </div>
                    <div className="form-group">
                        <label>Confirm Password: </label>
                        <input
                            type="password"
                            name="confirmPassword"
                            className="form-control"
                            value={this.state.confirmPassword}
                            onChange={this.onChange}
                        />
                    </div>

                    <div className="form-group">
                        <input type="submit" value="Register" disabled={!this.canSubmit()} className="btn btn-primary" />
                    </div>
                </form>
            </div>
        )
    }
}