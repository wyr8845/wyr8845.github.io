$("#person>.toy").click(function() {
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
	
	//charTalk(Math.floor(Math.random() * 14) + 1);
	charTalk(Math.floor(Math.random() * 40) + 1);
	$("#person>.toy>.eye").attr("src", "img/toy/toy_eye_" + eye + ".png");
	$("#person>.toy>.mouse").attr("src", "img/toy/toy_mouse_" + mouse + ".png"); 
});

//根据id获取content
function charTalk(id) {
	var content
	$.ajax({
		url: "http://123.206.32.246:8080/Test/char/talk?id=" + id,
		type: "get",
		async: false,
		dataType: "jsonp",
		jsonp: "callback", //服务端用于接收callback调用的function名的参数   
		jsonpCallback: "success_jsonpCallback", //callback的function名称,服务端会把名称和data一起传递回来   
		success: function(json) {
			$("#person>.talk").html(json.content);
		},
		error: function() {
			console.log('json出错');
		}
	});
}