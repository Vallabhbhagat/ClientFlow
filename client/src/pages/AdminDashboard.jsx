import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/AdminD.css";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [projectName, setProjectName] = useState("");
    const [projectClientEmail, setProjectClientEmail] = useState("");
    const [projectStatus, setProjectStatus] = useState("To Do");
    const [projectBudget, setProjectBudget] = useState("");
    const [projectEstimatedHours, setProjectEstimatedHours] = useState("");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskProjectName, setTaskProjectName] = useState("");
    const [taskMemberName, setTaskMemberName] = useState("");
    const [taskStatus, setTaskStatus] = useState("To Do");
    const [taskEstimatedHours, setTaskEstimatedHours] = useState("");
    const [taskActualHours, setTaskActualHours] = useState("");
    const [taskDueDate, setTaskDueDate] = useState("");


    // ================= FETCH HELPER =================
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

    // ================= ADD CLIENT =================
    const handleAddClient = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/client/add", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, email }),
        });

        if (res.ok) {
            setName("");
            setEmail("");
            alert("Client added succsessfully");
        }
    };

    // ================= ADD PROJECT =================
    const handleAddProject = async (e) => {
        e.preventDefault();
        const res = await fetch("http://localhost:5000/api/project/add", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                name: projectName,
                clientEmail: projectClientEmail,
                status: projectStatus,
                budget: parseFloat(projectBudget) || 0,
                estimatedHours: parseFloat(projectEstimatedHours) || 0
            }),
        });

        if (res.ok) {
            setProjectName("");
            setProjectClientEmail("");
            setProjectStatus("To Do");
            setProjectBudget("");
            setProjectEstimatedHours("");
            alert("Project added succsessfully");
        }
    };

    // ================= ADD TASK =================
    const handleAddTask = async (e) => {
        e.preventDefault();

        const res = await fetch("http://localhost:5000/api/task/add", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                taskTitle,
                taskProjectName,
                taskMemberName,
                taskStatus,
                estimatedHours: parseFloat(taskEstimatedHours) || 0,
                actualHours: parseFloat(taskActualHours) || 0,
                dueDate: taskDueDate || null
            }),
        });

        if (res.ok) {
            setTaskTitle("");
            setTaskProjectName("");
            setTaskMemberName("");
            setTaskStatus("To Do");
            setTaskEstimatedHours("");
            setTaskActualHours("");
            setTaskDueDate("");
            alert("Task added succsessfully");
        } else {
            const errorData = await res.json();
            console.error(errorData.message);
        }
    };

    // ================= LOGOUT =================
    const handleLogout = async () => {
        await fetch("http://localhost:5000/api/auth/logout/admin", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        navigate("/");
    };

    const handleClient = () => {
        navigate("/clients")
    }
    const handleProject = () => {
        navigate("/projects")
    }
    const handleTask = () => {
        navigate("/tasks")
    }
    const handleSmartFlow = () => {
        navigate("/project-insights")
    }

    // ================= UI =================
    return (
        <div id="adminpage" className="admin-page">
            {/* NAV */}
            <nav className="admin-nav">
                <div className="nav-left">
                    <h3>ClientFlow</h3>
                </div>

                {/* Hamburger Menu Toggle */}
                <input type="checkbox" id="nav-toggle" className="nav-toggle" />
                <label htmlFor="nav-toggle" className="nav-toggle-label">☰</label>

                <div className="nav-right">
                    <button className="btn-secondary" onClick={handleTask}>
                        Assigned Tasks
                    </button>
                    <button className="btn-secondary" onClick={handleProject}>
                        All Project
                    </button>
                    <button className="btn-secondary" onClick={handleClient}>
                        All Clients
                    </button>
                    <button className="btn-secondary" onClick={handleSmartFlow}>
                        Project Insights
                    </button>
                    <button className="btn-logout" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </nav >

            <div className="admin-container">
                {/* ADD CLIENT */}
                <section className="card">
                    <h2>Add Client</h2>
                    <form onSubmit={handleAddClient} className="form-row">
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Client Name"
                            required
                        />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Client Email"
                            required
                        />
                        <button className="btn-primary">Add Client</button>
                    </form>
                </section>

                {/* ADD PROJECT */}
                <section className="card">
                    <h2>Add Project</h2>
                    <form onSubmit={handleAddProject} className="form-row">
                        <input
                            value={projectName}
                            onChange={(e) => setProjectName(e.target.value)}
                            placeholder="Project Name"
                            required
                        />
                        <input
                            value={projectClientEmail}
                            onChange={(e) => setProjectClientEmail(e.target.value)}
                            placeholder="Client Email"
                            required
                        />
                        <select
                            value={projectStatus}
                            onChange={(e) => setProjectStatus(e.target.value)}
                        >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        <input
                            type="number"
                            value={projectBudget}
                            onChange={(e) => setProjectBudget(e.target.value)}
                            placeholder="Budget ($)"
                            required
                        />
                        <input
                            type="number"
                            value={projectEstimatedHours}
                            onChange={(e) => setProjectEstimatedHours(e.target.value)}
                            placeholder="Estimated Hours"
                        />
                        <button className="btn-primary">Add Project</button>
                    </form>
                </section>

                {/* ADD TASK */}
                <section className="card">
                    <h2>Add Task</h2>
                    <form onSubmit={handleAddTask} className="form-row">
                        <input
                            value={taskTitle.toLowerCase().trim()}
                            onChange={(e) => setTaskTitle(e.target.value)}
                            placeholder="Task Title"
                            required
                        />
                        <input
                            value={taskProjectName.toLowerCase().trim()}
                            onChange={(e) => setTaskProjectName(e.target.value)}
                            placeholder="Project Name"
                            required
                        />
                        <input
                            value={taskMemberName.toLowerCase().trim()}
                            onChange={(e) => setTaskMemberName(e.target.value)}
                            placeholder="Member Name"
                            required
                        />
                        <select
                            value={taskStatus}
                            onChange={(e) => setTaskStatus(e.target.value)}
                        >
                            <option>To Do</option>
                            <option>In progress</option>
                            <option>Completed</option>
                        </select>
                        <input
                            type="number"
                            value={taskEstimatedHours}
                            onChange={(e) => setTaskEstimatedHours(e.target.value)}
                            placeholder="Estimated Hours"
                        />
                        <input
                            type="number"
                            value={taskActualHours}
                            onChange={(e) => setTaskActualHours(e.target.value)}
                            placeholder="Actual Hours"
                        />
                        <input
                            type="date"
                            value={taskDueDate}
                            onChange={(e) => setTaskDueDate(e.target.value)}
                            placeholder="Due Date"
                        />
                        <button className="btn-primary">Add Task</button>
                    </form>
                </section>
            </div>
        </div >

    );
};

export default AdminDashboard;
