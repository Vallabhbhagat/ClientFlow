import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';

const MemberDashboard = () => {
    const navigate = useNavigate();

    const [task, setTask] = useState();
    const [progress, setProgress] = useState("To Do")

    const handleChange = (event) => {
        setProgress(event.target.value);
    }

    const handleLogout = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json"
                },
            });

            navigate("/");
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div>
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>
            <div className="card">
                <h2>Task title</h2>
                <select value={progress} onChange={handleChange}>
                    <option value="To Do">To Do</option>
                    <option value="In progress">In progress</option>
                    <option value="Completed">Completed</option>
                </select>
            </div>
        </div>
    )
}

export default MemberDashboard
