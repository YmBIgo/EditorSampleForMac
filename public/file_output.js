function changeFileContent() {
	console.log(all_files[i][2]);
}

function getAjaxFileContent(file_name){
	var file_data = "file_name=" + file_name
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
}