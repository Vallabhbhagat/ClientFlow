import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "../style/Project.css";

const ProjectsPage = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [projectStatuses, setProjectStatuses] = useState({});

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
    const fetchProjects = async () => {
        const data = await fetchWithAuth("http://localhost:5000/api/project");
        if (data) setProjects(Array.isArray(data.data) ? data.data : []);
    };
    // ================= INITIAL LOAD =================
    useEffect(() => {
        fetchProjects();
    }, []);
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

    const handleHome = () => {
        navigate("/admin-dashboard");
    }

    return (
       <section className="card">
    <nav>
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
    </nav>
    <h2>Projects</h2>
    <ul className="data-list">
        {projects.map((p) => (
            <li key={p._id} className="data-row">
                <div className="project-info">
                    <span className="project-name">Name: {p.name}</span>
                    <span className="project-client">Client Email: {p.clientId?.email}</span>
                    <div className="project-actions">
                        <select
                            className="status-select"
                            value={projectStatuses[p._id] || p.status}
                            onChange={(e) => handleInlineProjectChange(p._id, e.target.value)}
                        >
                            <option>To Do</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                        <button className="btn-primary" onClick={() => handleUpdateProject(p._id)}>
                            Save
                        </button>
                        <button className="btn-danger" onClick={() => handleDeleteProject(p._id)}>
                            Delete
                        </button>
                    </div>
                </div>
            </li>
        ))}
    </ul>
</section>
    );
};

export default ProjectsPage;
