var startY, endY, moveY;

$(".page").on("touchstart touchmove touchend", function(e) {
	//关闭浏览器默认事件
	e.preventDefault();
	switch (e.type){
		case "touchstart":
			startY = e.originalEvent.targetTouches[0].clientY;
			break;
		case "touchmove":
			endY = e.originalEvent.targetTouches[0].clientY;
			break;
		case "touchend":
			if (endY == true) {
				return;
			}
			moveY = endY - startY;
			if (moveY < 0 && $(this).next().length == 1) {//向上翻页，进入下一页
				$(this).addClass("toTop").next().removeClass("hidden").addClass("nextTop");
				//当前页动画结束后，移除多余的class属性
				$(this).on("webkitAnimationEnd", function() {
					$(this).removeClass("toTop").addClass("hidden").next().removeClass("nextTop");
					$(this).off("webkitAnimationEnd");
				});
			} else if (moveY > 0 && $(this).prev().length == 1) {//向下翻页，进入上一页
				$(this).addClass("toBottom").prev().removeClass("hidden").addClass("prevBottom");
				//当前页动画结束后，移除多余的class属性
				$(this).on("webkitAnimationEnd", function() {
					$(this).removeClass("toBottom").addClass("hidden").prev().removeClass("prevBottom");
					$(this).off("webkitAnimationEnd");
				});
			}
			endY = true;
			break;
		default:
			break;
	}
});