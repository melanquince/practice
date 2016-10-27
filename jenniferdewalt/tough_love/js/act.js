$(document).ready(function() {
	$("#bad_habit").focus();
		

	var org_advice = ["That's terrible! You should knock that off!",
				  "Seriously? Why don't you grow the hell up?!",
				  "Aren't you a little old for that crap?",
				  "You are bad and you should feel bad!",
				  "Gross. You are gross.",
				  "Are you going to suck all your life?",
				  "What? Who does that?!",
				  "I thought you were better than that.",
				  "My disapproval is overwhelming.",
				  " ಠ__ಠ ",
				  "Are you freaking kidding me?",
				  "NO! Bad!",
				  "And when do you plan on becoming an adult?",
				  "That is totally unacceptable.",
				  "You should be utterly ashamed.",
				  "Ugh! That's horrible!",
				  "A kitten dies everytime you do that.",
				  "I can't believe you are that disgusting."];
	var advice = org_advice;			 

	function getRandomNumber() {
		return Math.round(Math.random()*(advice.length-1));
	}

	function getAdvice() {
		var num = getRandomNumber();
		var sentence = advice[num];
		advice.splice(num,1);
		if(advice.length == 0) advice = org_advice;
		return sentence;
	}			  
	
	function getInput() {
		var input = $("#bad_habit").val().replace(/^\s+|\s+$/g, '');
		$("#bad_habit").val("");
		return input;
	}

	function changePronounce(phrase) {
		var startWithI = phrase.substr(0,2).toUpperCase();
		var startWithMy = phrase.substr(0,3).toUpperCase();
		var newPhrase;

		if (startWithI == "I ")	{
			newPhrase = phrase.replace(/I /gi, "You ");
		} else if ( startWithMy == "MY " ) {
			newPhrase = phrase.replace(/My /gi, "Your ");
		} else {
			newPhrase = "You " + phrase;			
		}

		newPhrase = newPhrase.replace(/ I /gi, " you ");
		newPhrase = newPhrase.replace(/ my /gi, " your ");
		newPhrase = newPhrase.replace(/ me /gi, " you ");

		return newPhrase;


	}

	function reaction() {
		$("#first_line").html(changePronounce(getInput())+"?");
		$("#second_line").html(getAdvice());

	}

	
		
	$('#bad_habit').keypress(function(event) {
	    if (event.keyCode == 13 || event.which == 13) {
	        reaction();
	        event.preventDefault();
	    }
    });


	

	$("#submit_btn").on("click", reaction);			  
				   
});