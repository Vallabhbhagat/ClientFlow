import React, { useState } from 'react'

const Register = () => {

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("teamMember");

    const handleRegister = (e) => {
        e.preventDefault();

        //post api

        setName("");
        setEmail("");
        setPassword("");
        setRole("teamMember");
    }
    const handleChange = (event) => {
        setRole(event.target.value)
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name</label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="your name" />
                </div>
                <div>
                    <label>Email</label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
                </div>

                <div>
                    <label >Password</label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" />
                </div>
                <select value={role} onChange={handleChange}>
                    <option value="teamMember">Member</option>
                    <option value="admin">Admin</option>
                </select>

                <div>
                    <button type="submit">Login</button>
                    <br />
                    <small>Already have account? Login</small>
                </div>
            </form>
        </div>
    )
}

export default Register
