const Project = require("../models/Project");
const Task = require("../models/Task");
const User = require("../models/User");

const analyzeProject = async (projectId) => {
  const project = await Project.findById(projectId).populate("clientId");
  if (!project) throw new Error("Project not found");

  const tasks = await Task.find({ projectId }).populate("assignedTo");

  let totalCost = 0;
  let totalActualHours = 0;
  const teamUtilization = {};

  tasks.forEach(task => {
    if (!task.assignedTo) return; // Skip if no assigned user
    const cost = task.actualHours * task.assignedTo.hourlyRate;
    totalCost += cost;
    totalActualHours += task.actualHours;

    const userId = task.assignedTo._id.toString();
    if (!teamUtilization[userId]) {
      teamUtilization[userId] = { name: task.assignedTo.name, hours: 0, rate: task.assignedTo.hourlyRate };
    }
    teamUtilization[userId].hours += task.actualHours;
  });

  const revenue = project.budget;
  const profit = revenue - totalCost;
  const margin = revenue > 0 ? (profit / revenue) * 100 : 0;

  // Status
  let status = "Profitable";
  if (margin < 10) status = margin < 0 ? "Loss" : "Low Margin";
  else if (margin > 30) status = "Highly Profitable";

  // Risk Level
  let riskLevel = "Low";
  if (margin < 10 || totalCost > revenue) riskLevel = "High";
  else if (margin < 30) riskLevel = "Medium";

  // Key Issues
  const keyIssues = [];
  if (totalCost > revenue) keyIssues.push("Project running at a loss");
  if (margin < 10) keyIssues.push("Low profit margin");

  // Overloaded: assume >40 hours per project as overloaded
  Object.values(teamUtilization).forEach(member => {
    if (member.hours > 40) keyIssues.push(`${member.name} is overloaded (${member.hours} hours)`);
  });

  // Underutilized: <50% of estimated project hours or something, but since no total, perhaps <20 hours
  Object.values(teamUtilization).forEach(member => {
    if (member.hours < 20) keyIssues.push(`${member.name} is underutilized (${member.hours} hours)`);
  });

  // Delay risk: if dueDate passed and not completed
  const now = new Date();
  tasks.forEach(task => {
    if (task.dueDate && task.dueDate < now && task.status !== "Completed") {
      keyIssues.push(`Task "${task.title}" is at risk of delay`);
    }
  });

  // Recommendations
  const recommendations = [
    "Monitor task progress closely to avoid delays",
    "Review team allocation to balance workload",
    "Consider adjusting pricing or scope if margins are low"
  ];

  // Financial health score: based on margin, say 100 if >30%, 50 if 10-30%, 0 if <10%
  let healthScore = 50;
  if (margin > 30) healthScore = 100;
  else if (margin < 10) healthScore = 0;

  return {
    projectId: project._id,
    projectName: project.name,
    revenue,
    cost: totalCost,
    profit,
    margin: margin.toFixed(2) + "%",
    status,
    riskLevel,
    keyIssues,
    recommendations,
    healthScore
  };
};

const getAllProjectsAnalysis = async () => {
  const projects = await Project.find().populate("clientId");
  const analyses = [];
  for (const project of projects) {
    try {
      const analysis = await analyzeProject(project._id);
      analyses.push(analysis);
    } catch (e) {
      // skip
    }
  }
  return analyses;
};

module.exports = {
  analyzeProject,
  getAllProjectsAnalysis
};