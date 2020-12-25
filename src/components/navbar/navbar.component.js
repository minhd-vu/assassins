import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../contexts/user.context";
import NavbarAuth from "./auth.component";
import NavbarNoAuth from "./noauth.component";

export default function Navbar() {
    const user = useContext(UserContext);

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link to="/" className="navbar-brand">Assassins</Link>
            <div className="collpase navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {
                        user.isAuth ? <NavbarAuth /> : <NavbarNoAuth />
                    }
                </ul>
            </div>
        </nav >
    );
}