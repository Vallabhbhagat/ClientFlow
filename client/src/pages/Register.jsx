import React, { useState } from 'react'
import { Link, useNavigate } from "react-router-dom"

const Register = () => {
    const navigate = useNavigate();

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState("teamMember");

    const handleRegister = async (e) => {
        e.preventDefault();
        if(!name && !email && !password && !role){
            alert("all credencials are required!")
        }

        try {
            const res = await fetch("http://localhost:5000/api/auth/register", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ name, email, password, role })
            })

            if (!res.ok) {
                throw new Error('Registration failed')
            }

            const data = await res.json()

            alert("Successful Registration!")


            setName("");
            setEmail("");
            setPassword("");
            setRole("teamMember");
            navigate("/")
        } catch (error) {
            console.log(error)
            alert('Registration failed');
        }
    }
    const handleChange = (event) => {
        setRole(event.target.value)
    }

    return (
        <div>
            <form onSubmit={handleRegister}>
                <div>
                    <label>Name</label>
                    <input value={name.toLowerCase().trim()} onChange={(e) => setName(e.target.value)} type="text" placeholder="your name" />
                </div>
                <div>
                    <label>Email</label>
                    <input value={email.toLowerCase().trim()} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="you@example.com" />
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
                    <button type="submit">Register</button>
                    <br />
                    <small>Already have account? <Link to="/">Login</Link></small>
                </div>
            </form>
        </div>
    )
}

export default Register
