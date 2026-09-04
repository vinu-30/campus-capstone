// Central route map; each role dashboard and module is protected by its matching role.

import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from '../components/ProtectedRoute';

import Login from '../pages/Login';
import Register from '../pages/Register';
import Dashboard from '../pages/Dashboard';

// Student
import StudentDashboard from '../pages/student/StudentDashboard';
import StudentProfile from '../pages/student/StudentProfile';
import StudentProjects from '../pages/student/StudentProjects';
import StudentTeam from '../pages/student/StudentTeam';

// Project Lead
import LeadDashboard from '../pages/projectLead/LeadDashboard';
import CreateProject from '../pages/projectLead/CreateProject';
import ManageProjects from '../pages/projectLead/ManageProjects';
import EditProject from '../pages/projectLead/EditProject';
import ViewProject from '../pages/projectLead/ViewProject';
import Applications from '../pages/projectLead/Applications';
import TeamFormation from '../pages/projectLead/TeamFormation';

// Faculty
import FacultyDashboard from '../pages/faculty/FacultyDashboard';
import FacultyProjects from '../pages/faculty/FacultyProjects';
import TeamEvaluation from '../pages/faculty/TeamEvaluation';
import StudentPerformance from '../pages/faculty/StudentPerformance';
import FacultyReports from '../pages/faculty/FacultyReports';

// Admin
import AdminDashboard from '../pages/admin/AdminDashboard';
import UserManagement from '../pages/admin/UserManagement';
import ProjectManagement from '../pages/admin/ProjectManagement';
import TeamManagement from '../pages/admin/TeamManagement';
import SkillsManagement from '../pages/admin/SkillsManagement';
import AdminReports from '../pages/admin/AdminReports';
import AdminSettings from '../pages/admin/AdminSettings';

const protect = (role, Page) => (
  <ProtectedRoute allowedRole={role}>
    <Page />
  </ProtectedRoute>
);

function AppRoutes() {
  return (
    <Routes>

      {/* Common Routes */}
      <Route
        path="/"
        element={<Navigate to="/login" replace />}
      />

      <Route
        path="/login"
        element={<Login />}
      />

      <Route
        path="/register"
        element={<Register />}
      />

      <Route
        path="/dashboard"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />

      {/* ==================== STUDENT ==================== */}

      <Route
        path="/student/dashboard"
        element={protect('Student', StudentDashboard)}
      />

      <Route
        path="/student/profile"
        element={protect('Student', StudentProfile)}
      />

      <Route
        path="/student/projects"
        element={protect('Student', StudentProjects)}
      />

      <Route
        path="/student/team"
        element={protect('Student', StudentTeam)}
      />

      {/* ==================== PROJECT LEAD ==================== */}

      <Route
        path="/lead/dashboard"
        element={protect('Project Lead', LeadDashboard)}
      />

      <Route
        path="/lead/create-project"
        element={protect('Project Lead', CreateProject)}
      />

      <Route
        path="/lead/projects"
        element={protect('Project Lead', ManageProjects)}
      />

      {/* View Project */}
      <Route
        path="/lead/projects/view/:id"
        element={protect('Project Lead', ViewProject)}
      />

      {/* Edit Project */}
      <Route
        path="/lead/projects/edit/:id"
        element={protect('Project Lead', EditProject)}
      />

      <Route
        path="/lead/applications"
        element={protect('Project Lead', Applications)}
      />

      <Route
        path="/lead/team"
        element={protect('Project Lead', TeamFormation)}
      />

      {/* ==================== FACULTY ==================== */}

      <Route
        path="/faculty/dashboard"
        element={protect('Faculty Advisor', FacultyDashboard)}
      />

      <Route
        path="/faculty/projects"
        element={protect('Faculty Advisor', FacultyProjects)}
      />

      <Route
        path="/faculty/evaluation"
        element={protect('Faculty Advisor', TeamEvaluation)}
      />

      <Route
        path="/faculty/students"
        element={protect('Faculty Advisor', StudentPerformance)}
      />

      <Route
        path="/faculty/reports"
        element={protect('Faculty Advisor', FacultyReports)}
      />

      {/* ==================== ADMIN ==================== */}

      <Route
        path="/admin/dashboard"
        element={protect('Admin', AdminDashboard)}
      />

      <Route
        path="/admin/users"
        element={protect('Admin', UserManagement)}
      />

      <Route
        path="/admin/projects"
        element={protect('Admin', ProjectManagement)}
      />

      <Route
        path="/admin/teams"
        element={protect('Admin', TeamManagement)}
      />

      <Route
        path="/admin/skills"
        element={protect('Admin', SkillsManagement)}
      />

      <Route
        path="/admin/reports"
        element={protect('Admin', AdminReports)}
      />

      <Route
        path="/admin/settings"
        element={protect('Admin', AdminSettings)}
      />

      {/* Unknown Route */}
      <Route
        path="*"
        element={<Navigate to="/login" replace />}
      />

    </Routes>
  );
}

export default AppRoutes;