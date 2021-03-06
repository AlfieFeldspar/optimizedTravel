const { request, response } = require("express");
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

// endpoint for grabbing all nurses
router.get("/nurses", (request, response, next) => {
  // Query the pool
  pool.query("select * from rnTable", (error, results, fields) => {
    // Handle error after the release.
    if (error) throw error;
    // send newUser to front end
    response.send(results);
  });
});

// endpoint for grabbing one nurse by rn_Id
router.get("/nurses/:rnId", (request, response, next) => {
  // Query the pool
  pool.query(
    "SELECT rn_Id, rnLastName, rnHomeLng, rnHomeLat, rnOfficeLng, rnOfficeLat FROM rnTable WHERE rn_Id = ?",
    [request.params.rnId],
    (error, results, fields) => {
      // Handle error after the release.
      if (error) throw error;
      // send newUser to front end
      response.send(results);
    }
  );
});

// Grab all patients for one nurse
router.get("/nursePatients/:rn_Id", (request, response, next) => {
  // Query the pool
  pool.query(
    "SELECT ptTable.pt_Id, ptTable.ptHomeLng, ptTable.ptHomeLat, ptTable.nursingNeed, ptTable.visitPriority, ptTable.ptFirstName, ptTable.ptLastName, ptTable.visitOrder, ptTable.waypointName FROM ptTable INNER JOIN rnTable ON ptTable.rn_Id=rnTable.rn_Id WHERE rnTable.rn_Id = ? ORDER BY ptTable.ptLastName ASC",
    request.params.rn_Id,
    (error, results, fields) => {
      // Handle error after the release.
      if (error) throw error;
      // send nurse info and pt list to front end
      response.send(results);
    }
  );
});

router.post(
  "/patients/:patientId/priority/:priority",
  (request, response, next) => {
    // Query the pool
    pool.query(
      "UPDATE ptTable SET visitPriority = ? WHERE pt_Id = ?",
      [request.params.priority, request.params.patientId],
      (error, results, fields) => {
        if (error) throw error;
        response.send(results);
      }
    );
  }
);

router.post("/clearData", (request, response, next) => {
  pool.query(
    "DELETE FROM ptTable WHERE visitOrder IS NOT NULL",
    (error, results, fields) => {
      if (error) throw error;
      response.send(results);
    }
  );
});

router.post(
  "/patients/:patientId/order/:visitOrder",
  (request, response, next) => {
    pool.query(
      "UPDATE ptTable SET visitOrder = ? WHERE pt_Id = ?",
      [request.params.visitOrder, request.params.patientId],
      (error, results, fields) => {
        if (error) throw error;
        response.send(results);
      }
    );
  }
);

module.exports = router;
