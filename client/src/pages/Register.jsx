import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { register as registerApi } from "../services/authService";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import ThreeBackground from "../components/three/ThreeBackground";

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("teamMember");
    const [loading, setLoading] = useState(false);

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            await registerApi({ name, email, password, role });
            toast.success("Account created. Please sign in.");


            setName("");
            setEmail("");
            setPassword("");
            setRole("teamMember");
            navigate("/")
        } catch (error) {
            console.log(error)
            toast.error(error.message || "Registration failed");
        } finally {
            setLoading(false);
        }
    }
    const handleChange = (event) => {
        setRole(event.target.value)
    }

    return (
        <div className="auth-shell">
            <ThreeBackground />
            <div className="auth-center">
                <GlassCard className="auth-card2">
                    <div className="auth-head">
                        <div className="auth-badge">Create workspace</div>
                        <h2 className="auth-title">Register</h2>
                        <p className="auth-subtitle">
                            Start tracking clients, projects, and tasks in one place.
                        </p>
                    </div>

                    <form onSubmit={handleRegister} className="auth-form">
                        <div className="field">
                            <div className="label">Name</div>
                            <input
                                className="input"
                                value={name.toLowerCase().trim()}
                                onChange={(e) => setName(e.target.value)}
                                type="text"
                                placeholder="your name"
                                autoComplete="name"
                                required
                            />
                        </div>
                        <div className="field">
                            <div className="label">Email</div>
                            <input
                                className="input"
                                value={email.toLowerCase().trim()}
                                onChange={(e) => setEmail(e.target.value)}
                                type="email"
                                placeholder="you@example.com"
                                autoComplete="email"
                                required
                            />
                        </div>
                        <div className="field">
                            <div className="label">Password</div>
                            <input
                                className="input"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                                placeholder="********"
                                autoComplete="new-password"
                                required
                            />
                        </div>

                        <div className="field">
                            <div className="label">Role</div>
                            <select className="select" value={role} onChange={handleChange}>
                                <option value="teamMember">Member</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>

                        <AnimatedButton
                            className="auth-submit"
                            type="submit"
                            variant="primary"
                            disabled={loading}
                        >
                            {loading ? "Creating..." : "Register"}
                        </AnimatedButton>

                        <div className="auth-foot">
                            <span className="muted">Already have an account?</span>{" "}
                            <Link className="link" to="/">
                                Login
                            </Link>
                        </div>
                    </form>
                </GlassCard>
            </div>
        </div>
    )
}

export default Register
