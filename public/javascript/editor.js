function show_editor(){
	var isCodeMirrorExist = document.getElementsByClassName("CodeMirror");
	if (isCodeMirrorExist.length > 0) {
		isCodeMirrorExist[0].remove();
	}
	var myTextArea = document.getElementById("editor-textarea");
	var editor = CodeMirror.fromTextArea(document.getElementById("editor-textarea"), {
		mode: "javascript", 
		lineNumbers: true,
	});
	editor.setSize(null, 500);
	editor.save();
}