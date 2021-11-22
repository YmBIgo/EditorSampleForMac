
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

var current_json;

// [ Search Modal ]
function show_modal(){
	document.getElementsByClassName("modal1")[0].style.display = "block";
}
function hide_modal(){
	document.getElementsByClassName("modal1")[0].style.display = "none";
}
function show_modal_search_result(json){
	var search_results = JSON.parse(json)["items"]
	var search_result_section = document.getElementById("modal-search-result");
	// console.log(search_results);
	var modal_search_result = document.getElementById("modal-search-result-area");
	modal_search_result.innerHTML = "";
	var modal_ver2_display_id = document.createElement("span");
	modal_ver2_display_id.classList.add("modal_ver2_display_id");
	modal_ver2_display_id.style.display = "none";
	modal_ver2_display_id.setAttribute("display_id", "0");
	var modal_change_button = document.createElement("button")
	modal_change_button.innerText = "2件表示に変更する"
	modal_change_button.classList.add("btn");
	modal_change_button.classList.add("btn-info");
	current_json = json
	modal_change_button.onclick = show_modal_search_result_ver2;
	modal_search_result.append(modal_change_button);
	search_result_section.append(modal_ver2_display_id);
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
function show_modal_search_result_ver1(e){
	e.stopPropagation();
	show_modal_search_result(current_json);
}

var code_snippet_array = [[], []];
var code_snippet_array_pos = [0, 0]

function show_modal_search_result_ver2(e){
	e.stopPropagation();
	var search_results = JSON.parse(current_json)["items"];
	code_snippet_array = [[], []];
	code_snippet_array_pos = [0, 0]
	var modal_search_result = document.getElementById("modal-search-result-area");
	modal_search_result.innerHTML = "";
	//
	var modal_change_button = document.createElement("button")
	modal_change_button.innerText = "10件表示に変更する"
	modal_change_button.classList.add("btn");
	modal_change_button.classList.add("btn-info");
	modal_change_button.classList.add("modal_change_button_ver2")
	modal_change_button.onclick = show_modal_search_result_ver1;
	modal_search_result.append(modal_change_button)
	//
	var display_id = get_ver2_display_id();
	var modal_search_result_row = document.createElement("div");
	modal_search_result_row.classList.add("row");
	//
	var modal_prev_page = document.createElement("div");
	modal_prev_page.classList.add("col-1");
	modal_prev_page.classList.add("search_result_each_next");
	modal_prev_page.innerText = "<前の２件"
	modal_prev_page.onclick = function(e){
		var current_display_id = get_ver2_display_id();
		current_display_id -= 2;
		set_ver2_display_id(current_display_id);
		current_display_id = get_ver2_display_id();
		// console.log(current_display_id)
		show_modal_search_result_ver2(e)
		e.stopPropagation();
	}
	var modal_next_page = document.createElement("div");
	modal_next_page.classList.add("col-1");
	modal_next_page.classList.add("search_result_each_next");
	modal_next_page.innerText = "次の２件>";
	modal_next_page.onclick = function(e){
		var current_display_id = get_ver2_display_id();
		current_display_id += 2;
		set_ver2_display_id(current_display_id);
		current_display_id = get_ver2_display_id();
		// console.log(current_display_id)
		show_modal_search_result_ver2(e)
		e.stopPropagation();
	}
	//
	modal_search_result_row.append(modal_prev_page);
	for ( var i = display_id; i < display_id + 2; i++ ){
		var search_result_array = search_results[i];
		var modal_search_each_result = document.createElement("div");
		var modal_search_each_blank  = document.createElement("br");
		var modal_search_each_title  = document.createElement("a");
		modal_search_each_title.innerText = search_result_array["title"];
		modal_search_each_title.href = search_result_array["link"];
		modal_search_each_title.classList.add("search_result_title");
		modal_search_each_title.style.padding = "5px";
		var modal_search_each_url    = document.createElement("small");
		modal_search_each_url.classList.add("search_result_link");
		modal_search_each_url.innerText = search_result_array["link"];
		modal_search_each_url.style.padding = "5px";
		var modal_search_each_snippet = document.createElement("span");
		modal_search_each_snippet.innerText = search_result_array["snippet"];
		modal_search_each_snippet.style.fontSize = "14px"
		modal_search_each_snippet.style.padding = "5px"
		modal_search_each_snippet.classList.add("search_result_snippet");
		var modal_search_each_textarea = document.createElement("textarea");
		modal_search_each_textarea.classList.add("search_result_textarea");
		//
		var modal_search_each_row = document.createElement("div");
		modal_search_each_row.classList.add("row");
		var modal_search_each_right_arrow = document.createElement("div");
		modal_search_each_right_arrow.classList.add("col-4");
		modal_search_each_right_arrow.classList.add("search_each_right_arrow");
		modal_search_each_right_arrow.innerText = "<"
		var button_id_i = i%2
		modal_search_each_right_arrow.setAttribute("button_id", button_id_i);
		modal_search_each_right_arrow.onclick = function(e){
			//
			var button_id = parseInt(e.target.getAttribute("button_id"));
			var page_content_array = code_snippet_array[button_id];
			if ( page_content_array == [] ) {
				var page_url = document.getElementsByClassName("search_result_link")[button_id].innerText
				getAjaxCodeSnippet(page_url, button_id, code_snippet_array)
			} else {
				//
				code_snippet_array_pos[button_id] -= 1
				if ( code_snippet_array_pos[button_id] < 0 ) {
					code_snippet_array_pos[button_id] = code_snippet_array[button_id].length - 1
				}
				document.getElementsByClassName("search_result_textarea")[button_id].value = code_snippet_array[button_id][code_snippet_array_pos[button_id]];
			}
		}
		var modal_search_each_left_arrow = document.createElement("div");
		modal_search_each_left_arrow.classList.add("col-4");
		modal_search_each_left_arrow.classList.add("search_each_left_arrow");
		modal_search_each_left_arrow.innerText = "<";
		modal_search_each_left_arrow.style.direction = "rtl";
		var button_id_i = i%2
		modal_search_each_left_arrow.setAttribute("button_id", button_id_i);
		modal_search_each_left_arrow.onclick = function(e){
			//
			var button_id = parseInt(e.target.getAttribute("button_id"));
			var page_content_array = code_snippet_array[button_id];
			if ( page_content_array == [] ) {
				var page_url = document.getElementsByClassName("search_result_link")[button_id].innerText
				getAjaxCodeSnippet(page_url, button_id, code_snippet_array)
			} else {
				//
				code_snippet_array_pos[button_id] += 1
				if ( code_snippet_array_pos[button_id] >= code_snippet_array[button_id].length ){
					code_snippet_array_pos[button_id] = 0;
				}
				document.getElementsByClassName("search_result_textarea")[button_id].value = code_snippet_array[button_id][code_snippet_array_pos[button_id]];
			}
		}
		var modal_search_each_button = document.createElement("button");
		modal_search_each_button.classList.add("col-4");
		var button_id_i = i%2
		modal_search_each_button.setAttribute("button_id", button_id_i)
		modal_search_each_button.style.fontSize = "11px"
		modal_search_each_button.innerText = "コードスニペット取得"
		modal_search_each_button.onclick = function(e){
			var button_id = parseInt(e.target.getAttribute("button_id"));
			var page_url = document.getElementsByClassName("search_result_link")[button_id].innerText
			console.log(page_url)
			getAjaxCodeSnippet(page_url, button_id, code_snippet_array)
		}
		modal_search_each_row.append(modal_search_each_right_arrow);
		modal_search_each_row.append(modal_search_each_button);
		modal_search_each_row.append(modal_search_each_left_arrow);
		//
		modal_search_each_result.classList.add("search_result_each_ver2");
		modal_search_each_result.classList.add("col-5");
		modal_search_each_result.append(modal_search_each_url);
		modal_search_each_result.append(modal_search_each_blank);
		modal_search_each_result.append(modal_search_each_title);
		modal_search_each_result.append(modal_search_each_blank);
		modal_search_each_result.append(modal_search_each_snippet);
		modal_search_each_result.append(modal_search_each_textarea);
		modal_search_each_result.append(modal_search_each_row);
		//
		modal_search_result_row.append(modal_search_each_result);
		// modal_search_result.append(modal_search_each_result);
	}
	modal_search_result_row.append(modal_next_page);
	modal_search_result.append(modal_search_result_row);
}

function set_ver2_display_id(number){
	if ( number > 8 ) { number = 0 }
	if ( number < 0 ) { number = 8 }
	var modal_ver2_display_id_ele = document.getElementsByClassName("modal_ver2_display_id")[0]
	var modal_ver2_display_id = modal_ver2_display_id_ele.setAttribute("display_id", number);
}
function get_ver2_display_id(){
	var modal_ver2_display_id_ele = document.getElementsByClassName("modal_ver2_display_id")[0]
	var modal_ver2_display_id = modal_ver2_display_id_ele.getAttribute("display_id");
	if ( modal_ver2_display_id > 8 ) { modal_ver2_display_id_ele.setAttribute("display_id", 0) }
	if ( modal_ver2_display_id < 0 ) { modal_ver2_display_id_ele.setAttribute("display_id", 8) }
	return parseInt(modal_ver2_display_id)
}

// [ New File Modal ]
// [ Modal ]
function show_modal2(){
	document.getElementsByClassName("modal2")[0].style.display = "block";
}
function hide_modal2(){
	document.getElementsByClassName("modal2")[0].style.display = "none";
}