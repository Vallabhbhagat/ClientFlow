import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { login as loginApi } from "../services/authService";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import ThreeBackground from "../components/three/ThreeBackground";

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(false);

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const data = await loginApi({ email, password });
            setUser(data.user);
            toast.success("Welcome back!");

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
            toast.error(error.message || "Login failed");
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="auth-shell">
            <ThreeBackground />
            <div className="auth-center">
                <GlassCard className="auth-card2">
                    <div className="auth-head">
                        <div className="auth-badge">Secure access</div>
                        <h2 className="auth-title">Sign in</h2>
                        <p className="auth-subtitle">Your workspace, beautifully organized.</p>
                    </div>

                    <form onSubmit={handleLogin} className="auth-form">
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
                                autoComplete="current-password"
                                required
                            />
                        </div>

                        <AnimatedButton
                            type="submit"
                            variant="primary"
                            size="md"
                            disabled={loading}
                            className="auth-submit"
                        >
                            {loading ? "Signing in..." : "Login"}
                        </AnimatedButton>

                        <div className="auth-foot">
                            <span className="muted">
                                Don&apos;t have an account?
                            </span>{" "}
                            <Link className="link" to="/register">
                                Register
                            </Link>
                        </div>
                    </form>
                </GlassCard>
            </div>
        </div>

    );
}

export default Login;
