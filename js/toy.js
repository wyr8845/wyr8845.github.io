$("#person>.toy").click(function() {
	$("#person>.talk").html(Math.floor(Math.random() * 7));

	var eye;
	var mouse;

	switch(Math.floor(Math.random() * 7)) {
		case 0:
			eye = "angry";
			break;
		case 1:
			eye = "boring";
			break;
		case 2:
			eye = "fun";
			break;
		case 3:
			eye = "happy";
			break;
		case 4:
			eye = "normal";
			break;
		case 5:
			eye = "sad";
			break;
		case 6:
			eye = "surprised";
			break;
		default:
			break;
	}
	
	switch(Math.floor(Math.random() * 5)) {
		case 0:
			mouse = "angry";
			break;
		case 1:
			mouse = "fun";
			break;
		case 2:
			mouse = "happy";
			break;
		case 3:
			mouse = "normal";
			break;
		case 4:
			mouse = "o";
			break;
		default:
			break;
	}
	
	$("#person>.toy>.eye").attr("src", "img/toy/toy_eye_" + eye + ".png");
	$("#person>.toy>.mouse").attr("src", "img/toy/toy_mouse_" + mouse + ".png"); 
});