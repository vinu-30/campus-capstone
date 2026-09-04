// Express server entry point: configures middleware and all API routes.

require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorHandler');

const studentRoutes = require('./routes/studentRoutes');
const projectRoutes = require('./routes/projectRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const notificationRoutes = require('./routes/notificationRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const teamRoutes = require('./routes/teamRoutes');
const userRoutes = require('./routes/userRoutes');
const skillRoutes = require('./routes/skillRoutes');
const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL || 'http://localhost:5173'
  })
);

app.use(express.json());

app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Campus Capstone API is running.'
  });
});

app.use('/api/students', studentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/dashboard', dashboardRoutes);
app.use('/api/notifications', notificationRoutes);
app.use('/api/applications', applicationRoutes);
app.use('/api/teams', teamRoutes);
app.use('/api/users', userRoutes);
app.use('/api/skills', skillRoutes);
app.use(notFound);
app.use(errorHandler);

const port = Number(process.env.PORT || 5000);

app.listen(port, () => {
  console.log('API server running at http://localhost:' + port);
});
