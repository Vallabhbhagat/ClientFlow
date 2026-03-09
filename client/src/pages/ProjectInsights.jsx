import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { jsPDF } from "jspdf";
import Page from "../layout/Page";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import LoadingSkeleton from "../components/ui/LoadingSkeleton";
import EmptyStateIllustration from "../components/ui/EmptyStateIllustration";
import AnalyticsChart from "../components/charts/AnalyticsChart";
import { getAllProjectInsights, getProjectInsights } from "../services/insightsService";

const ProjectInsights = () => {
    const navigate = useNavigate();
    const [analyses, setAnalyses] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);
    const [loading, setLoading] = useState(true);
    const [detailLoading, setDetailLoading] = useState(false);

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                setLoading(true);
                const data = await getAllProjectInsights();
                setAnalyses(Array.isArray(data) ? data : []);
            } catch (error) {
                console.error("Error fetching analyses:", error);
                toast.error(error.message || "Failed to load insights");
            } finally {
                setLoading(false);
            }
        };
        fetchAnalyses();
    }, []);

    const handleAnalyzeProject = async (projectId) => {
        try {
            setDetailLoading(true);
            const data = await getProjectInsights(projectId);
            if (data) setSelectedProject(data);
        } catch (error) {
            console.error("Error fetching project analysis:", error);
            toast.error(error.message || "Failed to load project analysis");
        } finally {
            setDetailLoading(false);
        }
    };

    const downloadPDF = () => {
        if (!selectedProject) return;

        const doc = new jsPDF();
        let y = 10;

        doc.setFontSize(16);
        doc.text(`Project Insights: ${selectedProject.projectName}`, 10, y);
        y += 20;

        doc.setFontSize(12);
        doc.text(`Revenue: $${selectedProject.revenue}`, 10, y);
        y += 10;
        doc.text(`Cost: $${selectedProject.cost.toFixed(2)}`, 10, y);
        y += 10;
        doc.text(`Profit: $${selectedProject.profit.toFixed(2)}`, 10, y);
        y += 10;
        doc.text(`Margin: ${selectedProject.margin}`, 10, y);
        y += 10;
        doc.text(`Status: ${selectedProject.status}`, 10, y);
        y += 10;
        doc.text(`Risk Level: ${selectedProject.riskLevel}`, 10, y);
        y += 20;

        doc.setFontSize(14);
        doc.text('Key Issues:', 10, y);
        y += 10;
        doc.setFontSize(12);
        selectedProject.keyIssues.forEach(issue => {
            doc.text(`- ${issue}`, 15, y);
            y += 10;
        });
        y += 10;

        doc.setFontSize(14);
        doc.text('Recommendations:', 10, y);
        y += 10;
        doc.setFontSize(12);
        selectedProject.recommendations.forEach(rec => {
            doc.text(`${rec}`, 15, y);
            y += 10;
        });

        doc.save(`${selectedProject.projectName}-insights.pdf`);
    };

    const chartModel = useMemo(() => {
        if (!selectedProject) return null;
        const labels = ["Revenue", "Cost", "Profit"];
        return {
            labels,
            series: [
                {
                    label: selectedProject.projectName,
                    color: "#22D3EE",
                    data: [
                        Number(selectedProject.revenue || 0),
                        Number(selectedProject.cost || 0),
                        Number(selectedProject.profit || 0),
                    ],
                },
            ],
        };
    }, [selectedProject]);

    return (
        <Page>
                <div className="page-head">
                    <div>
                        <div className="page-kicker">Analytics</div>
                        <h1 className="page-title">Project Insights</h1>
                        <div className="page-sub">Financial health, delivery risk, and key actions.</div>
                    </div>
                    {selectedProject ? (
                        <AnimatedButton variant="primary" size="sm" onClick={downloadPDF}>
                            Download PDF
                        </AnimatedButton>
                    ) : null}
                </div>

                <div className="grid grid-2">
                    <GlassCard className="table-card">
                        <div className="strong" style={{ padding: "10px 10px 14px" }}>
                            Projects
                        </div>
                        {loading ? (
                            <LoadingSkeleton lines={8} />
                        ) : analyses.length === 0 ? (
                            <EmptyStateIllustration
                                title="No analyses yet"
                                subtitle="Create projects and tasks to generate insight signals."
                            />
                        ) : (
                            <div className="insights-list">
                                {analyses.map((a) => (
                                    <button
                                        key={a.projectId}
                                        className="insight-item"
                                        onClick={() => handleAnalyzeProject(a.projectId)}
                                    >
                                        <div className="strong">{a.projectName}</div>
                                        <div className="muted" style={{ marginTop: 6 }}>
                                            Status: {a.status} · Risk: {a.riskLevel} · Health: {a.healthScore}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        )}
                    </GlassCard>

                    <GlassCard className="table-card">
                        <div className="strong" style={{ padding: "10px 10px 14px" }}>
                            Details
                        </div>
                        {detailLoading ? (
                            <LoadingSkeleton lines={10} />
                        ) : !selectedProject ? (
                            <EmptyStateIllustration
                                title="Select a project"
                                subtitle="Pick a project on the left to view breakdown and recommendations."
                            />
                        ) : (
                            <div className="insights-detail">
                                <div className="insight-hero">
                                    <div>
                                        <div className="page-kicker">Summary</div>
                                        <div className="strong" style={{ fontSize: 20, marginTop: 8 }}>
                                            {selectedProject.projectName}
                                        </div>
                                        <div className="muted" style={{ marginTop: 8 }}>
                                            Status: {selectedProject.status} · Risk: {selectedProject.riskLevel} · Margin: {selectedProject.margin}
                                        </div>
                                    </div>
                                </div>

                                {chartModel ? (
                                    <div style={{ marginTop: 14 }}>
                                        <AnalyticsChart labels={chartModel.labels} series={chartModel.series} />
                                    </div>
                                ) : null}

                                <div className="grid grid-3" style={{ marginTop: 14 }}>
                                    <GlassCard className="stat-card">
                                        <div className="stat-label">Revenue</div>
                                        <div className="stat-value">${selectedProject.revenue}</div>
                                    </GlassCard>
                                    <GlassCard className="stat-card">
                                        <div className="stat-label">Cost</div>
                                        <div className="stat-value">${Number(selectedProject.cost || 0).toFixed(2)}</div>
                                    </GlassCard>
                                    <GlassCard className="stat-card">
                                        <div className="stat-label">Profit</div>
                                        <div className="stat-value">${Number(selectedProject.profit || 0).toFixed(2)}</div>
                                    </GlassCard>
                                </div>

                                <div className="grid grid-2" style={{ marginTop: 14 }}>
                                    <GlassCard className="table-card">
                                        <div className="strong" style={{ padding: "10px 10px 14px" }}>
                                            Key issues
                                        </div>
                                        <ul className="list">
                                            {selectedProject.keyIssues.map((issue, i) => (
                                                <li key={i}>{issue}</li>
                                            ))}
                                        </ul>
                                    </GlassCard>
                                    <GlassCard className="table-card">
                                        <div className="strong" style={{ padding: "10px 10px 14px" }}>
                                            Recommendations
                                        </div>
                                        <ol className="list">
                                            {selectedProject.recommendations.map((rec, i) => (
                                                <li key={i}>{rec}</li>
                                            ))}
                                        </ol>
                                    </GlassCard>
                                </div>
                            </div>
                        )}
                    </GlassCard>
                </div>
            </Page>
    );
};

export default ProjectInsights;