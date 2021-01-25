import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";

import Header from "./components/header";
import Footer from "./components/footer";
import Login from "./components/auth/login";
import Register from "./components/auth/register";
import Home from "./components/home";
import Help from "./components/help";
import Profile from "./components/profile";
import Leaderboard from "./components/leaderboard";

import { UserContext } from "./contexts/user.context";

export default class App extends Component {
	static contextType = UserContext;

	componentDidMount() {
		axios.get("/api/login", { withCredentials: true })
			.then(res => {
				console.log(res.data);
				if (res.status === 200) {
					this.context.setIsAuth(true);
					this.context.setUsername(res.data.username);
					this.context.setPartyCode(res.data.partyCode);
					this.context.setIsAdmin(res.data.isAdmin);
				}
			}).catch(err => {
				console.log(err);
			});
	}

	render() {
		return (
			<Router>
				<Header />
				<br />
				<Container>
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
					<Route path="/user/:username" render={props => <Profile {...props} />} />
					<Route path="/help" component={Help} />
					<Route path="/leaderboard" component={Leaderboard} />
				</Container>
				<br />
				<br />
				<br />
				<Footer />
			</Router >
		);
	}
}
