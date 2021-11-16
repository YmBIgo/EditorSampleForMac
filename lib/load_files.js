//
var fs = require("fs");
var indexed_file_map = new Map();
var file_result = [];
var file_count  = 0;

function readFiles(file_path, file_depth, parent_file){
	// 反復 直し
	if ( file_path == "./" && file_depth == 0 && parent_file == 0 ){
		if ( file_result != [] ){
			file_result = []
		}
	}
	fs.readdirSync(file_path).forEach( function(file){
		//
		file_count += 1;
		var each_file_path  = file_path + file;
		var each_file_path2 = each_file_path.replace("./", "");
		var each_file_depth = each_file_path2.split("/").length - 1;
		var each_file_stat  = fs.statSync(each_file_path2);
		// console.log(each_file_path2, each_file_depth);
		if ( each_file_stat.isDirectory() ) {
			file_result.push([each_file_path2, each_file_depth, 1, file, file_count, parent_file]);
			each_file_path2 += "/"
			readFiles(each_file_path2, file_depth, file_count);
		} else {
			//
			if ( file_result == [] ){
				file_result.push([each_file_path2, each_file_depth, 0, file, file_count, 0]);			
			} else {
				file_result.push([each_file_path2, each_file_depth, 0, file, file_count, parent_file]);
			}
		}
	});
	return file_result
}

function readFile(file_path){
	//
	var file_content = fs.readFileSync(file_path, "utf-8");
	return file_content
}

// 
module.exports.read_files 	= readFiles;
module.exports.read_file 	= readFile;