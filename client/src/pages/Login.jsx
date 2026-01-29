import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

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
        <div>
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div>
                    <label>Email</label>
                    <input
                        value={email.toLowerCase().trim()}
                        onChange={e => setEmail(e.target.value)}
                        type="email"
                        placeholder="you@example.com"
                    />
                </div>

                <div>
                    <label>Password</label>
                    <input
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        type="password"
                        placeholder="********"
                    />
                </div>

                <div>
                    <button type="submit">Login</button>
                    <br />
                    <small>
                        Don't have an account? <Link to="/register">Register</Link>
                    </small>
                </div>
            </form>
        </div>
    );
}

export default Login;
