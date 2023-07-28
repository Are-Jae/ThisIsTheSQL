-- Insert data into the departments table
INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering'),
  ('Human Resources');

-- Insert data into the roles table
INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 70000.00, 1),
  ('Sales Representative', 50000.00, 1),
  ('Marketing Specialist', 60000.00, 2),
  ('Software Engineer', 80000.00, 3),
  ('HR Manager', 65000.00, 4);

-- Insert data into the employees table
INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('John', 'Doe', 1, NULL),
  ('Jane', 'Smith', 2, 1),
  ('Mike', 'Johnson', 2, 1),
  ('Sarah', 'Williams', 3, NULL),
  ('David', 'Brown', 4, 3);
