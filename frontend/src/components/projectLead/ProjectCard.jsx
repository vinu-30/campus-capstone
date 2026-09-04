// Reusable project card used in the lead dashboard and project management page.

import { useNavigate } from 'react-router-dom';

function ProjectCard({ project, onDelete }) {
  const navigate = useNavigate();

  const skills = project.required_skills
    ? project.required_skills
        .split(',')
        .map((skill) => skill.trim())
        .filter(Boolean)
    : [];

  return (
    <article className="lead-project-card">

      <div className="d-flex justify-content-between">
        <span className="lead-status">
          {project.status || 'Planning'}
        </span>

        <i className="bi bi-folder-fill text-primary" />
      </div>

      <h3>{project.title}</h3>

      <p>{project.description || 'No description available.'}</p>

      <div className="lead-tags">
        {skills.length > 0 ? (
          skills.map((skill) => (
            <span key={skill}>{skill}</span>
          ))
        ) : (
          <span>No skills specified</span>
        )}
      </div>

      <small>
        <i className="bi bi-people" />{' '}
        {project.team_members || 0} team members
      </small>

      <div className="lead-actions">

        {/* View Project */}
        <button
          type="button"
          className="btn btn-sm btn-outline-primary"
          onClick={() =>
            navigate(`/lead/projects/view/${project.id}`)
          }
        >
          View
        </button>

        {/* Edit Project */}
        <button
          type="button"
          className="btn btn-sm btn-outline-secondary"
          onClick={() =>
            navigate(`/lead/projects/edit/${project.id}`)
          }
        >
          Edit
        </button>

        {/* Delete Project */}
        {onDelete && (
          <button
            type="button"
            className="btn btn-sm btn-outline-danger"
            onClick={() => onDelete(project.id)}
          >
            Delete
          </button>
        )}

      </div>

    </article>
  );
}

export default ProjectCard;