import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Page from "../layout/Page";
import GlassCard from "../components/ui/GlassCard";
import AnimatedButton from "../components/ui/AnimatedButton";
import DashboardCards from "../components/dashboard/DashboardCards";
import { addClient, listClients } from "../services/clientService";
import { addProject, listProjects } from "../services/projectService";
import { addTask, listTasks } from "../services/taskService";
import { addTeamMember, listTeam } from "../services/teamService";

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

  const [memberName, setMemberName] = useState("");
  const [memberEmail, setMemberEmail] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [memberHourlyRate, setMemberHourlyRate] = useState("");

  const [stats, setStats] = useState({
    clients: 0,
    projects: 0,
    tasks: 0,
    members: 0,
  });

  const refreshStats = async () => {
    try {
      const [c, p, t, m] = await Promise.all([
        listClients(),
        listProjects(),
        listTasks(),
        listTeam(),
      ]);
      setStats({
        clients: Array.isArray(c?.data) ? c.data.length : 0,
        projects: Array.isArray(p?.data) ? p.data.length : 0,
        tasks: Array.isArray(t?.data) ? t.data.length : 0,
        members: Array.isArray(m?.data) ? m.data.length : 0,
      });
    } catch (e) {
      toast.error(e.message || "Failed to load dashboard stats.");
    }
  };

  useEffect(() => {
    refreshStats();
  }, []);

  const handleAddClient = async (e) => {
    e.preventDefault();
    try {
      await addClient({ name, email });
      setName("");
      setEmail("");
      toast.success("Client added");
      refreshStats();
    } catch (e2) {
      toast.error(e2.message || "Failed to add client");
    }
  };

  const handleAddProject = async (e) => {
    e.preventDefault();
    try {
      await addProject({
        name: projectName,
        clientEmail: projectClientEmail,
        status: projectStatus,
        budget: parseFloat(projectBudget) || 0,
        estimatedHours: parseFloat(projectEstimatedHours) || 0,
      });
      setProjectName("");
      setProjectClientEmail("");
      setProjectStatus("To Do");
      setProjectBudget("");
      setProjectEstimatedHours("");
      toast.success("Project added");
      refreshStats();
    } catch (e2) {
      toast.error(e2.message || "Failed to add project");
    }
  };

  const handleAddTask = async (e) => {
    e.preventDefault();
    try {
      await addTask({
        taskTitle,
        taskProjectName,
        taskMemberName,
        taskStatus,
        estimatedHours: parseFloat(taskEstimatedHours) || 0,
        actualHours: parseFloat(taskActualHours) || 0,
        dueDate: taskDueDate || null,
      });
      setTaskTitle("");
      setTaskProjectName("");
      setTaskMemberName("");
      setTaskStatus("To Do");
      setTaskEstimatedHours("");
      setTaskActualHours("");
      setTaskDueDate("");
      toast.success("Task added");
      refreshStats();
    } catch (e2) {
      toast.error(e2.message || "Failed to add task");
    }
  };

  const handleAddMember = async (e) => {
    e.preventDefault();
    try {
      await addTeamMember({
        name: memberName,
        email: memberEmail,
        password: memberPassword,
        hourlyRate: parseFloat(memberHourlyRate) || 0,
      });
      setMemberName("");
      setMemberEmail("");
      setMemberPassword("");
      setMemberHourlyRate("");
      toast.success("Team member added");
      refreshStats();
    } catch (e2) {
      toast.error(e2.message || "Failed to add member");
    }
  };

  const dashboardStats = useMemo(
    () => [
      { label: "Clients", value: stats.clients, hint: "Active accounts in your org" },
      { label: "Projects", value: stats.projects, hint: "Currently tracked projects" },
      { label: "Tasks", value: stats.tasks, hint: "Work items across teams" },
      { label: "Team", value: stats.members, hint: "Members available for assignment" },
    ],
    [stats],
  );

  return (
    <Page>
        <div className="page-head">
          <div>
            <div className="page-kicker">Overview</div>
            <h1 className="page-title">Dashboard</h1>
            <div className="page-sub">Create clients, projects, tasks, and team members.</div>
          </div>
        </div>

        <DashboardCards stats={dashboardStats} />

        <div style={{ height: 16 }} />

        <div className="grid grid-2">
          <GlassCard className="form-card">
            <div className="strong" style={{ padding: "10px 10px 14px" }}>
              Add client
            </div>
            <form onSubmit={handleAddClient} className="form-grid">
              <div className="field">
                <div className="label">Name</div>
                <input className="input" value={name} onChange={(e) => setName(e.target.value)} placeholder="Client name" required />
              </div>
              <div className="field">
                <div className="label">Email</div>
                <input className="input" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="client@email.com" required />
              </div>
              <div className="form-actions">
                <AnimatedButton variant="primary" type="submit">Add client</AnimatedButton>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="form-card">
            <div className="strong" style={{ padding: "10px 10px 14px" }}>
              Add project
            </div>
            <form onSubmit={handleAddProject} className="form-grid">
              <div className="field">
                <div className="label">Project name</div>
                <input className="input" value={projectName} onChange={(e) => setProjectName(e.target.value)} placeholder="Project name" required />
              </div>
              <div className="field">
                <div className="label">Client email</div>
                <input className="input" value={projectClientEmail} onChange={(e) => setProjectClientEmail(e.target.value)} placeholder="client@email.com" required />
              </div>
              <div className="field">
                <div className="label">Status</div>
                <select className="select" value={projectStatus} onChange={(e) => setProjectStatus(e.target.value)}>
                  <option>To Do</option>
                  <option>In Progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="field">
                <div className="label">Budget ($)</div>
                <input className="input" type="number" value={projectBudget} onChange={(e) => setProjectBudget(e.target.value)} placeholder="10000" required />
              </div>
              <div className="field">
                <div className="label">Estimated hours</div>
                <input className="input" type="number" value={projectEstimatedHours} onChange={(e) => setProjectEstimatedHours(e.target.value)} placeholder="120" />
              </div>
              <div className="form-actions">
                <AnimatedButton variant="primary" type="submit">Add project</AnimatedButton>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="form-card">
            <div className="strong" style={{ padding: "10px 10px 14px" }}>
              Add task
            </div>
            <form onSubmit={handleAddTask} className="form-grid">
              <div className="field">
                <div className="label">Task title</div>
                <input className="input" value={taskTitle.toLowerCase().trim()} onChange={(e) => setTaskTitle(e.target.value)} placeholder="Design review" required />
              </div>
              <div className="field">
                <div className="label">Project name</div>
                <input className="input" value={taskProjectName.toLowerCase().trim()} onChange={(e) => setTaskProjectName(e.target.value)} placeholder="project name" required />
              </div>
              <div className="field">
                <div className="label">Assign to</div>
                <input className="input" value={taskMemberName.toLowerCase().trim()} onChange={(e) => setTaskMemberName(e.target.value)} placeholder="member name" required />
              </div>
              <div className="field">
                <div className="label">Status</div>
                <select className="select" value={taskStatus} onChange={(e) => setTaskStatus(e.target.value)}>
                  <option>To Do</option>
                  <option>In progress</option>
                  <option>Completed</option>
                </select>
              </div>
              <div className="field">
                <div className="label">Estimated hours</div>
                <input className="input" type="number" value={taskEstimatedHours} onChange={(e) => setTaskEstimatedHours(e.target.value)} placeholder="8" />
              </div>
              <div className="field">
                <div className="label">Actual hours</div>
                <input className="input" type="number" value={taskActualHours} onChange={(e) => setTaskActualHours(e.target.value)} placeholder="6" />
              </div>
              <div className="field">
                <div className="label">Due date</div>
                <input className="input" type="date" value={taskDueDate} onChange={(e) => setTaskDueDate(e.target.value)} />
              </div>
              <div className="form-actions">
                <AnimatedButton variant="primary" type="submit">Add task</AnimatedButton>
              </div>
            </form>
          </GlassCard>

          <GlassCard className="form-card">
            <div className="strong" style={{ padding: "10px 10px 14px" }}>
              Add team member
            </div>
            <form onSubmit={handleAddMember} className="form-grid">
              <div className="field">
                <div className="label">Name</div>
                <input className="input" value={memberName} onChange={(e) => setMemberName(e.target.value)} placeholder="Member name" required />
              </div>
              <div className="field">
                <div className="label">Email</div>
                <input className="input" value={memberEmail} onChange={(e) => setMemberEmail(e.target.value)} placeholder="member@email.com" required />
              </div>
              <div className="field">
                <div className="label">Password</div>
                <input className="input" type="password" value={memberPassword} onChange={(e) => setMemberPassword(e.target.value)} placeholder="********" required />
              </div>
              <div className="field">
                <div className="label">Hourly rate</div>
                <input className="input" type="number" value={memberHourlyRate} onChange={(e) => setMemberHourlyRate(e.target.value)} placeholder="25" />
              </div>
              <div className="form-actions">
                <AnimatedButton variant="primary" type="submit">Add member</AnimatedButton>
              </div>
            </form>
          </GlassCard>
        </div>
      </Page>
  );
};

export default AdminDashboard;
