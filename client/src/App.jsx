import React from 'react'
import { Routes, Route } from "react-router-dom"
import Login from "./pages/Login.jsx"
import Register from './pages/Register.jsx'
import AdminDashboard from './pages/AdminDashboard.jsx'
import MemberDashboard from "./pages/MemberDashboard.jsx"
import ClientsPage from './pages/ClientPage.jsx'
import ProjectsPage from './pages/Projectpage.jsx'
import Taskpage from './pages/Taskpage.jsx'
import ProjectInsights from './pages/ProjectInsights.jsx'

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true };
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Something went wrong.</h1>;
    }

    return this.props.children;
  }
}

const App = () => {
  return (
    <ErrorBoundary>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/admin-dashboard' element={<AdminDashboard />} />
        <Route path='/clients' element={<ClientsPage />} />
        <Route path='/member-dashboard' element={<MemberDashboard />} />
        <Route path='/projects' element={<ProjectsPage />} />
        <Route path='/tasks' element={<Taskpage />} />
        <Route path='/project-insights' element={<ProjectInsights />} />
      </Routes>
    </ErrorBoundary>
  )
};

export default App