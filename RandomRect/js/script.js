var myCanvas = document.getElementById("canvas_id");
var pen = myCanvas.getContext("2d");
var dog = new Image();
dog.src = "img/dog.gif";
//创建一个定时器，每隔1毫秒创建一个矩形
setInterval(function() {
	//在这里创建矩形
	var x = parseInt(Math.random() * myCanvas.width);
	var y = parseInt(Math.random() * myCanvas.height);
	var w = parseInt(Math.random() * (myCanvas.width - x));
	var h = parseInt(Math.random() * (myCanvas.height - y));
	
	//0-255随机生成设置颜色的三原色
	var r = parseInt(Math.random() * 255);
	var g = parseInt(Math.random() * 255);
	var b = parseInt(Math.random() * 255);
	
	pen.drawImage(dog, x, y, w, h)
	pen.strokeStyle = "rgb(" + r + ",  " + g + ", " + b + ")";
	pen.strokeRect(x, y, w, h);
	
}, 1);
