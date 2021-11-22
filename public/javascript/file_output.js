function changeFileContent() {
	console.log(all_files[i][2]);
}

function getAjaxFileContent(file_name){
	if ( file_name != "" ){
		if ( tabs.tab_editting_array[file_name] == 0 ){
			var file_data = "file_name=" + file_name
		} else if (tabs.tab_editting_array[file_name] == 1) {
			var file_data = "file_name=user_data/" + file_name
		} else {
			var file_data = "file_name=" + file_name
		}
		var file_content = "";
		$.ajax({
			type: "GET",
			url: "file_content",
			data: file_data,
		})
		.done(function(data){
			document.getElementById("editor-textarea").value = data["file_content"];
			tabs.add_tab(file_name);
			show_editor();
		});
	} else {
		document.getElementById("editor-textarea").value = "";
		show_editor();
	}
}

function getAjaxCodeSnippet(page_url, button_id, code_snippet_array){
	console.log(page_url)
	if ( page_url != "" ){
		var page_url_parameter = "page_url=" + page_url
		var code_snippets = "";
		$.ajax({
			type: "GET",
			url: "get_code_snippet",
			data: page_url_parameter
		})
		.done(function(data){
			//
			var search_result = data["search_result"]
			console.log(search_result);
			code_snippet_array[button_id] = search_result;
			document.getElementsByClassName("search_result_textarea")[button_id].value = search_result[0];
		});
	} else {
		//
	}
}

function accessCreateFile(file_path, file_content){
	//
	if ( file_path != "" ) {
		fetch("http://localhost:3000/create_file", {
			method: "POST",
			headers: {
				'content-type' : 'application/json'
			},
			body: JSON.stringify({ 'file_path':file_path, 'file_content':file_content })
		}).then(response => {
			var response_result = response.json();
			return response_result
		}).catch(error => {
			console.log(error);
		})
	}
}
function accessCreateTempfile(file_path, file_content){
	//
	if ( file_path != "" ) {
		fetch("http://localhost:3000/create_tempfile", {
			method: "POST",
			headers: {
				'content-type' : 'application/json'
			},
			body: JSON.stringify({ 'file_path':file_path, 'file_content':file_content })
		}).then(response => {
			var response_result = response.json();
			return response_result
		}).catch(error => {
			console.log(error);
		})
	}
}
function accessCreateNewFile(folder_path, file_name){
	//
	if ( folder_path != "" ) {
		fetch("http://localhost:3000/new_file", {
			method: "POST",
			headers: {
				'content-type' : 'application/json'
			},
			body: JSON.stringify({ 'foldername':folder_path, 'filename': file_name})
		}).then(response => {
			var response_result = response.json();
			return response_result
		}).then(data => {
			var is_file_new = data["is_file_new"];
			var file_path = data["file_path"];
			if ( is_file_new == true ) {
				document.getElementById("editor-textarea").value = "";
				tabs.add_tab(file_path);
				show_editor();
			}
		}).catch(error => {
			console.log(error);
		})
	}
}