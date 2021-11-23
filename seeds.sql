
INSERT INTO department (id, name)
VALUE (1, "Sales");
INSERT INTO department (id, name)
VALUE (2, "Engineering");
INSERT INTO department (id,name)
VALUE (3, "Finance");
INSERT INTO department (id, name)
VALUE (4, "Legal");

-- EMPLOYEE ROLE SEEDS -------
INSERT INTO role (id, title, salary, department_id)
VALUE (1, "Sales Lead", 80000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUE (2, "Salesperson", 80000, 1);
INSERT INTO role (id, title, salary, department_id)
VALUE (3, "Lead Engineer", 150000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUE (4, "Software Engineer", 120000, 2);
INSERT INTO role (id, title, salary, department_id)
VALUE (5, "Account Manager", 160000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUE (6, "Accountant", 125000, 3);
INSERT INTO role (id, title, salary, department_id)
VALUE (7, "Legal Team Lead", 250000, 4);
INSERT INTO role (id, title, salary, department_id)
VALUE (8, "Lawyer", 190000, 4);


-- EMPLOYEE SEEDS -------
INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUE (1, "John", "Doe", null, 1);
INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUE (2,"Mike", "Chan", 1, 2);
INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUE (3,"Ashley","Rodriguez",null,3);
INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUE (4,"Kevin", "Tupik", 3, 4);
INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUE (5,"Kunal", "Singh", null, 5);
INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUE (6,"Malia", "Brown", 5, 6);
INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUE (7,"Sarah", "Lourd", null, 7);
INSERT INTO employee (id, first_name, last_name, manager_id, role_id)
VALUE (8,"Tom", "Allen", 7, 8);

