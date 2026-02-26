import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useTheme } from "../../context/ThemeContext";

const Navbar = () => {
    const { user, logout } = useAuth();
    const { isDark, toggleTheme } = useTheme();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="navbar">
            <Link to="/" className="nav-brand">StockDash</Link>

            <div className="nav-links">
                {user ? (
                    <>
                        <span>Hi, {user.name}</span>
                        <Link to="/">Dashboard</Link>
                        <Link to="/transactions">Transactions</Link>
                        {user.role === "admin" && <Link to="/admin">Admin</Link>}
                        <button onClick={handleLogout}>Logout</button>
                    </>
                ) : (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="/signup">Sign Up</Link>
                    </>
                )}
                <button onClick={toggleTheme}>{isDark ? "Light" : "Dark"}</button>
            </div>
        </nav>
    );
};

export default Navbar;
