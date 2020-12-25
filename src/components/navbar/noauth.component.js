
import { Link } from "react-router-dom";
import React from "react";

export default function NavbarAuth() {
    return (
        <React.Fragment>
            <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="navbar-item">
                <Link to="/register" className="nav-link">Register</Link>
            </li>
        </React.Fragment>
    );
}