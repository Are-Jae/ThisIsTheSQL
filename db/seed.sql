INSERT INTO departments (name) VALUES
  ('Sales'),
  ('Marketing'),
  ('Engineering');

INSERT INTO roles (title, salary, department_id) VALUES
  ('Sales Manager', 70000.00, 1),
  ('Sales Representative', 50000.00, 1),
  ('Marketing Specialist', 60000.00, 2),
  ('Software Engineer', 80000.00, 3);

INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES
  ('Brian', 'Danielson', 1, NULL),
  ('Jon', 'Moxley', 2, 1),
  ('Claudio', 'Castagnoli', 2, 1),
  ('Wheeler', 'Yuta', 3, NULL);
