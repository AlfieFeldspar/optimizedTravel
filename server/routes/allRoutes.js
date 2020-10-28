const express = require("express");
// require('dotenv').config({path: '../server/.env'});

const router = express.Router();

// connecting to local or served mysql database
const mysql = require("mysql");

let pool;

if (process.env.NODE_ENV === "production") {
  pool = mysql.createPool(process.env.CLEARDB_DATABASE_URL);
} else {
  pool = mysql.createPool({
    connectionLimit: 10,
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: "homeHealthAgency",
  });
  // eslint-disable-next-line no-console
  console.log("end of pool");
}

// essentially a route for testing
router.get("/", (request, response, next) => {
  response.send("hello from api root!");
});

// endpoint for users logging in. Adds user to DB, returns
// newUser w/ {Id, name, active} to front end
// router.post("/login", (request, response, next) => {
//   // Create a new user and add them to database
//   if (!request.body.username) {
//     // eslint-disable-next-line no-console
//     console.log("Please add a username");
//   }

//   const newUser = {
//     user_Id: Math.floor(Math.random() * 50000),
//     name: request.body.username,
//     active: 1,
//   };
//   // Query the pool
// //   pool.query(
//     "insert into users (user_Id, username, active, timestamp) values (?, ?, ?, CURRENT_TIMESTAMP)",
//     [newUser.user_Id, newUser.name, newUser.active],
//     (error, results, fields) => {
//       if (error) throw error;
//       pool.query(
//         "select user_Id, username, active, timestamp from users where user_Id = ?",
//         newUser.user_Id,
//         (error, results, fields) => {
//           if (error) throw error;
//           response.send(results[0]);
//         }
//       );
//     }
//   );
// });

// endpoint for grabbing all patients
router.get("/patients", (request, response, next) => {
  // Query the pool
  pool.query("select * from ptTable", (error, results, fields) => {
    // Handle error after the release.
    if (error) throw error;
    // send newUser to front end
    response.send(results);
  });
});

// // endpoint for grabbing all patients for one nurse
// router.get('/patients/:nurse', (request, response, next) => {
//   // Query the pool
// eslint-disable-next-line max-len
// pool.query('SELECT rnTable.rnFirstName, rnTable.rnLastName, rnTable.rnHomeLng, rnTable.rnHomeLat, ptTable.ptFirstName, ptTable.ptLastName, ptTable.ptHomeLng, ptTable.ptHomeLat, ptTable.nursingNeed FROM rnTable INNER JOIN ptTable ON rnTable.rn_Id=ptTable.rn_Id WHERE rnTable.rn_Id = ?', request.params.nurse, (error, results, fields) => {
//     // Handle error after the release.
//     if (error) throw error;
//     // send nurse info and pt list to front end
//     response.send(results);
//   });
// });

router.get("/patients/:nurse", (request, response, next) => {
  // Query the pool
  pool.query(
    "SELECT ptTable.pt_Id, ptTable.ptFirstName, ptTable.ptLastName, ptTable.ptHomeLng, ptTable.ptHomeLat, ptTable.nursingNeed, ptTable.visitPriority FROM ptTable INNER JOIN rnTable ON ptTable.rn_Id=rnTable.rn_Id WHERE rnTable.rn_Id = ? ORDER BY ptTable.ptLastName ASC",
    request.params.nurse,
    (error, results, fields) => {
      // Handle error after the release.
      if (error) throw error;
      // send nurse info and pt list to front end
      response.send(results);
    }
  );
});

module.exports = router;
