var express = require("express");
var got = require("got");
var bodyParser = require("body-parser");
var app = express();

var load_file = require("./lib/load_files");
var code_snippet = require("./lib/code_snippet");

app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }))
app.use("/public", express.static(__dirname + "/public"));

app.set('view engine', 'ejs');

var server  = app.listen(3000, function(){
	console.log("Node.js is listening to PORT:" + server.address().port);
});

app.get("/", function(req, res, next){
	var file_result  = load_file.read_files("./", 0, 0);
	// var file_name    = req.query.file_name
	// console.log(file_result)
	res.render("index", {all_files: file_result});
});

app.get("/search_result", function(req, res, next){
	//
	var gcp_api_key = process.env.GCP_API_KEY;
	var keyword 	= req.query.keyword.replace(/\'/gi, "");
	var gcp_request_url = "https://www.googleapis.com/customsearch/v1?key=" + gcp_api_key + "&cx=51356a11eee1142c3&q=" + keyword
	var response_result;
	(async() => {
		try {
			const response = await got(gcp_request_url);
			response_result = response.body
		} catch (error) {
			console.log(error);
		}
	})()
	.then(function(){
		res.send({search_result: response_result})
	})
});

app.get("/file_content", function(req, res, next){
	var file_name 	 = req.query.file_name;
	console.log(file_name);
	var file_content = load_file.read_file(file_name);
	res.json({'file_content':file_content});
});

app.post("/create_file", function(req, res, next){
	var file_path = req.body.file_path;
	var file_content = req.body.file_content;
	load_file.generate_file(file_path, file_content)
	res.json({file_name: file_path})
})
app.post("/create_tempfile", function(req, res, next){
	var file_original_path = req.body.file_path;
	var file_temp_path = "user_data/" + file_original_path;
	var file_content = req.body.file_content;
	load_file.generate_tempfile(file_original_path, file_content)
	res.json({file_name: file_temp_path})
})
app.post("/new_file", function(req, res, next){
	var folder_path = req.body.foldername;
	var file_name 	= req.body.filename;
	var file_path 	= folder_path + "/" + file_name
	console.log(file_path);
	var is_file_new = load_file.generate_new_file(file_path)
	res.json({file_path: file_path, is_file_new: is_file_new})
})

app.get("/get_code_snippet", function(req, res, next){
	var page_url = req.query.page_url;
	code_snippet.get_code_snippet_json(page_url, res)	
});


