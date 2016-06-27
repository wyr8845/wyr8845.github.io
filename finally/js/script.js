//根据页面更换宣传图ad
function changeADPicture(num) {
	var id = document.getElementById("ad");
	
	if (num == 1) {
		id.src = "images/ad1.jpg";
	} else if (num == 2) {
		id.src = "images/ad2.jpg";
	} else {
		console.log("changeADPicture失败");
	}
}


//根据iframe内的页面设置iframe的高度
function setIframeHeight(iframe) {
	if (iframe) {
		var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
		if (iframeWin.document.body) {
			iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
		}
	}
};
window.onload = function() {
	setIframeHeight(document.getElementById('external-frame'));
};