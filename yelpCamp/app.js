// Dependencies
var express = require("express");
var axios = require ("axios")
var app = express();
var bodyParser = require("body-parser")

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"))
app.set("view engine", "ejs")

// API's
// root path
app.get("/", function(req, res){
	res.render("home");
});




// Catch all wrong paths and send them a 404 page not found error
app.get("*", function(req, res){
	res.send("404 Page Not Found")
});
// Start server on port 3000 -> localhost:3000
app.listen(3000, function(){
	console.log("Serving on port 3000...")
});