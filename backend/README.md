<!-- Beginner-friendly backend setup and API documentation. -->
# Campus Capstone Backend

This Express.js REST API uses a simple MVC structure and MySQL.

## Setup

1. Run `database/schema.sql` in MySQL Workbench.
2. Copy `.env.example` to `.env` and enter your MySQL password.
3. Run `npm.cmd run dev` in this folder.

## API endpoints

- `GET /api/health` — checks the server.
- `GET, POST /api/students` — lists or creates students.
- `GET, PUT, DELETE /api/students/:id` — manages one student.
- `GET, POST /api/projects` — lists or creates projects.
- `GET, PUT, DELETE /api/projects/:id` — manages one project.
- `GET /api/dashboard/summary` — returns dashboard totals and recent projects.
