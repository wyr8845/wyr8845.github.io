function LoadJson() {
	$.ajax({
		type:"get",
		url:"json/data.json",
		async:true,
		success:function(data) {
			SetData(data);
		}
	});
}

function SetData(data) {
	SetBox(data, "indie");
	SetBox(data, "company");
}

function SetBox(data, id) {
	var str ="";
	
	$.each(data[id], function(index, item) {
		str += "<div class=\"box\" onclick=\"OpenPage('" + item["link"] + "')\">";
		str += "<div><img src=\"" + item["image"] + "\" /></div>";
		str += "<b>" + item["name"] + "</b>";
		str += "<div>" + item["type"] + "</div>";
		str += "</div>";
	});
	
	$("#" + id).html(str);
}

function OpenPage(page) {
	window.open(page);
}

LoadJson();