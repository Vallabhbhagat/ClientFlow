import React, { useState } from 'react'

const Login = () => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        //post api

        setEmail("");
        setPassword("");
    }

    return (
        <div>
            <div>
                <h2>Login</h2>
                <form onSubmit={handleLogin} >
                    <div>
                        <label>Email</label>
                        <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
                    </div>

                    <div>
                        <label >Password</label>
                        <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" />
                    </div>

                    <div>
                        <button type="submit">Login</button>
                        <br />
                        <small>Don't have an account? Register</small>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
