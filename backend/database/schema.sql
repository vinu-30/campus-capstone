-- Run this script in MySQL Workbench to create the Campus Capstone database.
CREATE DATABASE IF NOT EXISTS campus_capstone;
USE campus_capstone;

CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  github_username VARCHAR(39) NULL,
  department VARCHAR(100) NOT NULL,
  year_of_study VARCHAR(30) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- For an already-created database, run this once instead of recreating the table:
-- ALTER TABLE students ADD COLUMN github_username VARCHAR(39) NULL AFTER email;

CREATE TABLE faculty_advisors (
  id INT AUTO_INCREMENT PRIMARY KEY,
  full_name VARCHAR(100) NOT NULL,
  email VARCHAR(120) NOT NULL UNIQUE,
  department VARCHAR(100) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE skills (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(80) NOT NULL UNIQUE,
  category VARCHAR(80),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE teams (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100) NOT NULL,
  advisor_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (advisor_id) REFERENCES faculty_advisors(id) ON DELETE SET NULL
);

CREATE TABLE projects (
  id INT AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR(150) NOT NULL,
  category VARCHAR(100) NOT NULL,
  description TEXT,
  status ENUM('Planning', 'In Progress', 'Review', 'Completed') DEFAULT 'Planning',
  progress TINYINT UNSIGNED DEFAULT 0,
  team_id INT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE SET NULL
);

CREATE TABLE student_skills (
  student_id INT NOT NULL,
  skill_id INT NOT NULL,
  proficiency ENUM('Beginner', 'Intermediate', 'Advanced') DEFAULT 'Beginner',
  PRIMARY KEY (student_id, skill_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE
);

CREATE TABLE team_members (
  team_id INT NOT NULL,
  student_id INT NOT NULL,
  PRIMARY KEY (team_id, student_id),
  FOREIGN KEY (team_id) REFERENCES teams(id) ON DELETE CASCADE,
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE
);

-- Optional starter skills so you can test the dashboard after creating the database.
INSERT IGNORE INTO skills (name, category) VALUES ('React', 'Frontend'), ('Node.js', 'Backend'), ('MySQL', 'Database'), ('UI/UX Design', 'Design');
