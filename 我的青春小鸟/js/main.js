//创建一个大小为400*713的游戏场景
var game = new Phaser.Game(400, 713, Phaser.AUTO, "game_div");
//创建空的游戏状态
var game_state = {};
//创建一个新的主状态
game_state.main = function() {};

game_state.main.prototype = {
	//加载所有资源
	preload:function() {
		this.game.load.image('bg', 'img/background.png');
		this.game.load.image('bird', 'img/dog.gif');
		this.game.load.image('pipe', 'img/pipe.png');
		
		//加载音乐
		this.game.load.audio('failed', 'mp3/failed.wav');
		this.game.load.audio('jump', 'mp3/jumpp.mp3');
		this.game.load.audio('game', 'mp3/Boss_2.mp3');
	},
	//预加载后安装游戏
	create:function() {
		//添加背景图片
		this.game.add.sprite(0, 0, 'bg');
		this.bird = this.game.add.sprite(100, 245, 'bird');
		//给小鸟添加重力
		this.bird.body.gravity.y = 1000;
		//按键
		var space_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		space_key.onDown.add(this.jump, this);
		//创建20个管道
		this.pipes = game.add.group();
		this.pipes.createMultiple(20, 'pipe');
		//定时器1500
		this.timer = this.game.time.events.loop(1500, this.add_row_pipe, this);
		
		//添加音乐
		this.failed_sound = this.game.add.audio('failed');
		this.jump_sound = this.game.add.audio('jump');
		this.game_sound = this.game.add.audio('game');
		
		this.game_sound.play();
		
		this.score = 0;
		this.label = this.game.add.text(20, 20, "0", {font:"30px 微软雅黑", fill:"#fff"});
		
	},
	//这个函数每秒调用60次
	update:function() {
		if (this.bird.inWorld == false) {
			this.restart_game();
		}
		this.game.physics.overlap(this.bird, this.pipes, this.restart_game, null, this);
	},
	
	restart_game:function() {
		this.game_sound.stop();
		this.failed_sound.play();
		alert("时日不多了，您的分数为" + this.score);
		//移除定时器
		this.game.time.events.remove(this.timer);
		//重新开始主状态
		this.game.state.start('main');
	},
	
	jump:function() {
		this.jump_sound.play();
		//350
		this.bird.body.velocity.y = -350;
	},
	//添加一排的管道
	add_row_pipe:function() {
		//创建随机数
		var random = Math.floor(Math.random() * 9) + 1;
		var random2 = Math.floor(Math.random() * 10) + 1;
		for (var i = 0; i < 12; i++) {
			if (i != random && i != random + 1 && i != random + 2 && i != random2 && i != random2 + 1) {
				//创建管道
				var pipe = this.pipes.getFirstDead();
				//设置位置
				pipe.reset(400, i * 60);
				//向左移动200
				pipe.body.velocity.x = -200;
				//杀死管道
				pipe.outOfBoundsKill = true;
			}
		}
		this.label.content = this.score;
		this.score++;
	}
	
};



//添加和开始主状态
game.state.add('main', game_state.main);
game.state.start('main');

