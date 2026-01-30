import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import "../style/Task.css"

const Taskpage = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState({});

    const fetchWithAuth = async (url, options = {}) => {
        const res = await fetch(url, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            ...options,
        });

        if (!res.ok) {
            navigate("/");
            return null;
        }

        return await res.json();
    };

    // ================= INITIAL LOAD =================
    useEffect(() => {
        fetchTasks();
    }, []);


    const fetchTasks = async () => {
        const data = await fetchWithAuth("http://localhost:5000/api/task");
        if (data) setTasks(Array.isArray(data.data) ? data.data : []);
    };

    // ================= UPDATE TASK =================
    const handleInlineTaskChange = (taskId, newStatus) => {
        setTaskStatuses((prev) => ({ ...prev, [taskId]: newStatus }));
    };


    const handleHome = () => {
        navigate("/admin-dashboard");
    }


    return (
        <div className="tasks-container">
            {/* TASKS */}
            <section className="tasks-card">
                <div className="clients-header">
                    <div className="nav-left">
                        <h3>ClientFlow</h3>
                    </div>

                    <div className="nav-right">
                        <button className="btn-home" onClick={handleHome}>
                            Home
                        </button>
                    </div>
                </div>
                <h2>Tasks</h2>
                <ul className="tasks-list">
                    {tasks.map((t) => (
                        <li key={t._id} className="task-item">
                            <div className="task-info">
                                <span className="task-title">Title: {t.title}</span>
                                <span className="task-project">Project Name: {t.projectId?.name}</span>
                                <span className="task-assigned">Assigned to Member: {t.assignedTo?.name}</span>
                                <span className="task-status">Status: {t.status}</span>
                            </div>
                        </li>
                    ))}
                </ul>
            </section>
        </div>

    )
}

export default Taskpage
