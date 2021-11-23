const express = require("express");
const mysql = require("mysql2");
const table = require("console.table");
const fs = require("fs");
const inquirer = require("inquirer");

const PORT = process.env.PORT || 3001;
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const db = mysql.createConnection(
  {
    host: "localhost",
    user: "root",
    password: "12345678",
    database: "eetracker_db",
  },
  console.log(`Connected to the eetracker_db database.`)
);

//

app.use((req, res) => {
  res.status(404).end();
});

prompt();

function prompt() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "What would you like to do?",
        name: "choice",
        choices: [
          "View Employees?",
          "View Roles?",
          "View Departments?",
          "Add Department?",
          "Add Role?",
          "Add Employee?",
          "Update Employee",
        ],
      },
    ])
    .then(function (val) {
      switch (val.choice) {
        case "View Employees?":
          viewEes();
          break;
        case "View Roles?":
          viewRoles();
          break;
        case "View Departments?":
          viewDepts();
          break;
        case "Add Employee?":
          addEmployee();
          break;
        case "Update Employee":
          updateEmployee();
          break;
        case "Add Role?":
          addRole();
          break;
        case "Add Department?":
          addDepartment();
          break;
      }
    });
}

function viewEes() {
  db.query(
    "SELECT employee.first_name, employee.last_name, role.title, role.salary, department.name, CONCAT(e.first_name, ' ' ,e.last_name) AS Manager FROM employee INNER JOIN role on role.id = employee.role_id INNER JOIN department on department.id = role.department_id left join employee e on employee.manager_id = e.id;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      prompt();
    }
  );
}

function viewRoles() {
  db.query(
    "SELECT role.id, role.title, role.department_id, role.salary FROM role;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      prompt();
    }
  );
}

function viewDepts() {
  db.query(
    "SELECT department.id, department.name FROM department;",
    function (err, res) {
      if (err) throw err;
      console.table(res);
      prompt();
    }
  );
}

var roleArr = [];
function selectRole() {
  db.query("SELECT * FROM role", function (err, res) {
    if (err) throw err;
    for (var i = 0; i < res.length; i++) {
      roleArr.push(res[i].title);
    }
  });
  return roleArr;
}

function addDepartment() {
  inquirer
    .prompt([
      {
        name: "name",
        type: "input",
        message: "What Department would you like to add?",
      },
      {
        name: "id",
        type: "input",
        message: "What is the ID number for this department?",
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO department SET ? ",
        {
          name: res.name,
          id: res.id,
        },
        
        function (err) {
          if (err) throw err;
          console.table(res);
          prompt();
        }
      );
    });
}

function addRole() {
  inquirer
    .prompt([
      {
        name: "Title",
        type: "input",
        message: "What is the title?",
      },
      {
        name: "Salary",
        type: "input",
        message: "What is the salary?",
      },
    ])
    .then(function (res) {
      db.query(
        "INSERT INTO role SET ?",
        { id: roleArr.length++, title: res.Title, salary: res.Salary },
        function (err) {
          if (err) throw err;
          console.table(res);
          prompt();
        }
      );
    });
}

function addEmployee() {
  inquirer
    .prompt([
      {
        name: "id",
        type: "input",
        message: "What is the employee ID?",
      },
      {
        name: "firstname",
        type: "input",
        message: "Enter their first name ",
      },
      {
        name: "lastname",
        type: "input",
        message: "Enter their last name ",
      },
      {
        name: "role",
        type: "list",
        message: "What is their role? ",
        choices: selectRole(),
      },
      {
        name: "choice1",
        type: "rawlist",
        message: "Who is their manager?",
        choices: selectManager(),
      },
      {
        name: "choice2",
        type: "rawlist",
        message: "Whats their role?",
        choices: selectRole(),
      },
    ])
    .then(function (val) {
      db.query(
        "INSERT INTO employee SET ?",
        { first_name: res.firstname, last_name: res.lastname },
        function (err) {
          if (err) throw err;
          console.table(val);
          prompt();
        }
      );
    });
}

var managersArr = [];
function selectManager() {
  db.query(
    "SELECT id FROM employee WHERE manager_id IS NULL",
    function (err, res) {
      if (err) throw err;
      for (var i = 0; i < res.length; i++) {
        managersArr.push(res[i].first_name);
      }
    }
  );
  return managersArr;
}

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
