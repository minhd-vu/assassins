import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";
import Container from "react-bootstrap/Container";

import Header from "./components/header.component";
import Footer from "./components/footer.component";
import Login from "./components/auth/login.component";
import Register from "./components/auth/register.component";
import Home from "./components/home.component";
import About from "./components/about.component";
import Help from "./components/help.component";
import Profile from "./components/profile.component";

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
					<Route path="/about" component={About} />
					<Route path="/user/:username" render={props => <Profile {...props} />} />
					<Route path="/help" component={Help} />
				</Container>
				<Footer />
			</Router >
		);
	}
}
