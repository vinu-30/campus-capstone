import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import DashboardLayout from '../../layouts/DashboardLayout';
import projectService from '../../services/projectService';

function EditProject() {
  const { id } = useParams();
  const nav = useNavigate();

  const [formData, setFormData] = useState({
    title: '',
    category: '',
    technologies: '',
    skills: '',
    teamMembers: '',
    duration: '',
    deadline: '',
    description: ''
  });

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const loadProject = async () => {
      try {
        const project = await projectService.getById(id);

        setFormData({
          title: project.title || '',
          category: project.category || '',
          technologies: project.technologies || '',
          skills: project.required_skills || '',
          teamMembers: project.team_members || '',
          duration: project.duration || '',
          deadline: project.deadline
            ? project.deadline.substring(0, 10)
            : '',
          description: project.description || ''
        });
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

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const submit = async (e) => {
    e.preventDefault();

    setSaving(true);
    setError('');

    try {
      await projectService.update(id, {
        title: formData.title,
        category: formData.category,
        technologies: formData.technologies,
        required_skills: formData.skills,
        team_members: formData.teamMembers,
        duration: formData.duration,
        deadline: formData.deadline,
        description: formData.description
      });

      nav('/lead/projects');
    } catch (err) {
      console.error('Project update failed:', err);

      setError(
        err.response?.data?.message ||
        'Failed to update project.'
      );
    } finally {
      setSaving(false);
    }
  };

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

  return (
    <DashboardLayout>
      <main className="lead-page">

        <div className="lead-heading">
          <div>
            <h1>Edit Project</h1>
            <p>Update the details of your capstone project.</p>
          </div>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form
          className="lead-panel create-form"
          onSubmit={submit}
        >
          <div className="row g-3">

            <div className="col-md-6">
              <label className="form-label">
                Project Title
              </label>

              <input
                className="form-control"
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Project Category
              </label>

              <input
                className="form-control"
                type="text"
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Required Technologies
              </label>

              <input
                className="form-control"
                type="text"
                name="technologies"
                value={formData.technologies}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Required Skills
              </label>

              <input
                className="form-control"
                type="text"
                name="skills"
                value={formData.skills}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Number of Team Members
              </label>

              <input
                className="form-control"
                type="number"
                name="teamMembers"
                value={formData.teamMembers}
                onChange={handleChange}
                min="1"
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Project Duration
              </label>

              <input
                className="form-control"
                type="text"
                name="duration"
                value={formData.duration}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-md-6">
              <label className="form-label">
                Project Deadline
              </label>

              <input
                className="form-control"
                type="date"
                name="deadline"
                value={formData.deadline}
                onChange={handleChange}
                required
              />
            </div>

            <div className="col-12">
              <label className="form-label">
                Project Description
              </label>

              <textarea
                className="form-control"
                rows="4"
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
              />
            </div>

          </div>

          <div className="mt-4 d-flex gap-2">

            <button
              type="submit"
              className="btn btn-primary"
              disabled={saving}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>

            <button
              type="button"
              className="btn btn-outline-secondary"
              onClick={() => nav('/lead/projects')}
            >
              Cancel
            </button>

          </div>
        </form>

      </main>
    </DashboardLayout>
  );
}

export default EditProject;