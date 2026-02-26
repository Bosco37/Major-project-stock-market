import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import LoginForm from "../components/auth/LoginForm";
import { loginUser } from "../services/api";

const LoginPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleLogin = async (email, password) => {
        try {
            const data = await loginUser(email, password);
            login(data);
            navigate("/");
        } catch (err) {
            setError("Invalid email or password");
        }
    };

    return (
        <div className="page-center">
            <h2>Login to your account</h2>
            {error && <p className="error-text">{error}</p>}
            <LoginForm onSubmit={handleLogin} />
            <p>
                Don't have an account? <a href="/signup">Sign up</a>
            </p>
        </div>
    );
};

export default LoginPage;
