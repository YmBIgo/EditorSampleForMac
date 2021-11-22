//
var fs = require("fs");
var indexed_file_map = new Map();
var file_result = [];
var file_count  = 0;

function readFiles(file_path, file_depth, parent_file){
	// 反復 直し
	if ( file_path == "./" && file_depth == 0 && parent_file == 0 ){
		if ( file_result != [] ){
			file_result = [];
			file_count  = 0;
			indexed_file_map = new Map();
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

function generateFile(file_path, file_content){
	// セキュリティ が甘い説が ...
	var fixed_file_path = file_path.replace(/\.\./g, ".");
	var fixed_file_path = fixed_file_path.replace(/\/\//g, ".");
	var is_file_exist	= fs.existsSync(fixed_file_path);
	// console.log("file start to write... (not yet implemented)")
	// return is_file_exist
	var writeStream = fs.createWriteStream(fixed_file_path);
	writeStream.on('error', err => console.log('error', err.message));
	writeStream.on('finish', () => console.log('finish'));
	writeStream.write(file_content);
	writeStream.end();
}

function generateNewFile(file_path){
	//
	var fixed_file_path = file_path.replace(/\.\./g, ".");
	var fixed_file_path = fixed_file_path.replace(/\/\//g, ".");
	var is_file_exist	= fs.existsSync(fixed_file_path);
	//
	var folder_path_before1	= fixed_file_path.split("/");
	var folder_path_before2 = folder_path_before1.slice(0, folder_path_before1.length-1);
	var folder_path 		= folder_path_before2.join("/");
	var is_folder_exist 	= fs.existsSync(folder_path);
	if ( is_folder_exist == false ) {
		return false
	}
	var is_file_exist 		= fs.existsSync(fixed_file_path);
	if ( is_file_exist == true ) {
		return false
	}
	var writeStream = fs.createWriteStream(fixed_file_path);
	writeStream.on('error', err => console.log('error', err.message));
	writeStream.on('finish', () => console.log('finish'));
	writeStream.write("");
	writeStream.end();
	return true
}

function generateTempfile(file_path, file_content){
	//
	var fixed_file_path = file_path.replace(/\.\./g, ".");
	var fixed_file_path = fixed_file_path.replace(/\/\//g, ".");
	var is_file_exist	= fs.existsSync(fixed_file_path);
	//
	var folder_path_before1	= fixed_file_path.split("/");
	var folder_path_before2 = folder_path_before1.slice(0, folder_path_before1.length-1);
	var folder_path_before3	= folder_path_before2.join("/");
	var folder_path 	= "user_data/" + folder_path_before3;
	var is_user_data_exist 	= fs.existsSync(folder_path);
	if ( is_user_data_exist == false ) {
		fs.mkdirSync(folder_path, { recursive: true });
	}
	var tempfile_path 	= "user_data/" + fixed_file_path;
	var writeStream = fs.createWriteStream(tempfile_path);
	writeStream.on('error', err => console.log('error', err.message));
	writeStream.on('finish', () => console.log('finish'));
	writeStream.write(file_content);
	writeStream.end();
}

// 
module.exports.read_files 	= readFiles;
module.exports.read_file 	= readFile;
module.exports.generate_file = generateFile;
module.exports.generate_new_file = generateNewFile;
module.exports.generate_tempfile = generateTempfile;