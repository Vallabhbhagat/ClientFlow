import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import AppLayout from "../layout/AppLayout";
import Page from "../layout/Page";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import EmptyStateIllustration from "../components/ui/EmptyStateIllustration";
import ThreeBackground from "../components/three/ThreeBackground";
import { listMyTasks, updateMyTaskStatus } from "../services/taskService";
import { logoutMember } from "../services/authService";

const MemberDashboard = () => {
    const navigate = useNavigate();
    const [tasks, setTasks] = useState([]);
    const [taskStatuses, setTaskStatuses] = useState({});
    const [loading, setLoading] = useState(true);

    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await listMyTasks();
            setTasks(Array.isArray(data?.data) ? data.data : []);
        } catch (error) {
            console.error("Fetch task error:", error);
            toast.error(error.message || "Unauthorized. Please login as member");
            navigate("/");
        } finally {
            setLoading(false);
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
            await updateMyTaskStatus(taskId, newStatus);
            setTasks(prev => prev.map(t => t._id === taskId ? { ...t, status: newStatus } : t));
            setTaskStatuses(prev => ({ ...prev, [taskId]: undefined }));
            toast.success("Status updated");
        } catch (error) {
            console.error("Update error:", error);
            toast.error(error.message || "Update failed");
        }
    };

    const handleLogout = async () => {
        try {
            await logoutMember();
        } finally {
            navigate("/");
        }
    };

    return (
        <AppLayout
            navItems={[{ to: "/member-dashboard", label: "My Tasks", icon: "dashboard" }]}
            title="My Tasks"
            onLogout={handleLogout}
        >
            <ThreeBackground />
            <Page>
                <div className="page-head">
                    <div>
                        <div className="page-kicker">Personal queue</div>
                        <h1 className="page-title">My Tasks</h1>
                        <div className="page-sub">Update task status as you progress.</div>
                    </div>
                </div>

                <GlassCard className="table-card">
                    {loading ? (
                        <LoadingSkeleton lines={10} />
                    ) : tasks.length === 0 ? (
                        <EmptyStateIllustration
                            title="No tasks assigned"
                            subtitle="When an admin assigns work to you, it will appear here."
                        />
                    ) : (
                        <div className="member-grid">
                            {tasks.map((task) => (
                                <GlassCard key={task._id} className="member-task-card">
                                    <div className="strong">{task.title}</div>
                                    <div className="muted" style={{ marginTop: 8 }}>
                                        Status: {task.status}
                                    </div>
                                    <div style={{ marginTop: 12, display: "flex", gap: 10, alignItems: "center" }}>
                                        <select
                                            className="select"
                                            value={taskStatuses[task._id] || task.status}
                                            onChange={(e) => handleStatusChange(task._id, e.target.value)}
                                        >
                                            <option>To Do</option>
                                            <option>In progress</option>
                                            <option>Completed</option>
                                        </select>
                                        <AnimatedButton
                                            variant="primary"
                                            size="sm"
                                            onClick={() => handleUpdateStatus(task._id)}
                                        >
                                            Update
                                        </AnimatedButton>
                                    </div>
                                </GlassCard>
                            ))}
                        </div>
                    )}
                </GlassCard>
            </Page>
        </AppLayout>

    );
};

export default MemberDashboard;
