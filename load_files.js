//
var fs = require("fs");
var indexed_file_map = new Map();
var file_result = [];

function readFiles(file_path, file_depth){
	fs.readdirSync(file_path).forEach( function(file){
		//
		var each_file_path  = file_path + file;
		var each_file_path2 = each_file_path.replace("./", "");
		var each_file_depth = each_file_path2.split("/").length - 1;
		var each_file_stat  = fs.statSync(each_file_path2);
		// console.log(each_file_path2, each_file_depth);
		if ( each_file_stat.isDirectory() ) {
			file_result.push([each_file_path2, each_file_depth, 1]);
			each_file_path2 += "/"
			readFiles(each_file_path2, file_depth);
		} else {
			//
			file_result.push([each_file_path2, each_file_depth, 0]);
		}
	});
	return file_result
}

readFiles("./", 0);
console.log(file_result)