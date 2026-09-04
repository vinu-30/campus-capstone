CREATE TABLE applications (
  id INT NOT NULL AUTO_INCREMENT,
  student_id INT NOT NULL,
  project_id INT NOT NULL,
  status ENUM('Pending', 'Accepted', 'Rejected') NOT NULL DEFAULT 'Pending',
  message VARCHAR(500) NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (id),
  UNIQUE KEY unique_student_project (student_id, project_id),
  FOREIGN KEY (student_id) REFERENCES students(id) ON DELETE CASCADE,
  FOREIGN KEY (project_id) REFERENCES projects(id) ON DELETE CASCADE
);