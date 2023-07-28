
const inquirer = require('inquirer');
const connection = require('./db');

// function to perform queries
function queryDB(sql, values = []) {
  return new Promise((resolve, reject) => {
    connection.query(sql, values, (err, results) => {
      if (err) reject(err);
      resolve(results);
    });
  });
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
        // Implement function to view all employees
        break;
      case 'View all departments':
        // Implement function to view all departments
        break;
      case 'View all roles':
        // Implement function to view all roles
        break;
      case 'Add employee':
        // Implement function to add employee
        break;
      case 'Add department':
        // Implement function to add department
        break;
      case 'Add role':
        // Implement function to add role
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
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
  mainMenu();
});

async function viewAllEmployees() {
    try {
      const sql = 'SELECT * FROM employees';
      const employees = await queryDB(sql);
      console.table(employees);
    } catch (err) {
      console.error('Error fetching employees:', err);
    }
  }
  
  // Similar functions for viewAllDepartments(), viewAllRoles(), addEmployee(), addDepartment(), and addRole()
  // Don't forget to implement the necessary Inquirer prompts to get user input for adding new records.
  