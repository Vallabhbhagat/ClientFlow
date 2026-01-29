import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AdminDashboard = () => {
    const navigate = useNavigate();

    // ================= STATE =================
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [search, setSearch] = useState("");

    const [clients, setClients] = useState([]);
    const [teamMembers, setTeamMembers] = useState([]);
    const [projects, setProjects] = useState([]);
    const [tasks, setTasks] = useState([]);

    const [projectName, setProjectName] = useState("");
    const [projectClientEmail, setProjectClientEmail] = useState("");
    const [projectStatus, setProjectStatus] = useState("To Do");

    const [taskTitle, setTaskTitle] = useState("");
    const [taskProjectName, setTaskProjectName] = useState("");
    const [taskMemberName, setTaskMemberName] = useState("");
    const [taskStatus, setTaskStatus] = useState("To Do");

    // ================= FETCH HELPER =================
    const fetchWithAuth = async (url, options = {}) => {
        const res = await fetch(url, {
            credentials: "include",
            headers: { "Content-Type": "application/json" },
            ...options,
        });

        if (res.status === 403) {
            navigate("/");
            return null;
        }

        return res.json();
    };

    // ================= INITIAL LOAD =================
    useEffect(() => {
        fetchClients();
        fetchTeamMembers();
        fetchProjects();
        fetchTasks();
    }, []);

    // ================= SEARCH =================
    useEffect(() => {
        if (search.trim()) {
            handleSearch();
        } else {
            fetchClients();
        }
    }, [search]);

    // ================= FETCH FUNCTIONS =================
    const fetchClients = async () => {
        const data = await fetchWithAuth("http://localhost:5000/api/client");
        if (data) setClients(Array.isArray(data.data) ? data.data : []);
    };

    const fetchTeamMembers = async () => {
        const data = await fetchWithAuth("http://localhost:5000/api/team");
        if (data) setTeamMembers(Array.isArray(data.data) ? data.data : []);
    };

    const fetchProjects = async () => {
        const data = await fetchWithAuth("http://localhost:5000/api/project");
        if (data) setProjects(Array.isArray(data.data) ? data.data : []);
    };

    const fetchTasks = async () => {
        const data = await fetchWithAuth("http://localhost:5000/api/task");
        if (data) setTasks(Array.isArray(data.data) ? data.data : []);
    };

    const handleSearch = async () => {
        const data = await fetchWithAuth(
            `http://localhost:5000/api/client/search?name=${search}`
        );
        if (data) setClients(Array.isArray(data.data) ? data.data : []);
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
            fetchClients();
        } else {
            alert("Failed to add client");
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
        } else {
            alert("Failed to add project");
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
                title: taskTitle,
                projectName: taskProjectName,
                memberName: taskMemberName,
                status: taskStatus,
            }),
        });

        if (res.ok) {
            setTaskTitle("");
            setTaskProjectName("");
            setTaskMemberName("");
            setTaskStatus("To Do");
            fetchTasks();
        } else {
            alert("Failed to add task");
        }
    };

    // ================= LOGOUT =================
    const handleLogout = async () => {
        await fetch("http://localhost:5000/api/auth/logout", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
        });
        navigate("/");
    };

    // ================= UI =================
    return (
        <div>
            <nav>
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="search client..."
                />
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
                        {p.name} — {p.clientId?.email} — {p.status}
                    </li>
                ))}
            </ul>

            <h1>Add Task</h1>
            <form onSubmit={handleAddTask}>
                <input value={taskTitle} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Task Title" required />
                <input value={taskProjectName} onChange={(e) => setTaskProjectName(e.target.value)} placeholder="Project Name" required />
                <input value={taskMemberName} onChange={(e) => setTaskMemberName(e.target.value)} placeholder="Member Name" required />
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
                        {t.title} — {t.projectId?.name} — {t.assignedTo?.name} — {t.status}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AdminDashboard;
