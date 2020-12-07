import React, { Component } from 'react';
import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import axios from 'axios';

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

		this.getUser = this.getUser.bind(this);
		this.componentDidMount = this.componentDidMount.bind(this);
		this.updateUser = this.updateUser.bind(this);
	}

	render() {
		return (
			<Router>
				<div className="container">
					<Navbar />
					<br />
					<Route path="/" exact component={Home} />
					<Route path="/login" component={Login} />
					<Route path="/register" component={Register} />
				</div>
			</Router >
		);
	}
}

export default App;
