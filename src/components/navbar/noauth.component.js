
import { Link } from "react-router-dom";

export default function NavbarAuth() {
    return (
        <div>
            <li className="navbar-item">
                <Link to="/login" className="nav-link">Login</Link>
            </li>
            <li className="navbar-item">
                <Link to="/register" className="nav-link">Register</Link>
            </li>
        </div>
    );
}