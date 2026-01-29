import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MemberDashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState({});

    const fetchTasks = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/membertask/my-task", {
                method: "GET",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });

            if (!res.ok) {
                alert("Unauthorized. Please login as member");
                navigate("/");
                return;
            }

            const data = await res.json();
            setTasks(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
            console.error("Fetch task error:", error);
        }
    };

    useEffect(() => { fetchTasks(); }, []);

    const handleStatusChange = (taskId, status) => {
        setTaskStatuses(prev => ({ ...prev, [taskId]: status }));
    };

    const handleUpdateStatus = async (taskId) => {
        const newStatus = taskStatuses[taskId];
        if (!newStatus) return;

        try {
            const res = await fetch(`http://localhost:5000/api/membertask/my-task/${taskId}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });

            if (!res.ok) return;

            setTasks(prev => prev.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
            setTaskStatuses(prev => ({ ...prev, [taskId]: undefined }));
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    const handleLogout = async () => {
        await fetch("http://localhost:5000/api/auth/logout/teamMember", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        navigate("/");
    };

    return (
        <div>
            <nav><button onClick={handleLogout}>Logout</button></nav>
            <div>
                <h2>My Tasks</h2>
                {tasks.length === 0 ? <p>No task to do</p> : tasks.map(task => (
                    <div key={task._id}>
                        <h4>{task.title}</h4>
                        <p>Status: {task.status}</p>
                        <select value={taskStatuses[task._id] || task.status} onChange={e => handleStatusChange(task._id, e.target.value)}>
                            <option>To Do</option>
                            <option>In progress</option>
                            <option>Completed</option>
                        </select>
                        <button onClick={() => handleUpdateStatus(task._id)}>Update</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default MemberDashboard;
