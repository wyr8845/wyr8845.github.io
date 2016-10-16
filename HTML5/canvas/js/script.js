//创建画布元素
var canvas = document.createElement("canvas");
//将canvas插入文档
document.body.appendChild(canvas);
//为canvas设置宽高
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
canvas.style.background = "black";

var context = canvas.getContext("2d");
//创建一个数组
var parts = [];

setInterval(function() {
	//在里面创建一个粒子
	var part = new Particle(canvas.width * 0.5, canvas.height * 0.5);

	part.draw();
	parts.push(part);
	context.clearRect(0, 0, canvas.width, canvas.height);
	//从数组里取出粒子，并且更新位置
	for (var i = 0; i < parts.length; i++) {
		parts[i].upDate();
	}
}, 30);

//创建一个粒子类
function Particle(xPos, yPos) {
	this.x = xPos;
	this.y = yPos;

	this.xVal = Math.random() * 4 - 2;
	this.yVal = -5;

	//将画圆的代码封装在一个方法里
	this.draw = function() {
		context.beginPath();
		context.arc(this.x, this.y, 5, 0, Math.PI * 2, false);
		//		context.fillStyle = "white";
		var r = parseInt(Math.random() * 255);
		var g = parseInt(Math.random() * 255);
		var b = parseInt(Math.random() * 255);
		context.fillStyle = "rgb(" + r + ", " + g + ", " + b + ")";
		//		context.fillStyle = "rgb(255, 0, 0)";
		context.closePath();
		context.fill();
	};
	this.upDate = function() {
		this.x += this.xVal;
		this.y += this.yVal;
		if (this.y >= canvas.height) {
			parts.splice(0, 1);
		}
		this.yVal += 0.1;

		this.draw();
	};
}