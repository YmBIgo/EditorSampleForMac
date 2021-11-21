var editor;

function show_editor(){
	var isCodeMirrorExist = document.getElementsByClassName("CodeMirror");
	if (isCodeMirrorExist.length > 0) {
		isCodeMirrorExist[0].remove();
	}
	var myTextArea = document.getElementById("editor-textarea");
	editor = CodeMirror.fromTextArea(document.getElementById("editor-textarea"), {
		mode: "javascript", 
		lineNumbers: true,
	});
	editor.setSize(null, 500);
	editor.save();
	//
	editor.on("change", function(e){
		var file_content = editor.getValue();
		var file_path 	 = tabs.tab_array[tabs.focus_tab]
		tabs.tab_editting_array[file_path] = 1;
		if ( file_path == undefined ) { return }
		var current_tab_html = document.getElementsByClassName("tab_html")[tabs.focus_tab];
		var current_remove_button = document.getElementsByClassName("remove_button")[tabs.focus_tab];
		current_remove_button.removeEventListener("mousedown", remove_tab_onmousedown);
		current_remove_button.innerText = "◯"
	})
}