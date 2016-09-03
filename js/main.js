//根据iframe内的页面设置iframe的高度
function setIframeHeight(iframe) {
	if(iframe) {
		var iframeWin = iframe.contentWindow || iframe.contentDocument.parentWindow;
		if(iframeWin.document.body) {
			iframe.height = iframeWin.document.documentElement.scrollHeight || iframeWin.document.body.scrollHeight;
		}
	}
};
window.onload = function() {
	setIframeHeight(document.getElementById('external-frame'));
};
