var express = require("express");
var app = express();

var load_file = require("./lib/load_files")

app.use("/public", express.static(__dirname + "/public"));

app.set('view engine', 'ejs');

var server  = app.listen(3000, function(){
	console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/", function(req, res, next){
	var file_result = load_file.read_files("./", 0);
	var file_name    = req.query.file_name
	var file_content = load_file.read_file(file_name);
	file_content 	 = file_content.replaceAll("\n", "<br>")
	// console.log(file_result)
	res.render("index", {all_files: file_result, file_content: file_content});
});


