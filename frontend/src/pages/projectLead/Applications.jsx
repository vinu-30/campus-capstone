// Project Lead applications page using live data from the backend API.

import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import ApplicationCard from '../../components/projectLead/ApplicationCard';
import api from '../../services/api';

function Applications() {
  const [applications, setApplications] = useState([]);
  const [notice, setNotice] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadApplications();
  }, []);

  async function loadApplications() {
    try {
      const response = await api.get('/applications');

      const data = response.data.data.map((item) => ({
        id: item.id,
        name: item.student_name,
        email: item.student_email,
        department: item.department,
        skills: [],
        experience: item.year_of_study || 'Student',
        date: new Date(item.created_at).toLocaleDateString(),
        status: item.status,
        projectTitle: item.project_title
      }));

      setApplications(data);
    } catch (error) {
      console.error('Failed to load applications:', error);
      setNotice('Unable to load applications. Please check the backend server.');
    } finally {
      setLoading(false);
    }
  }

  async function handleAction(id, name, action) {
    try {
      const status = action === 'accepted' ? 'Accepted' : 'Rejected';

      await api.patch(`/applications/${id}/status`, {
        status
      });

      setApplications((currentApplications) =>
        currentApplications.map((item) =>
          item.id === id
            ? { ...item, status }
            : item
        )
      );

      setNotice(`${name} was ${action}.`);
    } catch (error) {
      console.error('Failed to update application:', error);
      setNotice('Failed to update application. Please try again.');
    }
  }

  return (
    <DashboardLayout>
      <main className="lead-page">
        <div className="lead-heading">
          <div>
            <h1>Student Applications</h1>
            <p>Review applicants for your active projects.</p>
          </div>
        </div>

        {notice && (
          <div className="alert alert-info">
            {notice}
          </div>
        )}

        <section className="lead-panel table-responsive">
          <table className="table lead-table">
            <thead>
              <tr>
                <th>STUDENT</th>
                <th>DEPARTMENT</th>
                <th>SKILLS</th>
                <th>EXPERIENCE</th>
                <th>APPLIED</th>
                <th>ACTIONS</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6">Loading applications...</td>
                </tr>
              ) : applications.length === 0 ? (
                <tr>
                  <td colSpan="6">No applications found.</td>
                </tr>
              ) : (
                applications.map((item) => (
                  <ApplicationCard
                    key={item.id}
                    application={item}
                    onAction={(id, name, action) =>
                      handleAction(id, name, action)
                    }
                  />
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </DashboardLayout>
  );
}

export default Applications;