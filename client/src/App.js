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
		this.setUser = this.setUser.bind(this);
	}

	getUser() {
		axios.get('http://localhost:5000/login', { withCredentials: true })
			.then(res => {
				console.log(res.data);
				if (res.status === 200) {
					this.setState({
						isAuthenticated: true,
						username: res.data.username
					});
				}
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
					<Navbar isAuthenticated={this.state.isAuthenticated} setUser={this.setUser} />
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
