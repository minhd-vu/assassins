import React, { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import { Link } from "react-router-dom";
import axios from "axios";

export default function NavigationBar() {
    const user = useContext(UserContext);

    function onLogout() {
        axios.get("/api/logout", { withCredentials: true })
            .then(res => {
                console.log(res);
                if (res.status === 200) {
                    user.setIsAuth(false);
                    user.setUsername("");
                    user.setPartyCode("");
                }
            });
    }

    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark" sticky="top">
            <Navbar.Brand as={Link} to="/">Assassins</Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
                <Nav className="mr-auto">
                    {
                        user.isAuth ?
                            <React.Fragment>
                                <Nav.Link as={Link} to="/login" onClick={onLogout}>Logout</Nav.Link>
                                <Nav.Link as={Link} to={"/user/" + user.username}>Profile</Nav.Link>
                            </React.Fragment> :
                            <React.Fragment>
                                <Nav.Link as={Link} to="/login">Login</Nav.Link>
                                <Nav.Link as={Link} to="/register">Register</Nav.Link>
                            </React.Fragment>
                    }
                    <Nav.Link as={Link} to="/help">Help</Nav.Link>
                    <Nav.Link as={Link} to="/about">About</Nav.Link>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
    );
}