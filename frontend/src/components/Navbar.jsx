import "./Navbar.css";
import { Link } from "react-router-dom";
import { FaLink } from "react-icons/fa";

function Navbar() {
    return (
        <nav className="navbar">
            <div className="container navbar-container">

                <Link to="/" className="logo">
                    <FaLink className="logo-icon" />
                    <span>Shortify</span>
                </Link>

                <ul className="nav-links">
                    <li><a href="#features">Features</a></li>
                    <li><a href="#how">How It Works</a></li>
                    <li><Link to="/login">Login</Link></li>
                    <li>
                        <Link to="/signup" className="signup-btn">
                            Sign Up
                        </Link>
                    </li>
                </ul>

            </div>
        </nav>
    );
}

export default Navbar;