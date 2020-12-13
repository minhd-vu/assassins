import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";

export default class Navbar extends Component {
    constructor(props) {
        super(props);

        this.onLogout = this.onLogout.bind(this);
    }

    onLogout(e) {
        e.preventDefault();

        axios.get("/api/logout", { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    this.props.setUser({
                        isAuthenticated: false,
                        username: null
                    });
                }
            });
    }

    render() {
        return (
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/" className="navbar-brand">Assassins</Link>
                <div className="collpase navbar-collapse">
                    <ul className="navbar-nav mr-auto">
                        <li className="navbar-item">
                            {
                                this.props.isAuthenticated ?
                                    <Link to="/" className="nav-link" onClick={this.onLogout}>Logout</Link> :
                                    <Link to="/login" className="nav-link">Login</Link>
                            }
                        </li>
                        {
                            !this.props.isAuthenticated &&
                            <li className="navbar-item">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                        }
                    </ul>
                </div>
            </nav >
        );
    }
}