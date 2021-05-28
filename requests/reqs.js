const http = require("http");
const mysql = require("mysql");
const url = require("url");

// Database
// Create a connection object with the user details
const  con = mysql.createPool({
  connectionLimit: 1,
  host: "localhost",
  user: "dunims",
  password: "SecurePasswd!",
  database: "dunims",
  debug: false
});

var res = "USERS:\n";
// Query database
let sql ="SELECT * FROM users";
con.query(sql, (err, result) => {
  if (err) {
    console.error("Error executing query: " + JSON.stringify(err));
  } else {
      //res += "QUERYED SUCCESSFULLY";
      res = JSON.stringify(result);
  }
});

// Server
// Create response  to the server
let myServer = http.createServer( (request, response) => {
  // Create request
  response.writeHead(200, {"Content-Type": "test/html"});
  response.end(res);
  con.end();
});

// Listen on open port
myServer.listen(8888);

