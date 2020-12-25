
import { UserContext } from "../../contexts/user.context";
import axios from "axios";
import { useContext } from "react";
import { Link } from "react-router-dom";

export default function NavbarAuth() {
    const user = useContext(UserContext);

    function onLogout(e) {
        e.preventDefault();

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
        <div>
            <li className="navbar-item">
                <Link to="/" className="nav-link" onClick={onLogout}>Logout</Link>
            </li>
            <li className="navbar-item">
                <Link to="/profile" className="nav-link">Profile</Link>
            </li>
        </div>
    );
}