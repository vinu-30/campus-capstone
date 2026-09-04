// Loads project data from the MySQL-backed REST API.
import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ProjectCard from '../../components/projectLead/ProjectCard';
import projectService from '../../services/projectService';

function ManageProjects() {
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError('');

      const data = await projectService.getAll();

      setProjects(data);
    } catch (err) {
      console.error('Failed to load projects:', err);

      setError(
        err.response?.data?.message ||
        'Failed to load projects.'
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  const handleDelete = async (id) => {
    try {
      await projectService.delete(id);

      setProjects((prevProjects) =>
        prevProjects.filter((project) => project.id !== id)
      );
    } catch (err) {
      console.error('Failed to delete project:', err);

      setError(
        err.response?.data?.message ||
        'Failed to delete project.'
      );
    }
  };

  return (
    <DashboardLayout>
      <main className="lead-page">

        <div className="lead-heading">
          <div>
            <h1>My Projects</h1>
            <p>
              View, update, and organize your capstone projects.
            </p>
          </div>
        </div>

        {loading && (
          <div className="lead-panel">
            <p>Loading projects...</p>
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="lead-panel">
            <p>No projects found.</p>
          </div>
        )}

        {!loading && projects.length > 0 && (
          <div className="lead-project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                onDelete={() => handleDelete(project.id)}
              />
            ))}
          </div>
        )}

      </main>
    </DashboardLayout>
  );
}

export default ManageProjects;