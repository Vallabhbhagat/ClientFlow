import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Page from "../layout/Page";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import EmptyStateIllustration from "../components/ui/EmptyStateIllustration";
import { listProjects, updateProject, deleteProject } from "../services/projectService";

const ProjectsPage = () => {
    const navigate = useNavigate();

    const [projects, setProjects] = useState([]);
    const [projectStatuses, setProjectStatuses] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchProjects = async () => {
        try {
            setLoading(true);
            const data = await listProjects();
            setProjects(Array.isArray(data?.data) ? data.data : []);
        } catch (e) {
            toast.error(e.message || "Failed to load projects.");
        } finally {
            setLoading(false);
        }
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
            await updateProject(projectId, { status: newStatus });
            toast.success("Project updated");
            fetchProjects();
            setProjectStatuses((prev) => ({ ...prev, [projectId]: undefined }));
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Update failed");
        }
    };

    const handleDeleteProject = async (projectId) => {
        try {
            await deleteProject(projectId);
            toast.success("Project deleted");
            fetchProjects();
        } catch (err) {
            console.error(err);
            toast.error(err.message || "Delete failed");
        }
    };

    return (
        <Page>
                <div className="page-head">
                    <div>
                        <div className="page-kicker">Work</div>
                        <h1 className="page-title">Projects</h1>
                        <div className="page-sub">Track delivery status and keep budgets healthy.</div>
                    </div>
                </div>

                <GlassCard className="table-card">
                    {loading ? (
                        <LoadingSkeleton lines={7} />
                    ) : projects.length === 0 ? (
                        <EmptyStateIllustration
                            title="No projects yet"
                            subtitle="Create one from the Dashboard to get started."
                        />
                    ) : (
                        <div className="table">
                            <div className="table-head">
                                <div>Project</div>
                                <div>Client</div>
                                <div style={{ textAlign: "right" }}>Status</div>
                            </div>

                            {projects.map((p) => (
                                <div key={p._id} className="table-row">
                                    <div className="strong">{p.name}</div>
                                    <div className="muted">{p.clientId?.email || "—"}</div>
                                    <div style={{ textAlign: "right", display: "flex", justifyContent: "flex-end", gap: 8 }}>
                                        <select
                                            className="select"
                                            value={projectStatuses[p._id] || p.status}
                                            onChange={(e) => handleInlineProjectChange(p._id, e.target.value)}
                                        >
                                            <option>To Do</option>
                                            <option>In Progress</option>
                                            <option>Completed</option>
                                        </select>
                                        <AnimatedButton
                                            variant="ghost"
                                            size="sm"
                                            onClick={() => handleUpdateProject(p._id)}
                                        >
                                            Save
                                        </AnimatedButton>
                                        <AnimatedButton
                                            variant="danger"
                                            size="sm"
                                            onClick={() => handleDeleteProject(p._id)}
                                        >
                                            Delete
                                        </AnimatedButton>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </GlassCard>
            </Page>

    );
};

export default ProjectsPage;
