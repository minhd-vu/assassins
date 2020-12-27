import React, { useState, useContext } from "react";
import { useHistory } from "react-router-dom"
import axios from "axios";
import { UserContext } from "../../contexts/user.context";

export default function Register() {
    const history = useHistory();
    const user = useContext(UserContext);
    const [error, setError] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");

    function onSubmit(e) {
        e.preventDefault();

        if (password !== confirmPassword) {
            return setError("Passwords do not match.");
        }

        axios.post("/api/register", { username: username, password: password }, { withCredentials: true })
            .then(res => {
                if (res.status === 200) {
                    user.setUsername(username);
                    user.setIsAuth(true);
                    history.push("/");
                }
            })
            .catch(err => {
                console.log(err);
                if (err.response.status === 401) {
                    setError("Username is already in use.");
                }
            });
    }

    return (
        <div>
            <h3>Register</h3>
            {
                error && <div className="alert alert-danger" role="alert">{error}</div>
            }
            <form onSubmit={onSubmit}>
                <div className="form-group">
                    <label>Username: </label>
                    <input
                        type="text"
                        required
                        className="form-control"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Password: </label>
                    <input
                        type="password"
                        required
                        className="form-control"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label>Confirm Password: </label>
                    <input
                        type="password"
                        required
                        className="form-control"
                        value={confirmPassword}
                        onChange={e => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <input type="submit" value="Register" className="btn btn-primary" />
                </div>
            </form>
        </div>
    );
}