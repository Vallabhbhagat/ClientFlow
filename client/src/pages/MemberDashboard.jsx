import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const MemberDashboard = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState({});

    // ================= FETCH TASKS =================
    const fetchTasks = async () => {
        try {
            const res = await fetch(
                "http://localhost:5000/api/membertask/my-task",
                {
                    method: "GET",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );

            if (res.status === 403) {
                console.error("Unauthorized");
                navigate("/");
                return;
            }

            const data = await res.json();
            setTasks(Array.isArray(data.data) ? data.data : []);
        } catch (error) {
            console.error("Fetch task error:", error);
        }
    };

    useEffect(() => {
        fetchTasks();
    }, []);

    // ================= STATUS CHANGE =================
    const handleStatusChange = (taskId, status) => {
        setTaskStatuses((prev) => ({
            ...prev,
            [taskId]: status,
        }));
    };

    // ================= UPDATE STATUS =================
    const handleUpdateStatus = async (taskId) => {
        const newStatus = taskStatuses[taskId];
        if (!newStatus) return;

        try {
            const res = await fetch(
                `http://localhost:5000/api/membertask/my-task/${taskId}`,
                {
                    method: "PUT",
                    credentials: "include",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ status: newStatus }),
                }
            );

            if (!res.ok) {
                console.error("Failed to update task");
                return;
            }

            setTasks((prev) =>
                prev.map((task) =>
                    task._id === taskId ? { ...task, status: newStatus } : task
                )
            );

            setTaskStatuses((prev) => ({
                ...prev,
                [taskId]: undefined,
            }));
        } catch (error) {
            console.error("Update error:", error);
        }
    };

    // ================= LOGOUT =================
    const handleLogout = async () => {
        try {
            await fetch("http://localhost:5000/api/auth/logout", {
                method: "POST",
                credentials: "include",
                headers: {
                    "Content-Type": "application/json",
                },
            });

            navigate("/");
        } catch (error) {
            console.error("Logout error:", error);
        }
    };

    // ================= UI =================
    return (
        <div>
            <nav>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            <div className="card">
                <h2>My Tasks</h2>

                {tasks.length === 0 ? (
                    <p>No task to do</p>
                ) : (
                    tasks.map((task) => (
                        <div key={task._id} style={{ marginBottom: "16px" }}>
                            <h4>{task.title}</h4>
                            <p>Status: {task.status}</p>

                            <select
                                value={taskStatuses[task._id] || task.status}
                                onChange={(e) =>
                                    handleStatusChange(task._id, e.target.value)
                                }
                            >
                                <option value="To Do">To Do</option>
                                <option value="In progress">In progress</option>
                                <option value="Completed">Completed</option>
                            </select>

                            <button onClick={() => handleUpdateStatus(task._id)}>
                                Update
                            </button>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default MemberDashboard;
