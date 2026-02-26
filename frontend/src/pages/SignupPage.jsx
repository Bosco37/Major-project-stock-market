import React, { useState } from "react";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import SignupForm from "../components/auth/SignupForm";
import { registerUser } from "../services/api";

const SignupPage = () => {
    const { login } = useAuth();
    const navigate = useNavigate();
    const [error, setError] = useState("");

    const handleSignup = async (name, email, password) => {
        try {
            const data = await registerUser(name, email, password);
            login(data);
            navigate("/");
        } catch (err) {
            setError("Registration failed. Try again.");
        }
    };

    return (
        <div className="page-center">
            <h2>Create an account</h2>
            {error && <p className="error-text">{error}</p>}
            <SignupForm onSubmit={handleSignup} />
            <p>
                Already have an account? <a href="/login">Login</a>
            </p>
        </div>
    );
};

export default SignupPage;
