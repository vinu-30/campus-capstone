import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import projectService from '../../services/projectService';

function ViewProject() {
  const { id } = useParams();
  const nav = useNavigate();

  const [project, setProject] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const data = await projectService.getById(id);
        setProject(data);
      } catch (err) {
        console.error('Failed to load project:', err);

        setError(
          err.response?.data?.message ||
          'Failed to load project.'
        );
      } finally {
        setLoading(false);
      }
    };

    loadProject();
  }, [id]);

  if (loading) {
    return (
      <DashboardLayout>
        <main className="lead-page">
          <div className="lead-panel">
            <p>Loading project...</p>
          </div>
        </main>
      </DashboardLayout>
    );
  }

  if (error || !project) {
    return (
      <DashboardLayout>
        <main className="lead-page">
          <div className="alert alert-danger">
            {error || 'Project not found.'}
          </div>

          <button
            className="btn btn-secondary"
            onClick={() => nav('/lead/projects')}
          >
            Back to Projects
          </button>
        </main>
      </DashboardLayout>
    );
  }

  const skills = project.required_skills
    ? project.required_skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  return (
    <DashboardLayout>
      <main className="lead-page">

        <div className="lead-heading">
          <div>
            <h1>{project.title}</h1>
            <p>Project details and requirements.</p>
          </div>
        </div>

        <div className="lead-panel">

          <div className="row g-4">

            <div className="col-md-6">
              <strong>Category</strong>
              <p>{project.category || '-'}</p>
            </div>

            <div className="col-md-6">
              <strong>Status</strong>
              <p>{project.status || '-'}</p>
            </div>

            <div className="col-md-6">
              <strong>Technologies</strong>
              <p>{project.technologies || '-'}</p>
            </div>

            <div className="col-md-6">
              <strong>Required Skills</strong>

              <div className="lead-tags">
                {skills.length > 0 ? (
                  skills.map((skill) => (
                    <span key={skill}>{skill}</span>
                  ))
                ) : (
                  <span>No skills specified</span>
                )}
              </div>
            </div>

            <div className="col-md-6">
              <strong>Team Members</strong>
              <p>{project.team_members || 0}</p>
            </div>

            <div className="col-md-6">
              <strong>Duration</strong>
              <p>{project.duration || '-'}</p>
            </div>

            <div className="col-md-6">
              <strong>Deadline</strong>
              <p>
                {project.deadline
                  ? project.deadline.substring(0, 10)
                  : '-'}
              </p>
            </div>

            <div className="col-md-6">
              <strong>Progress</strong>
              <p>{project.progress || 0}%</p>
            </div>

            <div className="col-12">
              <strong>Description</strong>
              <p>{project.description || '-'}</p>
            </div>

          </div>

          <div className="mt-4 d-flex gap-2">

            <button
              className="btn btn-primary"
              onClick={() =>
                nav(`/lead/projects/edit/${project.id}`)
              }
            >
              Edit Project
            </button>

            <button
              className="btn btn-outline-secondary"
              onClick={() => nav('/lead/projects')}
            >
              Back to Projects
            </button>

          </div>

        </div>

      </main>
    </DashboardLayout>
  );
}

export default ViewProject;
