const fs = require('fs');
const path = require('path');
const inquirer = require('inquirer');
const connection = require('../db/db');


function queryDB(sql, values = []) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
}

function executeSqlFile(filePath) {
  const sql = fs.readFileSync(filePath, 'utf-8');
  const queries = sql.split(';').filter((query) => query.trim() !== '');
  return Promise.all(queries.map((query) => queryDB(query)));
}

async function createSchema() {
  try {
    const schemaFilePath = path.join(__dirname, 'schema.sql');
    await executeSqlFile(schemaFilePath);
    console.log('Database schema created successfully!');
  } catch (err) {
    console.error('Error creating database schema:', err);
  }
}

async function seedData() {
  try {
    const seedFilePath = path.join(__dirname, 'seed.sql');
    await executeSqlFile(seedFilePath);
    console.log('Database seeded with initial data!');
  } catch (err) {
    console.error('Error seeding database:', err);
  }
}


async function viewAllEmployees() {
  try {
    const sql = 'SELECT * FROM employees';
    const employees = await queryDB(sql);
    console.table(employees);
  } catch (err) {
    console.error('Error fetching employees:', err);
  }
}

async function viewAllRoles() {
    try {
      const sql = 'SELECT * FROM roles';
      const roles = await queryDB(sql);
      console.table(roles);
    } catch (err) {
      console.error('Error fetching roles:', err);
    }
  }

  async function viewAllDepartments() {
    try {
      const sql = 'SELECT * FROM departments';
      const departments = await queryDB(sql);
      console.table(departments);
    } catch (err) {
      console.error('Error fetching departments:', err);
    }
  }

//   async function addEmployee() {
//     try {
//       const sql = 'INSERT INTO * FROM employees';
//       const employees = await queryDB(sql);
//       console.table(employees);
//     } catch (err) {
//       console.error('Error fetching employees:', err);
//     }
//   }



//   async function addDepartment() {
//     try {
//       const sql = 'INSERT INTO * FROM departments';
//       const departments = await queryDB(sql);
//       console.table(departments);
//     } catch (err) {
//       console.error('Error fetching departments:', err);
//     }
//   }

//   async function addRole() {
//     try {
//       const sql = 'INSERT INTO * FROM roles';
//       const roles = await queryDB(sql);
//       console.table(roles);
//     } catch (err) {
//       console.error('Error fetching roles:', err);
//     }
//   }


async function addEmployee() {
  try {
    const employeeData = await inquirer.prompt([
      // Prompt for employee details (first_name, last_name, role_id, manager_id)
      // ...
    ]);

    const sql = 'INSERT INTO employees (first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)';
    await queryDB(sql, [employeeData.first_name, employeeData.last_name, employeeData.role_id, employeeData.manager_id]);
    console.log('New employee added successfully!');
  } catch (err) {
    console.error('Error adding employee:', err);
  }
}

async function addRole() {
  try {
    const roleData = await inquirer.prompt([
      // Prompt for role details (title, salary, department_id)
      // ...
    ]);

    const sql = 'INSERT INTO roles (title, salary, department_id) VALUES (?, ?, ?)';
    await queryDB(sql, [roleData.title, roleData.salary, roleData.department_id]);
    console.log('New role added successfully!');
  } catch (err) {
    console.error('Error adding role:', err);
  }
}

async function addDepartment() {
  try {
    const departmentData = await inquirer.prompt([
      // Prompt for department details (name)
      // ...
    ]);

    const sql = 'INSERT INTO departments (name) VALUES (?)';
    await queryDB(sql, [departmentData.name]);
    console.log('New department added successfully!');
  } catch (err) {
    console.error('Error adding department:', err);
  }
}

  


async function mainMenu() {
  try {
    const { action } = await inquirer.prompt([
      {
        type: 'list',
        name: 'action',
        message: 'What would you like to do?',
        choices: [
          'View all employees',
          'View all departments',
          'View all roles',
          'Add employee',
          'Add department',
          'Add role',
          'Exit',
        ],
      },
    ]);

    switch (action) {
      case 'View all employees':
        await viewAllEmployees();
        break;
      case 'View all departments':
        viewAllDepartments()
        break;
      case 'View all roles':
        viewAllRoles()
        break;
      case 'Add employee':
        addEmployee()
        break;
      case 'Add department':
        addDepartment()
        break;
      case 'Add role':
        addRole()
        break;
      case 'Exit':
        connection.end();
        console.log('Goodbye!');
        return;
    }
  } catch (err) {
    console.error('Error:', err);
  }

  
  mainMenu();
}

// Start app
connection.connect(async (err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }

  console.log('Connected to MySQL database!');
  
 
  await createSchema();
  await seedData();

  // Start main menu
  mainMenu();
});
