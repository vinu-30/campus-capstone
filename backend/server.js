// Express server entry point: configures middleware and all API routes.
require('dotenv').config();

const express = require('express');
const cors = require('cors');

const { notFound, errorHandler } = require('./middleware/errorHandler');

const studentRoutes = require('./routes/studentRoutes');
const projectRoutes = require('./routes/projectRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');
const authRoutes = require('./routes/authRoutes');

const app = express();

// Allow requests from the frontend.
app.use(cors({
  origin: process.env.FRONTEND_URL || 'http://localhost:5173'
}));

// Read JSON request bodies.
app.use(express.json());

// Health check.
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'Campus Capstone API is running.'
  });
});

// API routes.
app.use('/api/auth', authRoutes);
app.use('/api/students', studentRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/dashboard', dashboardRoutes);

// Error handling.
app.use(notFound);
app.use(errorHandler);

// Start server.
const port = Number(process.env.PORT || 5000);

app.listen(port, () => {
  console.log(`API server running at http://localhost:${port}`);
});