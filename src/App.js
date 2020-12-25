import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from "axios";

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";

export default class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuth: false,
			username: null,
			partyCode: null
		}

		this.getUser = this.getUser.bind(this);
		this.setUser = this.setUser.bind(this);
	}

	getUser() {
		axios.get("/api/login", { withCredentials: true })
			.then(res => {
				console.log(res.data);
				if (res.status === 200) {
					this.setState({
						isAuth: true,
						username: res.data.username,
						partyCode: res.data.partyCode
					});
				}
			}).catch(err => {
				console.log(err);
			});
	}

	setUser(user) {
		this.setState(user);
	}

	componentDidMount() {
		this.getUser();
	}

	render() {
		return (
			<Router>
				<div className="container">
					<Navbar isAuth={this.state.isAuth} setUser={this.setUser} />
					<br />
					<Route path="/" exact render={() =>
						<Home
							isAuth={this.state.isAuth}
							partyCode={this.state.partyCode}
							setUser={this.setUser}
							isAdmin={this.state.isAdmin}
						/>
					} />
					<Route path="/login" render={() => <Login setUser={this.setUser} />} />
					<Route path="/register" component={Register} />
				</div>
			</Router >
		);
	}
}
