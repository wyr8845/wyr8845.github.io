var timer;
window.onload = function() {
	document.getElementById("cymbal").onclick = function() {
		doImage("cymbal", 13);
	}
	document.getElementById("drink").onclick = function() {
		doImage("drink", 81);
	}
	document.getElementById("eat").onclick = function() {
		doImage("eat", 40);
	}
	document.getElementById("fart").onclick = function() {
		doImage("fart", 28);
	}
	document.getElementById("pie").onclick = function() {
		doImage("pie", 24);
	}
	document.getElementById("scratch").onclick = function() {
		doImage("scratch", 56);
	}
}

function getIndex(index) {
	if (index < 10) {
		return "0" + index;
	} else {
		return index;
	}
}

function doImage(type, len) {
	var cat = document.getElementById("cat");
	var index = 0;
	
	timer = setInterval(function() {
		if (++index <= len) {
			cat.src = "Animations/" + type + "/" + type + "_" + getIndex(index - 1) + ".jpg";
		} else {
			clearInterval(timer);
		}
	}, 80);
}
