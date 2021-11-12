const express = require("express");
const mysql = require("mysql2");
const table = require("console.table");
const fs = require("fs");

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

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
