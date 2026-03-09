import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Page from "../layout/Page";
import GlassCard from "../components/ui/GlassCard";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import EmptyStateIllustration from "../components/ui/EmptyStateIllustration";
import { listTasks } from "../services/taskService";

const Taskpage = () => {
    const navigate = useNavigate();

    const [tasks, setTasks] = useState([]);
    // no inline updates on admin task board (view-only)
    const [loading, setLoading] = useState(true);

    // ================= INITIAL LOAD =================
    useEffect(() => {
        fetchTasks();
    }, []);


    const fetchTasks = async () => {
        try {
            setLoading(true);
            const data = await listTasks();
            setTasks(Array.isArray(data?.data) ? data.data : []);
        } catch (e) {
            toast.error(e.message || "Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    };

    const normalize = (s) => (s || "").toLowerCase().replace(/\s+/g, " ").trim();
    const statusKey = (s) => {
        const n = normalize(s);
        if (n === "in progress") return "inprogress";
        if (n === "completed") return "done";
        return "todo";
    };

    const columns = useMemo(() => {
        const by = { todo: [], inprogress: [], done: [] };
        for (const t of tasks) by[statusKey(t.status)].push(t);
        return by;
    }, [tasks]);

    return (
        <Page>
                <div className="page-head">
                    <div>
                        <div className="page-kicker">Execution</div>
                        <h1 className="page-title">Tasks</h1>
                        <div className="page-sub">A kanban view of work across projects.</div>
                    </div>
                </div>

                <div className="kanban">
                    {loading ? (
                        <GlassCard className="table-card">
                            <LoadingSkeleton lines={8} />
                        </GlassCard>
                    ) : tasks.length === 0 ? (
                        <GlassCard className="table-card">
                            <EmptyStateIllustration
                                title="No tasks yet"
                                subtitle="Create tasks from the Dashboard and assign them to team members."
                            />
                        </GlassCard>
                    ) : (
                        <>
                            <GlassCard className="kanban-col">
                                <div className="kanban-head">
                                    <div className="kanban-title">To Do</div>
                                    <div className="kanban-count">{columns.todo.length}</div>
                                </div>
                                <div className="kanban-list">
                                    {columns.todo.map((t) => (
                                        <div key={t._id} className="kanban-card">
                                            <div className="strong">{t.title}</div>
                                            <div className="muted" style={{ marginTop: 6 }}>
                                                {t.projectId?.name || "—"} · {t.assignedTo?.name || "Unassigned"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassCard className="kanban-col">
                                <div className="kanban-head">
                                    <div className="kanban-title">In Progress</div>
                                    <div className="kanban-count">{columns.inprogress.length}</div>
                                </div>
                                <div className="kanban-list">
                                    {columns.inprogress.map((t) => (
                                        <div key={t._id} className="kanban-card">
                                            <div className="strong">{t.title}</div>
                                            <div className="muted" style={{ marginTop: 6 }}>
                                                {t.projectId?.name || "—"} · {t.assignedTo?.name || "Unassigned"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>

                            <GlassCard className="kanban-col">
                                <div className="kanban-head">
                                    <div className="kanban-title">Completed</div>
                                    <div className="kanban-count">{columns.done.length}</div>
                                </div>
                                <div className="kanban-list">
                                    {columns.done.map((t) => (
                                        <div key={t._id} className="kanban-card">
                                            <div className="strong">{t.title}</div>
                                            <div className="muted" style={{ marginTop: 6 }}>
                                                {t.projectId?.name || "—"} · {t.assignedTo?.name || "Unassigned"}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </GlassCard>
                        </>
                    )}
                </div>
            </Page>

    )
}

export default Taskpage
