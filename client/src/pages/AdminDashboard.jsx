import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");

    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [projectName, setProjectName] = useState("");
    const [projectClientEmail, setProjectClientEmail] = useState("");
    const [projectStatus, setProjectStatus] = useState("To Do");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskProjectName, setTaskProjectName] = useState("");
    const [taskMemberName, setTaskMemberName] = useState("");
    const [taskStatus, setTaskStatus] = useState("To Do");

    const [projectStatuses, setProjectStatuses] = useState({});
    const [taskStatuses, setTaskStatuses] = useState({});

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

    // ================= INITIAL LOAD =================
    useEffect(() => {
        fetchProjects();
        fetchTasks();
    }, []);

    const fetchProjects = async () => {
        const data = await fetchWithAuth("http://localhost:5000/api/project");
        if (data) setProjects(Array.isArray(data.data) ? data.data : []);
    };

    const fetchTasks = async () => {
        const data = await fetchWithAuth("http://localhost:5000/api/task");
        if (data) setTasks(Array.isArray(data.data) ? data.data : []);
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
            }),
        });

        if (res.ok) {
            setProjectName("");
            setProjectClientEmail("");
            setProjectStatus("To Do");
            fetchProjects();
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
                taskStatus
            }),
        });

        if (res.ok) {
            setTaskTitle("");
            setTaskProjectName("");
            setTaskMemberName("");
            setTaskStatus("To Do");
            fetchTasks();
        } else {
            const errorData = await res.json();
            console.error(errorData.message);
        }
    };



    // ================= UPDATE PROJECT =================
    const handleInlineProjectChange = (projectId, newStatus) => {
        setProjectStatuses((prev) => ({ ...prev, [projectId]: newStatus }));
    };

    const handleUpdateProject = async (projectId) => {
        const newStatus = projectStatuses[projectId];
        if (!newStatus) return;

        try {
            const res = await fetch(`http://localhost:5000/api/project/${projectId}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                fetchProjects();
                setProjectStatuses((prev) => ({ ...prev, [projectId]: undefined }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/project/${projectId}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) fetchProjects();
        } catch (err) {
            console.error(err);
        }
    };

    // ================= UPDATE TASK =================
    const handleInlineTaskChange = (taskId, newStatus) => {
        setTaskStatuses((prev) => ({ ...prev, [taskId]: newStatus }));
    };

    const handleUpdateTask = async (taskId) => {
        const newStatus = taskStatuses[taskId];
        if (!newStatus) return;

        try {
            const res = await fetch(`http://localhost:5000/api/task/${taskId}`, {
                method: "PUT",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                fetchTasks();
                setTaskStatuses((prev) => ({ ...prev, [taskId]: undefined }));
            }
        } catch (err) {
            console.error(err);
        }
    };

    const handleDeleteTask = async (taskId) => {
        try {
            const res = await fetch(`http://localhost:5000/api/task/${taskId}`, {
                method: "DELETE",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
            });
            if (res.ok) fetchTasks();
        } catch (err) {
            console.error(err);
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

    // ================= UI =================
    return (
        <div>
            <nav>
                <button onClick={handleClient}>All Clients</button>
                <button onClick={handleLogout}>Logout</button>
            </nav>

            <h1>Add Client</h1>
            <form onSubmit={handleAddClient}>
                <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Client Name" required />
                <input value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Client Email" required />
                <button>Add</button>
            </form>

            <h1>Add Project</h1>
            <form onSubmit={handleAddProject}>
                <input value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project Name" required />
                <input value={projectClientEmail} onChange={(e) => setProjectClientEmail(e.target.value)} placeholder="Client Email" required />
                <select value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)}>
                    <option>To Do</option>
                    <option>In Progress</option>
                    <option>Completed</option>
                </select>
                <button>Add Project</button>
            </form>

            <h1>Projects</h1>
            <ul>
                {projects.map((p) => (
                    <li key={p._id}>
                        {p.name} — {p.clientId?.email} —
                        <select value={projectStatuses[p._id] || p.status} onChange={(e) => handleInlineProjectChange(p._id, e.target.value)}>
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        <button onClick={() => handleUpdateProject(p._id)}>Save</button>
                        <button onClick={() => handleDeleteProject(p._id)}>Delete</button>
                    </li>
                ))}
            </ul>

            <h1>Add Task</h1>
            <form onSubmit={handleAddTask}>
                <input value={taskTitle.toLowerCase().trim()} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task Title" required />
                <input value={taskProjectName.toLowerCase().trim()} onChange={(e) => setTaskProjectName(e.target.value)} placeholder="Project Name" required />
                <input value={taskMemberName.toLowerCase().trim()} onChange={(e) => setTaskMemberName(e.target.value)} placeholder="Member Name" required />
                <select value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
                    <option>To Do</option>
                    <option>In progress</option>
                    <option>Completed</option>
                </select>
                <button>Add Task</button>
            </form>

            <h1>Tasks</h1>
            <ul>
                {tasks.map((t) => (
                    <li key={t._id}>
                        {t.title} — {t.projectId?.name} — {t.assignedTo?.name} —
                        <select value={taskStatuses[t._id] || t.status} onChange={(e) => handleInlineTaskChange(t._id, e.target.value)}>
                            <option>To Do</option>
                            <option>In progress</option>
                            <option>Completed</option>
                        </select>
                        <button onClick={() => handleUpdateTask(t._id)}>Save</button>
                        <button onClick={() => handleDeleteTask(t._id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
