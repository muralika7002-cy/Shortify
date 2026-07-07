import "./Navbar.css";
import { FaLink } from "react-icons/fa";

function DashboardNavbar({ onLogout }) {
    return (
        <nav className="navbar">
            <div className="container navbar-container">

                <div className="logo">
                    <FaLink className="logo-icon" />
                    <span>Shortify</span>
                </div>

                <button
                    className="signup-btn"
                    onClick={onLogout}
                >
                    Logout
                </button>

            </div>
        </nav>
    );
}

export default DashboardNavbar;