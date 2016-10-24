$(document).ready(function() {
	var lvl = 12;
	var showLvl = 1;
	var message = ["Nice Job!", "Excellent clicking!", "That was awesome!", 
					"Man are you good",	"Boom!","Wow!",
					"I can't believe it!", "You are a pro!","Fantastic!",
					"Unbelievable!","Insanity!","Winner!"];


	function showMessage() {
		$("#ball").css("display","none");
		$("#congrats").html(message[showLvl-1]);
		$("#next_level").html("Next level: " + (showLvl+1));
		$("#message_container").css("display","block");
	}

	function changeLvl() {
		showLvl += 1;
		if(lvl >= 7) {
			lvl -=1.5;	
		} else if( lvl > 3 && lvl <= 6) {
			lvl -= 0.75;
		} else {
			lvl -= 0.5;
		}
		
		$("#ball").css("animation", "bounce " + lvl + "s infinite");
		console.log("animation", "bounce " + lvl + "s infinite");
	}

	function upgrade() {
		setTimeout(function() {
			$("#message_container").css("display","none");
			$("#ball").css("display","block");
		}, 3000);
	}

	function finish() {
		$("#ball").css("display","none");
		$("#congrats").html(message[showLvl-1]);
		$("#replay").css("display","block");
		$("#next_level").html("Holy cow! You won the whole freakin' thing!");
		$("#message_container").css("display","block");
	}

	function clear() {
		lvl = 12;
		showLvl = 1;
		$("#replay").css("display","none");
		$("#message_container").css("display","none");
		$("#ball").css("animation", "bounce " + lvl + "s infinite");
		$("#ball").css("display","block");
	}


//-----------------------------------------//


	$('#ball').on("click",ballClicked);

	function ballClicked() {
		if(showLvl < 12) {
			showMessage();
			changeLvl();
			upgrade();	
		} else {
			finish();
		}
	}

	$("#replay").on("click", clear);

});