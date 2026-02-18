import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../style/ProjectInsights.css";
import { jsPDF } from 'jspdf';

const ProjectInsights = () => {
    const navigate = useNavigate();
    const [analyses, setAnalyses] = useState([]);
    const [selectedProject, setSelectedProject] = useState(null);

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

    useEffect(() => {
        const fetchAnalyses = async () => {
            try {
                const data = await fetchWithAuth("http://localhost:5000/api/project-insights/all");
                if (data) setAnalyses(data);
            } catch (error) {
                console.error("Error fetching analyses:", error);
                alert("Failed to load project analyses. Please check your connection.");
            }
        };
        fetchAnalyses();
    }, []);

    const handleAnalyzeProject = async (projectId) => {
        try {
            const data = await fetchWithAuth(`http://localhost:5000/api/project-insights/project/${projectId}`);
            if (data) setSelectedProject(data);
        } catch (error) {
            console.error("Error fetching project analysis:", error);
            alert("Failed to load project analysis. Please try again.");
        }
    };

    const handleBack = () => {
        navigate("/admin-dashboard");
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

    return (
        <div className="projectinsights-page">
            <nav className="projectinsights-nav">
                <div className="nav-left">
                    <h3>Project Insights</h3>
                </div>
                <div className="nav-right">
                    <button className="btn-secondary" onClick={handleBack}>
                        Back to Dashboard
                    </button>
                </div>
            </nav>
            <div className="projectinsights-container">
                <h1>Project Insights - Financial Analysis</h1>
                <div className="analyses-list">
                    {analyses.map((analysis, index) => (
                        <div key={index} className="analysis-card" onClick={() => handleAnalyzeProject(analysis.projectId)}>
                            <h3>{analysis.projectName}</h3>
                            <p>Status: {analysis.status}</p>
                            <p>Risk: {analysis.riskLevel}</p>
                            <p>Health Score: {analysis.healthScore}</p>
                        </div>
                    ))}
                </div>
                {selectedProject && (
                    <div className="detailed-analysis">
                        <div className="analysis-header">
                            <h2>Project Summary: {selectedProject.projectName}</h2>
                            <button className="btn-download" onClick={downloadPDF}>
                                Download PDF
                            </button>
                        </div>
                        <p>Revenue: ${selectedProject.revenue}</p>
                        <p>Cost: ${selectedProject.cost.toFixed(2)}</p>
                        <p>Profit: ${selectedProject.profit.toFixed(2)}</p>
                        <p>Margin: {selectedProject.margin}</p>
                        <p>Status: {selectedProject.status}</p>
                        <p>Risk Level: {selectedProject.riskLevel}</p>
                        <h3>Key Issues:</h3>
                        <ul>
                            {selectedProject.keyIssues.map((issue, i) => <li key={i}>{issue}</li>)}
                        </ul>
                        <h3>Recommendations:</h3>
                        <ol>
                            {selectedProject.recommendations.map((rec, i) => <li key={i}>{rec}</li>)}
                        </ol>
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProjectInsights;