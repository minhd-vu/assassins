import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";

import Navbar from "./components/navbar.component";
import Login from "./components/login.component";
import Register from "./components/register.component";
import Home from "./components/home.component";

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			isAuthenticated: false,
			username: null
		}

		this.setUser = this.setUser.bind(this);
	}

	setUser(user) {
		this.setState(user);
	}

	render() {
		return (
			<Router>
				<div className="container">
					<Navbar isAuthenticated={this.isAuthenticated} setUser={this.setUser} />
					<br />
					<Route path="/" exact component={Home} />
					<Route path="/login" render={() => <Login setUser={this.setUser} />} />
					<Route path="/register" component={Register} />
				</div>
			</Router >
		);
	}
}

export default App;
