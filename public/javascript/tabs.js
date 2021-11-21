
class Tabs {
	constructor(tab_array){
		this.tab_array = tab_array;
		this.tab_limit_length = 6;
		this.focus_tab = 0;
		this.dragging_tab_html;
		this.mouse_down_original_x = 0;
		this.mouse_up_original_x = 0;
		this.mouse_down_original_y = 0;
		this.mouse_up_original_y = 0;
		this.tab_editting_array = {};
		this.event_current_item;
	}
	add_tab(file_name){
		// Limit Length
		if ( this.tab_array.length > this.tab_limit_length ){
			return
		}
		// indexOf
		var is_file_exist_in_array = this.tab_array.indexOf(file_name);
		if ( is_file_exist_in_array != -1 ) {
			this.focus_tab = is_file_exist_in_array;
			this.display_tabs();
		} else {
			this.tab_array.push(file_name);
			this.tab_editting_array[file_name] = 0;
			this.focus_tab = this.tab_array.length -1;
			this.display_tabs();
		}
	}
	remove_tab(file_name){
		if ( this.tab_array.length == 0 ){
			return
		}
		// indexOf
		var is_file_exist_in_array = this.tab_array.indexOf(file_name);
		if ( is_file_exist_in_array != -1 ) {
			if ( this.focus_tab == is_file_exist_in_array ){
				this.focus_tab = this.tab_array.length - 2;
			} else if ( this.focus_tab > is_file_exist_in_array ){
				this.focus_tab = this.focus_tab - 1
			} else if ( this.focus_tab < is_file_exist_in_array ){
				//
			}
			this.tab_array.splice(is_file_exist_in_array, 1);
			delete this.tab_editting_array[file_name]
			if ( this.tab_array.length != 0 ){
				this.display_tabs();
				getAjaxFileContent(this.tab_array[this.focus_tab]);
			} else {
				this.focus_tab = -1;
				this.display_tabs();
				getAjaxFileContent("");
			}
		} else {
			this.display_tabs();
		}
	}
	display_tabs(){
		var tab_length   = 700 / this.tab_array.length;
		var tab_section  = document.getElementById("editor_tabs");
		var tab_children = tab_section.getElementsByTagName("div");
		var tab_remove_children = [];
		if (tab_children.length > 0 ){
			for(var i = 0; i < tab_children.length; i++){
				tab_remove_children.push(tab_children[i]);
			}
			for(var j = 0; j < tab_remove_children.length; j++){
				tab_remove_children[j].remove();
			}
		}
		var tab_array_all = this.tab_array;
		var tab_array_focus = this.focus_tab;
		var tab_counter = 0;
		this.tab_array.forEach(function(item){
			tabs.event_current_item = item;
			//
			var tab_html = document.createElement("div");
			tab_html.innerText 		= item;
			tab_html.style.width 	= tab_length + "px";
			tab_html.style.marginTop  = "5px";
			tab_html.style.border   = "1px solid rgba(125, 125, 125, .5)";
			tab_html.style.display  = "inline-block";
			tab_html.style.overflow = "hidden";
			tab_html.style.whiteSpace = "nowrap"
			tab_html.style.fontSize = "11px";
			tab_html.style.zIndex 	= "1";
			tab_html.classList.add("tab_html");
			tab_html.setAttribute("tab_counter", tab_counter);
			//
			var tab_remove_button 	= document.createElement("span");
			tab_remove_button.style.float = "right";
			tab_remove_button.style.paddingLeft = "5px"
			tab_remove_button.style.width = "15px"
			tab_remove_button.style.zIndex = "12";
			tab_remove_button.style.backgroundColor = "rgba(50, 50, 50)"
			tab_remove_button.style.color = "white";
			tab_remove_button.classList.add("remove_button");
			if ( tabs.tab_editting_array[item] == 0 ){
				tab_remove_button.innerText = "x";
				tab_remove_button.addEventListener("mousedown", remove_tab_onmousedown)
			} else {
				tab_remove_button.innerText = "◯";
				// tab_remove_button.removeEventListener("mousedown", remove_tab_onmousedown);
				tab_remove_button.addEventListener("mousedown", function(e){
					e.stopPropagation();
					var file_content = editor.getValue();
					var file_path 	 = tabs.tab_array[tabs.focus_tab]
					accessCreateFile(file_path, file_content);
					tab_remove_button.innerText = "x";
					tabs.tab_editting_array[item] = 0;
					tab_remove_button.addEventListener("mousedown", function(e){
						e.stopPropagation();
						tabs.remove_tab(item);
					})
				})
			}
			tab_html.append(tab_remove_button);
			var tab_array_index = tab_array_all.indexOf(item);
			// tab_html.onclick = function(){
			// 	/* tabs使い方 */ tabs.focus_tab = tab_array_index;
			// 	getAjaxFileContent(item);
			// }
			tab_html.addEventListener("mousedown", function(e){
				tab_html.style.position = "absolute";
				var x = e.clientX;
				console.log(x);
				var current_tab_html = tabs.get_current_tab_html(x); /* tabs 使い方 ... */
				/* tabs使い方 */ tabs.focus_tab = tab_array_index;
				var tab_htmls = document.getElementsByClassName("tab_html");
				for(var i = 0; i < tab_htmls.length; i++ ){
					if ( tabs.focus_tab != i ){
						tab_htmls[i].style.backgroundColor = "white";
					} else if ( tabs.focus_tab == i ) {
						tab_htmls[i].style.backgroundColor = "rgba(200, 200, 200, .7)";
					}
				}
				//
				this.dragging_tab_html = current_tab_html;
				tab_html.addEventListener("mousemove", function(e){
					//
					e.preventDefault();
					var x = e.clientX;
					var x_margin = 700 / tabs.tab_array.length;
					console.log("mouse moving " + x);
					this.dragging_tab_html.style.left = x - x_margin/2 + "px";
				}, false);
			}, false);
			tab_html.addEventListener("mouseup", function(e){
				var x = e.clientX;
				console.log(x);
				if ( this.dragging_tab_html != undefined ){
					this.dragging_tab_html.style.position = "relative";
					this.dragging_tab_html.classList.remove("drag");
					tabs.set_new_tab_html(x, this.dragging_tab_html);
				}
				getAjaxFileContent(item);
				tabs.display_tabs();
			}, false);
			if (tab_array_index == tab_array_focus ) {
				tab_html.style.backgroundColor = "rgba(200, 200, 200, .7)"
			}
			tab_counter += 1;
			tab_section.append(tab_html);
		})
	}
	get_current_tab_html(pos_x){
		//
		var tab_pos_array = [];
		var tab_pos = 505;
		var current_pos = 0;
		var is_pos_first = false;
		var tab_pos_width = 700 / this.tab_array.length;
		for(var i = 0; i < this.tab_array.length; i++ ){
			tab_pos_array.push(tab_pos);
			if ( pos_x > tab_pos && is_pos_first == false ){
				current_pos = i;
			} else {
				is_pos_first = true;
			}
			tab_pos += tab_pos_width;
		}
		var current_tab_html = document.getElementsByClassName("tab_html")[current_pos];
		console.log(tab_pos_array, pos_x, current_tab_html);
		return current_tab_html
	}
	set_new_tab_html(pos_x, current_tab_html){
		//
		var tab_pos_array = [];
		var tab_pos = 505;
		var new_pos = 0;
		var is_pos_first = false;
		var tab_pos_width = 700 / this.tab_array.length;
		for(var i = 0; i < this.tab_array.length; i++ ){
			tab_pos_array.push(tab_pos);
			if ( pos_x > tab_pos && is_pos_first == false ){
				new_pos = i;
			} else {
				is_pos_first = true;
			}
			tab_pos += tab_pos_width;
		}
		var current_text = current_tab_html.innerText.slice(0, current_tab_html.innerText.length-1);
		var current_pos  = this.tab_array.indexOf(current_text);
		console.log(this.tab_array, new_pos, current_pos);
		if (new_pos == current_pos) { return }
		if (new_pos > current_pos) {
			//
			this.tab_array.splice(new_pos+1, 0, current_text);
			this.tab_array.splice(current_pos, 1);
		} else if (new_pos < current_pos) {
			//
			//
			this.tab_array.splice(new_pos, 0, current_text);
			this.tab_array.splice(current_pos+1, 1);
		}
		var current_new_pos = this.tab_array.indexOf(current_text);
		/* tabs使い方 */ tabs.focus_tab = current_new_pos;
	}
}

function remove_tab_onmousedown(e){
	e.stopPropagation();
	tabs.remove_tab(tabs.event_current_item);
}