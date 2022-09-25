const express = require("express");
const cors = require("cors");
const mysql = require("mysql");
var bodyParser = require("body-parser");
const { application } = require("express");
const port = "3001";

// create application/json parser
var jsonParser = bodyParser.json();

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });

// Configuration database
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  port: "3306",
  database: "petpooja",
});

// Connect to the database
db.connect((err) => {
  if (err) {
    console.log(err);
  }
  console.log("Connected to MySQL Server");
});

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());

// get management
app.get("/getmanagment", (req, res) => {
  let sql = "SELECT * FROM managment";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// get management
app.get("/getcookingtables", (req, res) => {
  let sql =
    "SELECT * FROM managment WHERE status = 0 ORDER BY tablenumber, fooditem";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//update food item status
app.post("/updatefooditemstatus/:id", jsonParser, (req, res) => {
  let sql = `UPDATE managment SET status = 1 WHERE id =${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//update food item quantity
app.post("/updatefooditemquantity/:id/:value/:total", jsonParser, (req, res) => {
  let sql = `UPDATE managment SET quantity = ${req.params.value}, total = ${req.params.total} WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// delete food item from table
app.delete("/deletefooditem/:id", jsonParser, (req, res) => {
  let sql = `DELETE FROM managment WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  })
});

//add food item to table
app.post("/addfooditem", jsonParser, (req, res) => {
  let pass = req.body;
  let sql = `INSERT INTO managment (foodid, fooditem, foodprice, quantity, total, tablenumber, status) VALUES (${pass.foodid}, '${pass.fooditem}', ${pass.foodprice}, ${pass.quantity}, ${pass.total}, ${pass.tablenumber}, ${pass.status})`;
  db.query(sql, pass, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  })
});

//get table food items
app.get("/gettable/:id", (req, res) => {
  let sql = `SELECT * FROM managment WHERE tablenumber= '${req.params.id}'`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//reset table
app.get("/resttable/:id", (req, res) =>{
  let sql = `ALTER TABLE managment DROP COLUMN tablenumber= ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// get menu
app.get("/getmenu", (req, res) => {
  let sql = "SELECT * FROM menu";
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

// get menu
app.get("/getmenuattable/:tableId", (req, res) => {
  let sql = `SELECT * FROM menu WHERE name NOT IN (SELECT fooditem FROM managment WHERE tablenumber = ${req.params.tableId})`;
  // res.send(sql);
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//get food items
app.get("/getfood/:id", (req, res) => {
  let sql = `SELECT * FROM menu WHERE id= ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//update food items
app.post("/updatemenufood/:id", jsonParser, (req, res) => {
  let sql = `UPDATE menu SET name = '${req.body.name}', price = ${req.body.price}  WHERE id = ${req.params.id}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//add food to menu
app.post("/addmenufood", jsonParser, (req, res) => {
  let sql = `INSERT INTO menu (name, price) VALUES ('${req.body.name}', ${req.body.price})`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    }
    res.send(result);
  });
});

//delete food from menu
app.post("/deletemenufood/:foodId", jsonParser, (req, res) => {
  let sql = `DELETE FROM menu WHERE id= ${req.params.foodId}`;
  db.query(sql, (err, result) => {
    if (err) {
      throw err;
    };
    res.send(result);
  })
})

// listen to port
app.listen(port, (err) => {
  console.log(err, port);
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next();
});

// // Create database
// app.get("/createdb", (req, res) => {
//   let sql = "CREATE DATABASE nodemysql";
//   db.query(sql, (err, result) => {
//     console.log(err, result);
//     res.send("Database created successfully");
//   });
// });

// // Create a new employee table
// app.get("/createemployee", (req, res) => {
//   let sql =
//     "CREATE TABLE employee (id int AUTO_INCREMENT, name VARCHAR(255), designation VARCHAR(255), PRIMARY KEY (id))";
//   db.query(sql, (err, result) => {
//     console.log(err, result);
//     res.send("Employee table created");
//   });
// });

// // Create a new employee
// app.get("/employee1", (req, res) => {
//   let post = { name: "Jay Shah", designation: "member" };
//   let sql = "INSERT INTO employee SET ?";
//   let query = db.query(sql, post, (err, result) => {
//     console.log(err, result);
//     res.send("Employee added successfully");
//   });
// });

// //update employee
// app.get("/updateemployee/:id", (req, res) => {
//   let newName = "Updated name";
//   let sql = `UPDATE employee SET name = '${newName}' WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     console.log(err);
//     res.send(result);
//   });
// });

// //delete employee
// app.get("/deleteemployee/:id", (req, res) => {
//   let sql = `DELETE FROM employee WHERE id = ${req.params.id}`;
//   let query = db.query(sql, (err, result) => {
//     if (err) {
//       console.log(err);
//     }
//     res.send("Employee deleted successfully");
//   });
// });
