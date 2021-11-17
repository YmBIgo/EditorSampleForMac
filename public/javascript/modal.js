
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
