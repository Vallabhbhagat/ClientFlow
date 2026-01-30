import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"
import "../style/Login.css"

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await fetch("http://localhost:5000/api/auth/login", {
                method: "POST",
                credentials: "include", // ✅ important for cookies
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            if (!res.ok) {
                const errorData = await res.json();
                throw new Error(errorData.message || 'Login failed');
            }

            const data = await res.json();
            setUser(data.user);

            alert("Successful Login!");

            // Redirect based on role
            if (data.user.role === "admin") {
                navigate("/admin-dashboard");
            } else {
                navigate("/member-dashboard");
            }

            setEmail("");
            setPassword("");
        } catch (error) {
            console.error(error);
            alert(error.message);
        }
    }

    return (
        <div className="auth-container">
            <div className="auth-card">
                <h2>Login</h2>

                <form onSubmit={handleLogin}>
                    <div className="form-group">
                        <label>Email</label>
                        <input
                            value={email.toLowerCase().trim()}
                            onChange={e => setEmail(e.target.value)}
                            type="email"
                            placeholder="you@example.com"
                        />
                    </div>

                    <div className="form-group">
                        <label>Password</label>
                        <input
                            value={password}
                            onChange={e => setPassword(e.target.value)}
                            type="password"
                            placeholder="********"
                        />
                    </div>

                    <button type="submit" className="btn-primary">
                        Login
                    </button>

                    <small className="auth-footer">
                        Don't have an account? <Link to="/register">Register</Link>
                    </small>
                </form>
            </div>
        </div>

    );
}

export default Login;
