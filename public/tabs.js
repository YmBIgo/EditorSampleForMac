
class Tabs {
	constructor(tab_array){
		this.tab_array = tab_array;
		this.tab_limit_length = 8;
		this.focus_tab = 0;
	}
	add_tab(file_name){
		// Limit Length
		if ( this.tab_array.length > this.tab_limit_length ){
			return
		}
		// indexOf
		var is_file_exist_in_array = this.tab_array.indexOf(file_name);
		if ( is_file_exist_in_array != -1 ) {
			this.display_tabs();
		} else {
			this.tab_array.push(file_name);
			this.focus_tab = this.tab_array.length -1;
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
		this.tab_array.forEach(function(item){
			var tab_html = document.createElement("div");
			tab_html.innerText 		= item;
			tab_html.style.width 	= tab_length + "px";
			tab_html.style.marginLeft = "5px";
			tab_html.style.marginTop  = "5px";
			tab_html.style.border   = "1px solid rgba(125, 125, 125, .5)";
			tab_html.style.display  = "inline-block";
			tab_html.style.overflow = "hidden";
			tab_html.style.whiteSpace = "nowrap"
			tab_html.style.fontSize = "11px";
			var tab_array_index = tab_array_all.indexOf(item);
			tab_html.onclick = function(){
				/* tabs使い方 */ tabs.focus_tab = tab_array_index;
				getAjaxFileContent(item);
			}
			if (tab_array_index == tab_array_focus ) {
				tab_html.style.backgroundColor = "rgba(200, 200, 200, .7)"
			}
			tab_section.append(tab_html);
		})
	}
}