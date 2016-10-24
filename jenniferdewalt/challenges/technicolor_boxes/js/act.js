$(document).ready(function() {
	var palitra = ["#0048BA","#B0BF1A","#E52B50",
				  "#9F2B68","#FFBF00","#9966CC",
			      "#008000","#007FFF","#FFE135",
			      "#FA6E79","#6B4423","#00BFFF",
			      "#40FF79"];
	var randomNumber;
	var color;		      

	function getRandomNumber() {
		var number = Math.round(Math.random()*12);
		if(randomNumber == number) {
			getRandomNumber();
		} else {
			randomNumber = number;
		}
    }

	$(".square").mouseenter(function() {
		getRandomNumber();
		$(this).css("background-color",palitra[randomNumber]);
	});
});