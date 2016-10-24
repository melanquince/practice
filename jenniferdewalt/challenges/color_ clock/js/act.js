$(document).ready(function() {


	function getTime() {
		var time = new Date();
		var h = time.getHours();
		var m = time.getMinutes();
		var s = time.getSeconds();
		return h+":"+m+":"+s;
	}

	function setTime() {
		var currentTimeArr = getTime().split(":");

		for(var a in currentTimeArr) {
			if(currentTimeArr[a] < 10) {
				currentTimeArr[a] = "0"+currentTimeArr[a];
			}
		}

		$("#hour").html(currentTimeArr[0]);
		$("#minute").html(currentTimeArr[1]);
		$("#second").html(currentTimeArr[2]); 

	}

	function getColor() {
		var currentTimeArr = getTime().split(":");
		var hours = currentTimeArr[0];
		var minutes = currentTimeArr[1];
		var seconds = currentTimeArr[2];
		


		var red = (Math.round(hours*255/24)).toString(16);
		var green = (Math.round(minutes*255/60)).toString(16);
		var blue = (Math.round(seconds*255/60)).toString(16);

		if(red.length == 1) {
			red = 0+red;
		}
		if(green.length == 1) {
			green = 0+green;
		}
		if(blue.length == 1) {
			blue = 0+blue;
		}
		

		return "#"+red+green+blue;

	}

	function changeBackground() {
		var color = getColor();
		$("#container").css("background-color",color);
		$("#color").html(color.toUpperCase());
	}

	function start() {
		setTime();
		changeBackground();
	}

	start();
	setInterval(start, 1000);

	

});