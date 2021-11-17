
// Modal Key
document.onkeydown = function(e){
	var PressedKeyCode = e.keyCode; // 71
	var ControlBool    = e.ctrlKey; // true
	if ( PressedKeyCode == 71 && ControlBool == true ) {
		show_modal();
	} else if ( PressedKeyCode == 69 && ControlBool == true ) {
		hide_modal();
	}
}

// [ Modal ]
function show_modal(){
	document.getElementsByClassName("modal1")[0].style.display = "block";
}
function hide_modal(){
	document.getElementsByClassName("modal1")[0].style.display = "none";
}
function show_modal_search_result(json){
	var search_results = JSON.parse(json)["items"]
	console.log(search_results);
	var modal_search_result = document.getElementById("modal-search-result-area");
	search_results.forEach(function(item){
		//
		var modal_search_each_result = document.createElement("div");
		modal_search_each_result.classList.add("search_result_each");
		var modal_search_each_link   = document.createElement("small");
		modal_search_each_link.innerText = item["link"];
		modal_search_each_link.classList.add("search_result_link")
		var modal_search_each_a      = document.createElement("a");
		var blank_row 				 = document.createElement("br");
		modal_search_each_a.classList.add("search_result_title");
		modal_search_each_a.innerText = item["title"];
		modal_search_each_a.href = item["link"];
		var modal_search_each_snippet = document.createElement("span");
		modal_search_each_snippet.classList.add("search_result_snippet");
		modal_search_each_snippet.innerText = item["snippet"];
		modal_search_each_result.append(modal_search_each_link);
		modal_search_each_result.append(blank_row);
		modal_search_each_result.append(modal_search_each_a);
		modal_search_each_result.append(blank_row);
		modal_search_each_result.append(modal_search_each_snippet);
		modal_search_result.append(modal_search_each_result);
	});
}