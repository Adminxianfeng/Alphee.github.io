	window.onload = function(){
		var loveTime = document.getElementById("lt");
		var now = new Date;
		var firstDay = new Date("2012/10/9");
		var days = Math.floor((now - firstDay) / 1000 / 60 / 60 / 24);
		loveTime.innerHTML = days;
	}