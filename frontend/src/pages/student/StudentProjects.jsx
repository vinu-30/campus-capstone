// Student project page.
// Fetches available projects from the backend API.

import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ProjectCard from '../../components/student/ProjectCard';

function StudentProjects() {
  const [projects, setProjects] = useState([]);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchProjects = async () => {
      try {
        const response = await fetch('http://localhost:5000/api/projects');
        const result = await response.json();

        if (result.success) {
          setProjects(result.data);
        } else {
          setError('Failed to load projects.');
        }
      } catch (err) {
        setError('Unable to connect to the backend server.');
      } finally {
        setLoading(false);
      }
    };

    fetchProjects();
  }, []);

  const handleApply = (title) => {
    setMessage(`You have applied for ${title}.`);
  };

  return (
    <DashboardLayout>
      <main className="student-page">
        <div className="student-page-heading">
          <div>
            <h1>Find Projects</h1>
            <p>Explore open capstone opportunities for your next team.</p>
          </div>
        </div>

        {message && (
          <div className="alert alert-success">
            {message}
          </div>
        )}

        {loading && (
          <div className="alert alert-info">
            Loading projects...
          </div>
        )}

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="alert alert-info">
            No projects available.
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="student-project-grid">
            {projects.map((project) => (
              <ProjectCard
                key={project.id}
                project={{
                  ...project,
                  membersNeeded: 0,
                  skills: []
                }}
                onApply={handleApply}
              />
            ))}
          </div>
        )}
      </main>
    </DashboardLayout>
  );
}

export default StudentProjects;