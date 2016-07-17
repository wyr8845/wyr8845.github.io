window.onload = function() {
	game.firstLayer();
};

/*将所有的游戏操作都放置一个对象*/
var game = {
	"speedX": 20,
	"speedY": 20,
	"bSpeed": 40,
	"eSpeedX": 20,
	"eSpeedY": 20,
	"score": 0,
	"box": document.getElementById("box"),
	"firstLayer": function() {
		//进行游戏开始的编写
		var ul = game.ctE("ul");
		ul.className = "firstLayerUl";
		var li1 = game.ctE("li");
		var li2 = game.ctE("li");
		var li3 = game.ctE("li");
		var h1 = game.ctE("h1");
		h1.className = "firstLayerH1";

		ul.appendChild(li1);
		ul.appendChild(li2);
		ul.appendChild(li3);
		box.appendChild(h1);
		box.appendChild(ul);

		li1.innerHTML = "简单";
		li2.innerHTML = "一般";
		li3.innerHTML = "地狱";
		h1.innerHTML = "大量bug的打飞机";

		li1.onclick = function() {
			console.log("进入简单");
			game.gameLayer(100);
		}
		li2.onclick = function() {
			console.log("进入一般");
			game.gameLayer(50);
		}
		li3.onclick = function() {
			console.log("进入困难");
			game.gameLayer(0);
		}
	},

	"gameLayer": function(num) {
		//清除box的内容
		box.innerHTML = "";
		//添加玩家
		game.player();
		//添加敌机
		game.enemy(num);
		//添加分数
		game.cScore();
		game.num = num;
		
	},

	"player": function() {
		//		var player = new Image();
		var player = game.ctE("img");
		player.src = "img/plane.png";
		box.appendChild(player);
		player.className = "plane";
		game.op = player;
		game.pW = game.getValue(player, "width");
		game.pH = game.getValue(player, "height");
		game.bW = game.getValue(box, "width");
		game.bH = game.getValue(box, "height");
		//初始位置
		var dis = game.getValue(box, "width") - game.getValue(player, "width");
		player.style.cssText = "left:" + dis / 2 + "px; bottom: 0";

		//飞机移除来就会调用这个飞机控制函数
		game.playerController();
		game.shoot();
	},

	"playerController": function() {
		//监听按键上87 38, 下83 40, 左65 37, 右68 39
		document.onkeydown = function(e) {
			var temp = 0;//记录移动差值
			switch(e.keyCode) {
				case 87: case 38: //上
					temp = game.getValue(game.op, "bottom") + game.speedY;
					if (temp > game.bH - game.pH) {
						temp = game.bH - game.pH;
					}
					game.op.style.bottom = temp + "px";
					break;
				case 83: case 40: //下
					temp = game.getValue(game.op, "bottom") - game.speedY;
					if (temp < 0) {
						temp = 0;
					}
					game.op.style.bottom = temp + "px";
					break;
				case 65: case 37: //左
					temp = game.getValue(game.op, "left") - game.speedX;
					if (temp < 0) {
						temp = 0;
					}
					game.op.style.left = temp + "px";
					break;
				case 68: case 39: //右
					temp = game.getValue(game.op, "left") + game.speedX;
					if (temp > game.bW - game.pW) {
						temp = game.bW - game.pW;
					}
					game.op.style.left = temp + "px";
					break;
				default:
					break;
			}
		};
	},
	
	"shoot": function() {
		game.bTimer = setInterval(function() {
			//生成的我们的子弹
			var bullet = game.ctE("img");
			bullet.src = "img/马赛克子弹.png";
			bullet.className = "bullet";
			
			box.appendChild(bullet);
			var left = game.getValue(game.op, "left") + game.pW / 2 - game.getValue(bullet, "width") / 2;
			var bottom = game.getValue(game.op, "bottom") + game.pH;
			bullet.style.cssText = "left: " + left + "px; bottom: " + bottom + "px";
			
			bullet.timer = setInterval(function() {
				bottom += game.bSpeed;
				bullet.style.bottom = bottom + "px";
				
				if (bottom > game.bH) {
					clearInterval(bullet.timer);
					box.removeChild(bullet);
				}
			}, 100);
		}, 200);
	},
	
	"over": function() {
		//清空原来的
		box.innerHTML = "";
		var content = game.ctE("div");
		var title = game.ctE("h1");
		title.innerHTML = "游戏结束";
		var scores = game.ctE("h2");
		scores.innerHTML = "得分：" + game.score;
		if (game.score >= 1000) {
			scores.innerHTML = "获得称号：亲临地狱的";
			scores.innerHTML += "得分：" + game.score;
		} else {
			scores.innerHTML = "得分：" + game.score;
		}
		content.appendChild(title);
		content.appendChild(scores);
		box.appendChild(content);
	},

	"ctE": function(name) {
		return document.createElement(name);
	},
	
	"enemy": function(num) {//敌方战机
		console.log(num);
		game.eTimer = setInterval(function() {
			//生成的他们的位置
			var enemy = game.ctE("img");
			var top = 0;
			enemy.src = "img/dog.gif";
			enemy.className = "enemy";
			box.appendChild(enemy);
			enemy.style.left = Math.random() * (game.bW - game.getValue(enemy, "width")) + "px";
			enemy.style.top = "0px";
			
			enemy.timer = setInterval(function() {
				top += 10;
				enemy.style.top = top + "px";
				
				if (top > game.bH) {
					clearInterval(enemy.timer);
					box.removeChild(enemy);
				}
				//判断敌机是否与子弹发生碰撞
				var bullets = document.getElementsByClassName("bullet");
				
				for (var i = 0; i < bullets.length; i++) {
					//两个物体是否有碰撞
					if (game.check(enemy, bullets[i])) {
						//敌机停止移动 子弹要消失 敌机爆炸
						clearInterval(enemy.timer);
						enemy.src = "img/boom.png";
						setTimeout(function() {
							enemy.parentNode.removeChild(enemy);
						}, 1000);
						game.score++;
						game.cs.innerHTML = "得分：" + game.score;
						clearInterval(bullets[i].timer);
						bullets[i].parentNode.removeChild(bullets[i]);
						break;
					}
				}
				
				//是否玩家碰撞
				if ((game.check(enemy, game.op) && game.num != 0) || (game.num == 0 && game.score >= 1000)) {
					//玩家挂了
					enemy.src = "img/boom.png";
					clearInterval(enemy.timer);
					game.op.src = "img/boom.png";
					//子弹停止发射
					clearInterval(game.bTimer);
					//敌机停止出来
					clearInterval(game.eTimer);
					setTimeout(function() {
						enemy.parentNode.removeChild(enemy);
						game.op.parentNode.removeChild(game.op);
						//结束界面
						game.over();
					}, 2000);
				}
				
			}, Math.random() * num + num + 1);
		}, Math.random() * num * 20 + num * 20 + 1);
	},
	
	"check": function(o1, o2) {
		var oT1 = game.getValue(o1, "top");
		var oL1 = game.getValue(o1, "left");
		var oR1 = oL1 + game.getValue(o1, "width");
		var oB1 = oT1 + game.getValue(o1, "height");
		var oT2 = o2.offsetTop;
		var oL2 = game.getValue(o2, "left");
		var oR2 = oL2 + game.getValue(o2, "width");
		var oB2 = oT2 + game.getValue(o2, "height");
		
		if (oT1 > oB2 || oB1 < oT2 || oL1 > oR2 || oR1 < oL2) {
//		if () {
			
		} else {
			return true;
		}
	},
	
	"cScore": function() {
		//计分
		var sdiv = game.ctE("div");
		sdiv.className = "score";
		sdiv.style.left = "0";
		sdiv.style.top = "0";
		box.appendChild(sdiv);
		sdiv.innerHTML = "得分：";
		game.cs = sdiv;
	},

	"getValue": function(obj, name) {
		var value = getComputedStyle(obj)[name];
		return parseInt(value);
	},
};