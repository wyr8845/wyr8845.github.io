//总体动画JS
//控制音乐播放
var audio = document.getElementById("audio");
$(".music").on("touchend", function() {
	if(audio.paused) {
		audio.play();
		this.src = "img/musicBtn.png";
	} else {
		audio.pause();
		this.src = "img/musicBtnOff.png";
	}
});

//第一页动画——王逸然
$(".page1_alarm").on("touchend", function() {
	$(this).removeClass("bigRotate").addClass("dropAlarm");
});

//第二页动画——吕宝龙
function page2() {

	var flag = true;
	$(".page2 .page2_person").on("touchend", function() {
		
		var offsetX = $(this).offset().left;
		if(flag) {
			$(this).css("left",offsetX + "px");
			$(this).removeClass("moveX");
			$(".page2 .page2_person1_sweat1").css("left",offsetX +60 + "px").removeClass("hidden");
			$(".page2 .page2_person1_sweat2").css("left",offsetX +70 + "px").removeClass("hidden");
			$(".page2 .page2_person2_sweat1").css("left",offsetX +320 + "px").removeClass("hidden");
			$(".page2 .page2_person2_sweat2").css("left",offsetX +330 + "px").removeClass("hidden");
			$(".page2 .page2_bubble1").removeClass("hidden").addClass("fadeIn").css("left",offsetX  + 30 + "px");
			setTimeout(function() {
				$(".page2 .page2_bubble2").removeClass("hidden").addClass("fadeIn").css("left",offsetX  + 260 + "px");
			}, 2000);
			flag = false;
		} else {
			$(".page2 .page2_person").addClass("moveX");
			$(".page2 .page2_bubble1").addClass("hidden");
			$(".page2 .page2_bubble2").addClass("hidden");
			$(".page2 .page2_person1_sweat1").addClass("hidden");
			$(".page2 .page2_person1_sweat2").addClass("hidden");
			$(".page2 .page2_person2_sweat1").addClass("hidden");
			$(".page2 .page2_person2_sweat2").addClass("hidden");
			flag = true;
		}
	});
}

page2();

//第三页动画——刘家彬
//page3_off关闭
$(".page .page3_off").on("touchstart", function() {

	//	page3_off淡入
	$(this).addClass("page3_fadeIn");

	//page3.on淡出
	$(".page .page3_on").addClass("page3_fadeOut");

	//page3_air移除
	$(".page3 .page3_air").remove();

	//page3_person淡出
	$(".page3 .page3_person").addClass("page3_fadeOut");

	//page3_tired淡入
	$(".page3 .page3_tired").addClass("page3_fadeIn");

	//page3_cool移除
	$(".page3 .page3_cool").remove();

	//page3_hot淡入
	$(".page3 .page3_hot").animate({
		"opacity": "1"
	}, 1000);
})

//第四页动画——范国财


//第五页动画——刘钧华
//监听word显示
$(".page5 .wordimg").on("webkitAnimationEnd",function(){
	          	$(this).addClass("page5_fadeOut");
	         
});
//人上车
$(".page5 .word6").on("webkitAnimationEnd",function(){
	            
//	            $(".person").addClass("fadeOut");
//	            $(".car").addClass("torightout");
	            $(".person").animate({
	            	"opacity" :"0"
	            }, 500);
	            $(".car").animate({
	            	"left": "500px"
	            }, 2000);
	            
});
