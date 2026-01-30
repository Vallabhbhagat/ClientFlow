import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/MemberD.css"

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
        <div className="task-dashboard">
            <nav className="task-nav">
                <div className="nav-left">
                    <h3>ClientFlow</h3>
                </div>
                <div className="nav-right">
                    <h3 className="nav-center">Task Dashboard</h3>
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav>

            <div className="task-content">
                <h2>My Tasks</h2>

                {tasks.length === 0 ? (
                    <p className="empty-state">No task to do</p>
                ) : (
                    <div className="task-grid">
                        {tasks.map(task => (
                            <div key={task._id} className="task-item">
                                <h4>{task.title}</h4>

                                <p className={`task-status status-${task.status.replace(" ", "-").toLowerCase()}`}>
                                    Status: {task.status}
                                </p>

                                <select
                                    value={taskStatuses[task._id] || task.status}
                                    onChange={e =>
                                        handleStatusChange(task._id, e.target.value)
                                    }
                                >
                                    <option>To Do</option>
                                    <option>In progress</option>
                                    <option>Completed</option>
                                </select>

                                <button
                                    className="btn-update"
                                    onClick={() => handleUpdateStatus(task._id)}
                                >
                                    Update
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>

    );
};

export default MemberDashboard;
