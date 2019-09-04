$("#top").click(function() {
	ChagePage("top.html");
});

$("#about").click(function() {
	ChagePage("about.html");
});

$("#work").click(function() {
	ChagePage("work.html");
});

$("#member").click(function() {
	ChagePage("member.html");
});

$("#video").click(function() {
	window.open("https://space.bilibili.com/8355981");
});

$("#contact").click(function() {
	ChagePage("contact.html");
});

function ChagePage(pageName) {
	$("#main").prop("src", pageName);
}