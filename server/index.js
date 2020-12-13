const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "root",
  database: "employeeSystem",
});

app.get("/employees", (req, res) => {
  db.query("SELECT * FROM employees", (error, result) => {
    try {
      res.send(result);
    } catch (error) {
      console.log(error);
    }
  });
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const age = req.body.age;
  const country = req.body.country;
  const position = req.body.position;
  const salary = req.body.salary;

  db.query(
    "INSERT INTO employees (name, age, country, position, salary ) VALUE(?,?,?,?,?)",
    [name, age, country, position, salary],
    (err, result) => {
      try {
        res.send("Values inserted");
      } catch (error) {
        console.log(error);
      }
    }
  );
});

// app.put("/update", (req, res) => {
//   const id = req.body.id;
//   const salary = req.body.salary;

//   db.query("UPDATE employees SET salary = ? WHERE id = ?", [salary, id]),
//     (err, result) => {
//       if (err) {
//         console.log(err);
//       } else {
//         res.send(result);
//       }
//     };
// });

app.put("/update", (req, res) => {
  const id = req.body.id;
  const salary = req.body.salary;
  db.query(
    "UPDATE employees SET salary = ? WHERE id = ?",
    [salary, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM employees WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen("3001", () => {
  console.log("Server running on port 3001");
});
