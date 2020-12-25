import React, { Component } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { UserContext } from '../contexts/user.context';


export default class Navbar extends Component {
    static contextType = UserContext;

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
                    this.context.setIsAuth(false);
                    this.context.setUsername("");
                    this.context.setPartyCode("");
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
                                this.context.isAuth ?
                                    <Link to="/" className="nav-link" onClick={this.onLogout}>Logout</Link> :
                                    <Link to="/login" className="nav-link">Login</Link>
                            }
                        </li>
                        {
                            !this.context.isAuth &&
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