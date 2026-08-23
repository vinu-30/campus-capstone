// Main dashboard now reads live summary totals from the Express REST API.
import { useEffect, useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import StatCard from '../components/StatCard';
import RecentProjectsTable from '../components/RecentProjectsTable';
import Notifications from '../components/Notifications';
import QuickActions from '../components/QuickActions';
import dashboardService from '../services/dashboardService';

const icons = [
  ['Total Students', 'bi-people-fill', 'blue', 'students'],
  ['Total Projects', 'bi-folder-fill', 'green', 'projects'],
  ['Active Teams', 'bi-diagram-3-fill', 'purple', 'teams'],
  ['Skills Tracked', 'bi-lightning-charge-fill', 'orange', 'skills'],
];

const dashboardHighlights = [
  { label: 'On-time delivery', value: '86%', note: 'Across all teams' },
  { label: 'Project momentum', value: '12', note: 'New updates today' },
  { label: 'Needs attention', value: '03', note: 'Review pending' },
];

function Dashboard() {
  const [totals, setTotals] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    async function load() {
      try {
        const summary = await dashboardService.getSummary();
        setTotals(summary.totals);
      } catch (err) {
        setError('Unable to load dashboard data. Please check the backend server.');
      }
    }

    load();
  }, []);

  return (
    <DashboardLayout>
      <div className="dashboard-content">
        <section className="dashboard-hero">
          <div className="dashboard-hero__text">
            <span className="hero-pill">Live studio overview</span>
            <h1>Campus Capstone Command Center</h1>
            <p>
              Track student performance, project delivery, and team alignment from a single,
              polished workspace.
            </p>
            <div className="hero-meta">
              <span className="hero-chip">
                <i className="bi bi-calendar-check-fill" /> This week
              </span>
              <span className="hero-chip">
                <i className="bi bi-rocket-takeoff-fill" /> 6 new activities
              </span>
              <span className="hero-chip">
                <i className="bi bi-shield-check" /> System healthy
              </span>
            </div>
          </div>

          <div className="dashboard-hero__stats">
            {dashboardHighlights.map((item) => (
              <article key={item.label}>
                <p>{item.label}</p>
                <h2>{item.value}</h2>
                <small>{item.note}</small>
              </article>
            ))}
          </div>
        </section>

        {error && <div className="alert alert-warning">{error}</div>}

        <section className="stats-grid">
          {icons.map(([title, icon, color, key]) => (
            <StatCard
              key={key}
              title={title}
              value={totals ? totals[key] : '...'}
              icon={icon}
              color={color}
              change="Live data"
            />
          ))}
        </section>

        <section className="row g-4 dashboard-grid">
          <div className="col-xl-8">
            <RecentProjectsTable />
          </div>
          <div className="col-xl-4">
            <Notifications />
          </div>
        </section>

        <section className="mt-4">
          <QuickActions />
        </section>
      </div>
    </DashboardLayout>
  );
}

export default Dashboard;
