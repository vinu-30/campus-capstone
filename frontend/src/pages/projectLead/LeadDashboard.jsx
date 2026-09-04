// Project Lead dashboard using live data from the backend API.
import { useEffect, useState } from 'react';
import DashboardLayout from '../../layouts/DashboardLayout';
import StatsCard from '../../components/projectLead/StatsCard';
import api from '../../services/api';

const activity = [
  'Priya Sharma applied to Smart Campus Navigator',
  'Team Innovators submitted a weekly update',
  'Faculty feedback received for EcoTrack Analytics'
];

function LeadDashboard() {
  const [stats, setStats] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function loadDashboard() {
      try {
        const response = await api.get('/dashboard/lead');
        setStats(response.data.data.stats);
      } catch (err) {
        console.error('Failed to load lead dashboard:', err);
        setError('Unable to load dashboard data. Please check the backend server.');
      }
    }

    loadDashboard();
  }, []);

  return (
    <DashboardLayout>
      <main className="lead-page">
        <div className="lead-heading">
          <div>
            <h1>Project Lead Dashboard</h1>
            <p>Manage your capstone projects and team activity.</p>
          </div>
        </div>

        {error && <div className="alert alert-warning">{error}</div>}

        <div className="lead-stats">
          <StatsCard
            label="Projects Created"
            value={stats ? stats.projectsCreated : '...'}
            icon="bi-folder-fill"
            color="blue"
          />

          <StatsCard
            label="Active Projects"
            value={stats ? stats.activeProjects : '...'}
            icon="bi-activity"
            color="green"
          />

          <StatsCard
            label="Teams Formed"
            value={stats ? stats.teamsFormed : '...'}
            icon="bi-diagram-3-fill"
            color="purple"
          />

          <StatsCard
            label="Pending Requests"
            value={stats ? stats.pendingRequests : '...'}
            icon="bi-hourglass-split"
            color="orange"
          />
        </div>

        <section className="lead-panel">
          <h2>Recent Activity</h2>

          {activity.map((item, index) => (
            <p className="lead-activity" key={item}>
              <i
                className={`bi ${
                  index === 0
                    ? 'bi-person-plus-fill'
                    : index === 1
                    ? 'bi-people-fill'
                    : 'bi-chat-square-text-fill'
                }`}
              />
              {item}
              <small>{index + 1} hour ago</small>
            </p>
          ))}
        </section>
      </main>
    </DashboardLayout>
  );
}

export default LeadDashboard;

